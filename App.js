import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import SearchScreen from './src/SearchScreen';
import SearchResults from './src/SearchResults';
import OneProperty from './src/OnePropertyView';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Property Finder',
      };
  render() {
    return (
      <View style={styles.container}>
        <Button 
            style={styles.description}
            title="Search for houses to buy"
            onPress={ () => this.props.navigation.push('Search')}
        />
      </View>
    );
  }
}

export default createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    SearchResults : SearchResults,
    OneProperty: OneProperty
  },
  {
    initialRouteName: "Home",
     navigationOptions: 
    {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    }
);

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#656565",
    marginTop: 65
  },
  container: {
    flex: 1
  }
});
