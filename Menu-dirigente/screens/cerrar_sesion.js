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
import {Header,Left,Right,Icon, Body} from 'native-base'
export class cerrar_sesion extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.clear(); //<- descomentar esto solo si se quiere testear el login //
        this._bootstrapAsync();
      }
      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.removeItem('userToken');        
        this.props.navigation.navigate(userToken ? 'Home' : 'Logear');
      };
      static navigationOptions = {
        drawerLabel: 'Cerrar Sesión',
        drawerIcon: ({tintColor}) => (
            <Icon name='log-out' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style = {{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default cerrar_sesion
