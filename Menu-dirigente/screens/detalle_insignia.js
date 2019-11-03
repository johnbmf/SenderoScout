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
import {Rating, Button, Divider, ListItem } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import {RFPercentage} from 'react-native-responsive-fontsize'

//Custom
import ActivityCard from '../CustomComponents/ActivityCard'
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert';

class DetalleInsignia extends Component {


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
            alertState: false,
            insigniaEntregada: false,


            //variables funcionales
            dataInsignia : this.props.navigation.getParam('dataInsignia', {}),
            dataNino : this.props.navigation.getParam('dataNino', {}),

            //respuesta php insert insignia
            php_response_type: null,
            php_response_message:"",

        }
        //AsyncStorage.clear()
        //this._bootstrapAsync();
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

    toggleAlert(){
        this.setState({
            alertState: !this.state.alertState
        })
    }

    EntregarInsignia(){
        this.setState({isLoading : true})
        fetch('http://www.mitra.cl/SS/EntregarInsignia.php',{
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',  
            },
            body:JSON.stringify({
                "usuario":this.state.dataNino.user,
                "insignia":this.state.dataInsignia.Id,
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            this.setState({
                php_response_type: responseJson["type"],
                php_response_message: responseJson["message"],
                alertState: true,
                isLoading:false,
            })
            console.log(responseJson["message"]);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    RenderLoadStatus(){
        if(this.state.isLoading){
            return(
                <Modal
                    transparent = {true}
                    visible = {this.state.isLoading}
                    animationType = 'none'
                    onRequestClose = {()=>{console.log("Closing Modal")}}
                > 
                    <View style = {{ position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
                        <ActivityIndicator
                            animating = {this.state.isLoading}
                            size="large" 
                            color="#00ff00" 
                        />    
                    </View> 
                </Modal>
            );
        }
    }

    RenderAlert(tipo,mensaje){

        //exito
        if (tipo == 1 && this.state.alertState){
            return(
                <Alerta
                botones = {2}
                type = "Succsess"
                visible = {this.state.alertState}
                titulo = "Éxito"
                contenido = {mensaje}
                titulo_boton_rechazar = "Aceptar"
                titulo_boton_aceptar = "rechazar"
                rechazar = {() => {this.toggleAlert()}}
                />
            )

        }
        else if(tipo == 2){
            return(
                <Alerta
                type = "Warning"
                visible = {this.state.alertState}
                titulo = "Cuidado!"
                contenido = {mensaje}
                titulo_boton_rechazar = "Volver"
                rechazar = {() => {this.toggleAlert()}}
                />
            )
        }
        //error
        else if(tipo == -1){
            return(
                <Alerta
                type = "Error"
                visible = {this.state.alertState}
                titulo = "Error de conexién "
                contenido = {mensaje}
                titulo_boton_rechazar = "Volver"
                rechazar = {() => {this.toggleAlert()}}
                />
            )
        }

        //error desconocido
        else{
            return(
                <Alerta
                type = "Error"
                visible = {this.state.alertState}
                titulo = "Error"
                contenido = "A ocurrido un error inesperado, intentelo nuevamente."
                titulo_boton_rechazar = "Volver"
                rechazar = {() => {this.toggleAlert()}}
                />
            )
        }

    }
 
    render() {
        console.log(this.state.dataNino)
        console.log(this.state.dataInsignia)
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>{this.state.dataInsignia.Nombre}</Text>
                        </Body>
                        <Right></Right>
                    </Header >
                </View>
                <View style = {{width: '100%', height: '83%',alignItems: 'center'}}>
                    {this.RenderLoadStatus()}
                    {this.RenderAlert(this.state.php_response_type,this.state.php_response_message)}
                    <View style = {{height: '70%', width: '100%'}}>
                        <Image style = {{ height: this.SetWidth(50), width: this.SetWidth(50), margin: 25, alignSelf: 'center'}} resizeMode ='cover' source = {this.state.dataInsignia.Icon}
                        />
                        <Text style = {styles.textdata}>
                            {this.state.dataInsignia.Descripcion}
                        </Text>
                        <ScrollView style= {{width: '100%'}}>
                            <FlatList
                            data={this.state.dataInsignia.Requisitos}
                            keyExtractor = {(item,index) => index.toString()}
                            renderItem = {({item}) => <Text style = {styles.textdata}>{'\u2022'} {item}</Text>}
                            />
                        </ScrollView>
                    </View>
                    <View style = {{width:'100%',alignItems: 'center'}}>
                        <CustomButton 
                            onPress = {() => {this.EntregarInsignia()}}
                            title = 'Entregar insignia'
                            name = 'long-primary-button'  
                        />
                        <CustomButton 
                            onPress = {() => this.props.navigation.goBack(null)}
                            title = 'Volver'
                            name = 'long-primary-button'  
                        />
                    </View>
                </View>
                <View style = {{height: '5%'}}>

                </View>
            </View>
        );
    }
}
export default DetalleInsignia;

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
        fontSize:RFPercentage(3),
        fontWeight:'bold',
        marginLeft:20,
        alignContent: 'flex-start'

    },
    textdata:{
        fontFamily: 'Roboto',
        fontSize: RFPercentage(2.5),
        marginLeft:20,
        marginBottom: 10,
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
