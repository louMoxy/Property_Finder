import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';


class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
      const item = this.props.item;
      const price = item.price_formatted.split(' ')[0];
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{ uri: item.img_url }} />
              <View style={styles.textContainer}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.title}
                  numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
  }


export default class SearchResults extends Component<{}> {

    constructor(props) {
        super(props);
    } 
    static navigationOptions = {
        title: 'Search Results',
      };

    _keyExtractor = (item, index) => index.toString();

    _onPressItem = (index) => {
      const listing = this.props.navigation.getParam('listings', {})[index];
      this.props.navigation.navigate('OneProperty', {listing});
    }
  
    _renderItem = ({item, index}) => {
      return (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
      );
    };
  
    render() {
       const listings = this.props.navigation.getParam('listings', {})
      return (
        <FlatList
          data={listings}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }

  const styles = StyleSheet.create({
    thumb: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    textContainer: {
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    price: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#48BBEC'
    },
    title: {
      fontSize: 20,
      color: '#656565'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
  });