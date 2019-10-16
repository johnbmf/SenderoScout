import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Dimensions
} from "react-native";

import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider, ListItem } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import CustomButton from '../CustomComponents/CustomButtons'
import {Alerta} from './../CustomComponents/customalert'

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerta : true
        }
    }
    static navigationOptions = {
        drawerLabel: 'Preferencias',
        drawerIcon: ({tintColor}) => (
            <Icon name='settings' style = {{fontSize:24,color:tintColor}} />
        )
    }


    toggleAlert(){
        this.setState({
            alerta : !this.state.alerta
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     

                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>

                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Preferencias</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                <Alerta visible = {this.state.alerta} type = {'Warning'} rechazar = {() => {this.toggleAlert()}} contenido = {"El usuario que seleccionó se encuentra ocupado, por favor seleccione otro e intente nuevamente." } titulo = {"Usuario ya existe"}
                />
            </View>
        )
    }
}export default SettingsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    banner:{
        color:'white',
        fontSize:28,
        justifyContent:'center', 
        alignItems: 'flex-start',
        alignContent:'flex-start',
        fontFamily:'Roboto',
        paddingTop:20
    },
    header:{
        flex: 1,
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        justifyContent:'center', 
        alignItems:'center'
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
   
});