import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export class autenticacion extends Component {
    constructor(props) {
        super(props);
        //AsyncStorage.clear(); //<- descomentar esto solo si se quiere testear el login //
        this._bootstrapAsync();
      }
      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken);
        
        this.props.navigation.navigate(userToken ? 'Home' : 'Logear');
      };
    render() {
        return (
            <View style = {{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default autenticacion