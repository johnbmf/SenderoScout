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

class Settings extends Component {

    constructor(props){
        super(props)
        this.state = {
        };
    }
    
    static navigationOptions = {
        drawerLabel: 'Setting',
        drawerIcon: ({tintColor}) => (
            <Icon name='paw' style = {{fontSize:24,color:tintColor}} />
        )
    }



    render(){
        
        return(
            <View style= {styles.BackGround}>
                <View style={{width: '100%', height:'12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                        </Body>
                        <Right></Right>
                    </Header >
                </View>
                <View style = {{width: '100%', height: '88%'}}>
                    <View style = {{width: '100%', height: '20%'}}></View>
                    <CustomButton 
                        title = "La ewa un poco mas larga"
                        name = 'long-primary-button'
                    />

                    <CustomButton 
                        title = "La Wea "
                        name = 'long-secondary-btton'
                    />
                    <CustomButton
                        title = 'volver'
                        name = 'primary-button'
                    />
                    <CustomButton
                        title = 'volver'
                        name = 'secondary-button'
                    />
                </View>
            </View>
        )
    }
}export default Settings;

const styles = StyleSheet.create({

    BackGround: {
        backgroundColor: 'rgba(255, 255, 0, 0.03)'
    }
   
});