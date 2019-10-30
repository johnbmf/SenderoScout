import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    Image,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider, ListItem} from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, ViewPagerAndroid, FlatList } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import {Svg} from 'react-native-svg'


import ActivityCard from '../CustomComponents/ActivityCard'
import CustomButton from "../CustomComponents/CustomButtons";
import Insignias from "../Local/Index"

var _ = require('lodash');


class EntregaInsignias extends Component {


    constructor(props){
        super(props)
        this.state = {
            //Datos de Usuario
            userToken: "",
            unidad_dirigente: -1,
            seisena: 'default',

            //Variables de estado
            setData: false, //si estan o no seteadas las recomendaciones ya sean locales o nuevas
            isLoading: false,
            warningState: false,
            setNiño: false,
            
            //Respuesta php
            respuesta : -1,
            cantidad: -1,
            miembros: [],

            //variables funcionales
            ninoSeleccionado: "",
        }
        //AsyncStorage.clear()
        this._bootstrapAsync();
        //this.GetRecomendaciones()
    }
    static navigationOptions = {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='list' type = 'Entypo' style = {{fontSize:24, color:tintColor}} />
        ),
        header: null
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

    GetRecomendaciones = async () =>{
        try {
            const value = await AsyncStorage.getItem('Recomendaciones');

            if (value !== null){
                console.log("Datos obtenidos con exito AsyncStorage")
                //console.log(value)
                this.setState({RecomendacionesGuardadas: JSON.parse(value)})
            }
        }catch (error) {
            console.log("Error al obtener datos AsyncStorage")
        }


    };

    StoreRecomendaciones = async (data) => {
        try {
            await AsyncStorage.setItem('Recomendaciones',JSON.stringify(data))
        } catch (error){
            console.log("Error al gruardar los datos en AsyncStorage")

        }

        console.log("Recomendaciones guardads con exito en AsyncStorage")
    }

    FormatData(fecha){
        return (fecha.split("-").reverse().join("-"))
    }

    SetWidth(porcentaje){
        return(Dimensions.get('window').width * (porcentaje/100))
    }

    SetHeight(porcentaje){
        return(Dimensions.get('window').height * (porcentaje/100))
    }

    /*
    componentDidMount(){
        this.setState({
            isLoading:true,
        })

        fetch('http://www.mitra.cl/SS/get_actividades.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    "unidad": this.state.unidad_dirigente,
                    "seisena": this.state.sisena,

                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({

                    setSmiles: true,
                    isLoading:false,
                    RecomendacionesNuevas: RecomendadasTemplate
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }
*/

    getMiembros(){
        console.log("Mi manda tokn", this.state.userToken);
        console.log("unidad dir" , this.state.userToken.unidad1)
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
                    "unidad": this.state.unidad_dirigente
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading:false,
                    setData: true,
                    respuesta: responseJson["response"],
                    cantidad : responseJson["num_rows"],
                    miembros: responseJson["miembros"]
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }
/*
    AddNino(nombre, seisena){
        var temp = []
        var nino = {"nombre": nombre, "seisena1": seisena}

        if (this.state.ninoSeleccionado.length > 0) {
            temp = this.state.ninoSeleccionado.slice()
            temp.push(nino)  
        } 
        else {
            temp.push(nino)
        }
        this.setState({ninoSeleccionado: temp, setNiño: true})
    }
*/
    RenderInsignia(item) {
        //console.log(item)
        return(
            <TouchableOpacity 
                style= {{flex: 1/4,  aspectRatio: 1, alignContent: 'space-between', margin: 10}}
                onPress = {()=> {this.props.navigation.navigate('DetalleInsignia', {dataInsignia : item, dataNino: this.state.ninoSeleccionado})}}>
                <Image style = {{height: '100%', width: '100%'}} resizeMode ='cover' source = {item.Icon} />
                <Text style = {{fontFamily: 'Roboto', fontSize: 12, textAlign: 'center',alignSelf:"center", margin:2}}>
                {item.Nombre}
                </Text>
            </TouchableOpacity>

        )
    }
    RenderNino(nino){
        this.props.navi
        return(
            <ListItem
                onPress = {()=>{this.setState({ninoSeleccionado: nino, setNiño:true})}}
                leftIcon = {
                    <Icon
                        name= 'user'
                        type= 'FontAwesome'
                        style={{fontSize: 25, alignContent: 'center' }}
                    />
                }
                title = {nino.nombre}
                bottomDivider
            />
        )
    }

    SelectNino(){
        if (this.state.setData){
            console.log("Seleccionar niño")
            return(
                <View>
                    <Text style = {{fontFamily: 'Roboto', fontSize: 20, marginLeft: 10, marginTop: 5, marginBottom: 5}}>
                    Seleccione un niño para entregarle insignias
                    </Text>
                    <ScrollView>
                        <View style= {{width: '100%'}}>
                            <FlatList
                                data = {this.state.miembros}
                                keyExtractor = {(item, index) => item.nombre}
                                renderItem = {({item}) => this.RenderNino(item)}
                            />
                        </View>
                    </ScrollView>
                </View>
            )
        }
        else{
            return (
                <Text>No hay niños aun</Text>
            )
        }
    }

    SelectInsignia(){
        console.log("seleccion de insignias")
        console.log(this.state.ninoSeleccionado)
        return(
            <View style = {{width: '100%'}}>
                <View style= {{width: '100%'}}>
                        <ListItem
                            leftIcon = {
                                <Icon
                                    name= 'user'
                                    type= 'FontAwesome'
                                    style={{fontSize: 25, alignContent: 'center' }}
                                />
                            }
                            title = {this.state.ninoSeleccionado.nombre}
                            bottomDivider
                        />
                    <View style = {{alignItems: 'center'}}>
                        <CustomButton 
                            onPress = {() => this.setState({setNiño:false, ninoSeleccionado: {}})}
                            title = 'Seleccionar otro niño'
                            name = 'long-primary-button'  
                        />
                    </View>
                </View>
                <ScrollView style = {{width: '100%'}}>
                    <FlatList
                        style = {{width: '100%', alignContent: 'space-between'}}
                        numColumns = {4}
                        data = {Insignias}
                        renderItem = {({item}) => this.RenderInsignia(item)}
                        keyExtractor = {item => item.Id}
                    />
                </ScrollView>
            </View>
        )
    }
    
    
    render() {
        //console.log(this.state.ninoSeleccionado)
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Entrega de Insignias</Text>
                        </Body>
                        <Right></Right>
                    </Header>
                </View>
                <View style = {{width: '100%', height: '80%',alignItems: 'center'}}>
                    {
                        (this.state.setNiño) ? this.SelectInsignia() : this.SelectNino()
                    }
                </View>
                <View style = {{width: '100%', height: '8%'}}>

                </View>
            </View>
        );
    }

}export default EntregaInsignias;

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
