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
import { LinearGradient } from 'expo-linear-gradient';

class mi_manada extends Component {

    constructor(props){
        super(props)
        this.state = {
            //datos usuarios
            userToken :"",
            seisena: 'default',
            unidad_dirigente: -1,
            setData: false, //si estan o no seteadas las recomendaciones ya sean locales o nuevas
            setSmiles: false,
            isLoading: false,

            //Respuesta php
            respuesta : -1,
            cantidad: -1,
            miembros: []
        };
        this._bootstrapAsync();
    }
    
    static navigationOptions = {
        drawerLabel: 'Mi Manada',
        drawerIcon: ({tintColor}) => (
            <Icon name='paw' style = {{fontSize:24,color:tintColor}} />
        )
    }

    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({
            userToken : JSON.parse(Token),
            unidad_dirigente: JSON.parse(Token)["unidad1"],
            seisena:JSON.parse(Token)["Seisena1"],
        });
        this.getMiembros()
        
      };

    getMiembros(){
        console.log("Mi manda tokn", this.state.userToken);
        
        console.log("unidad dir" , this.state.userToken.unidad1)
        this.setState({
            isLoading:true,    
        })

        fetch('https://www.mitra.cl/SS/GetMiembrosUnidad.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "unidad": this.state.unidad_dirigente
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
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Mi Manada</Text>
                        </Body>
                        <Right></Right>
                    </Header>                 
                </View>
                <View style = {{width: '100%', height: '88%',marginTop:5}}>
                    <ScrollView>
                        <View>
                        {
                        console.log(this.state.miembros),
                        this.state.miembros.map((obj, index) => (
                            
                            <ListItem
                                key={index}
                                leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
                                title = {obj["nombre"]}
                                titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
                                subtitle={"Edad: " + obj["edad"] + "      Seisena: " + obj["seisena1"]}
                                subtitleStyle = {{color: '#104F55'}}
                                linearGradientProps={{
                                    colors: ['#f2e6ff', '#F9F4FF'],
                                    start: [1.5, 0],
                                    end: [0.1, 0],
                                }}
                                
                                ViewComponent={LinearGradient}
                                containerStyle = {{width: '93%',borderWidth:1, borderRadius:10,marginTop:2, marginLeft:15,borderColor : '#e4ccff', marginBottom:2}}
                                
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