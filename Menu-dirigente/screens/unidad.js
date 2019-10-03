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
import {Rating, Button, Divider } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';

class Unidad extends Component {
    static navigationOptions = {
        drawerLabel: 'Gestion unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='users' type= 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return(

        <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Recomendaciones</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                <View elevation = {5} style = {{width: '100%', height: '88%',alignItems: 'center'}}>
                    <View style = {{width: '70%', height: '30%', alignItems: 'center', alignSelf: 'center'}}></View>
                    <View style = {{width: '70%', height: '50%', alignItems: 'center', alignSelf: 'center'}} >
                        <View>
                            <Button
                                onPress = {()=> this.props.navigation.navigate('CrearUnidad  ')}
                                icon = {
                                    <Icon
                                        name = 'create'
                                        type = 'MaterialIcons'
                                        style = {{fontSize: 25, color: 'white', alignContent: 'center'}} 
                                    />
                                }iconRight
                                title = "Crear nueva unidad"
                                titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                                buttonStyle = {{backgroundColor: '#83cf4c',justifyContent:'center', margin: 10}}                        
                            />
                        </View>
                        <View>
                            <Button
                                onPress = {()=> this.props.navigation.navigate('CrearUnidad')}
                                icon = {
                                    <Icon
                                    name= 'sign-direction'
                                    type= 'MaterialCommunityIcons'
                                    style={{fontSize: 25, color: 'white', alignContent: 'center' }}
                                    />
                                }iconRight
                                title = "Cambiar niño de unidad  "
                                titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                                buttonStyle = {{backgroundColor: '#83cf4c',justifyContent:'center', margin: 10}}
                            />
                        </View>
                    </View>
                    <View style = {{width: '70%', height: '20%', justifyContent: 'center', alignItems: 'center',}}>
                            <Button
                                onPress = {()=> this.props.navigation.goBack(null)}
                                /*
                                icon = {
                                    <Icon
                                    name= 'sign-direction'
                                    type= 'MaterialCommunityIcons'
                                    style={{fontSize: 25, color: 'white', alignContent: 'center' }}
                                    />
                                }iconRight
                                */
                                title = "Volver "
                                titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                                buttonStyle = {{backgroundColor: '#83cf4c',justifyContent:'center', margin: 10}}      
                            />
                        </View>
                </View>
            </View>
        );
    }
}
export default Unidad;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'Roboto'
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

    campo:{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },


    textlabel:{
        fontFamily:'Roboto',
        fontSize:20,
        fontWeight:'bold',
        marginLeft:20,
        alignContent: 'flex-start'

    },
    textdata:{
        fontFamily: 'Roboto',
        fontSize: 15,
        marginLeft:20,
        alignContent: 'flex-start',



    }
   

});