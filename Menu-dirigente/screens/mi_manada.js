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

class mi_manada extends Component {

    constructor(props){
        super(props)
        this.state = {
            unidad_dirigente: 1,
            sisena: "Amarilla",
            setData: false, //si estan o no seteadas las recomendaciones ya sean locales o nuevas
            setSmiles: false,
            isLoading: false,

            //Respuesta php
            respuesta : -1,
            cantidad: -1,
            miembros: []
  
        }
    }
    
    static navigationOptions = {
        drawerLabel: 'Mi manada',
        drawerIcon: ({tintColor}) => (
            <Icon name='paw' style = {{fontSize:24,color:tintColor}} />
        )
    }

    componentDidMount(){
        this.setState({
            isLoading:true,    
        })

        fetch('http://www.mitra.cl/SS/GetMiembrosUnidad.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "unidad":this.state.unidad_dirigente,
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading:false,
                    respuesta: responseJson["response"],
                    cantidad : responseJson["num_rows"],
                    miembros: responseJson["miembros"]
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }

    render(){
        
        return(
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Mi manada</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                <View style = {{width: '100%', height: '88%'}}>
                    <ScrollView>
                        <View>
                        {
                        console.log(this.state.miembros),
                        this.state.miembros.map((obj, index) => (
                            <ListItem
                                key={index}
                                leftIcon = {
                                    <Icon
                                        name= 'user'
                                        type= 'FontAwesome'
                                        style={{fontSize: 25, alignContent: 'center' }}
                                    />
                                 }
                                title={obj["nombre"]}
                                subtitle={"Edad " + obj["edad"] + "      Seisena: " + obj["seisena1"]}
                                bottomDivider
                            />
                        ))
                        }
                        </View>
                    </ScrollView>
            </View>
        </View>
        )
    }
}
export default mi_manada;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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

    areas_container:{
        alignItems: 'center',
        flexDirection: 'row',
    },

    area:{
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginLeft: 20,

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
    },

    observacion:{
        fontFamily: 'Roboto',
        fontSize: 9,

    },

    alert: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }

   
});