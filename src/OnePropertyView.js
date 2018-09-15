import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  Button, 
  Linking
} from 'react-native';


export default class OneProperty extends Component<{}> {

    constructor(props) {
        super(props);        
    } 
    static navigationOptions = {
        title: '',
      };

      render() {
        const listing = this.props.navigation.getParam('listing', {});
        const { 
          bathroom_number, 
          bedroom_number,
          img_url,
          lister_url,
          price_formatted,
          summary,
          title,
          update_in_days_formatted
        } = listing;
        return (
          <View>
            <Text>{title}</Text>
            <Image 
              source={{uri: img_url}}
              style={{width: 50, height: 50}}
            />
            {bathroom_number ? <Text>`Bathrooms: ${bathroom_number}`</Text> : null}
            <Text>Bedrooms: {bedroom_number || 0}</Text>
            <Text>Price: {price_formatted}</Text>
            <Text>{summary}</Text>
            <Text>Last updated: {update_in_days_formatted}</Text>
            <Button title="View property" onPress={ ()=>{ Linking.openURL(lister_url)}} />
          </View>
        )
      }
}