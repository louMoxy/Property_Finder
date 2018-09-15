import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import SearchResults from './SearchResults';

function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;
  
    const querystring = Object.keys(data)
      .map(key => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');
  
    return `https://api.nestoria.co.uk/api?${querystring}`;
  }


export default class SearchScreen extends Component<{}> {
    static navigationOptions = {
        title: 'Search Properties',
      };


    constructor(props) {
        super(props);
        this.state = {
          searchString: '',
          isLoading: false,
          message: '',
        };
      }

      _inputChange = (event) => {
        this.setState({searchString:  event.nativeEvent.text});
      }

      _handleResponse = (response) => {
            this.setState({
                isLoading: false,
                message: ''});
            if (response.application_response_code.substr(0, 1) === '1') {
                this.props.navigation.navigate('SearchResults', {listings: response.listings});
            } else {
                this.setState({ message: 'Location not recognized; please try again.'});
            }
      };

      _executeQuery = (query) => {
        this.setState({ isLoading: true });
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error =>
                this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
      };
      
      _onSearchPressed = () => {
        const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
      };

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;
      return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Search for houses to buy!
          </Text>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            placeholder='Search via name or postcode'
            onChange = {this._inputChange}
          />
          <Button 
            onPress={this._onSearchPressed}
            title='Go'
            style = {styles.button}
          />
        <Image source={require('../Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    image: {
        width: 217,
        height: 138
    },
    container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
      },
    button: {
        color:'#48BBEC'
    }
  });
