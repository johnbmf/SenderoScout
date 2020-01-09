import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    //Button,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl
} from "react-native";
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import base64 from 'react-native-base64';
import {Rating, Button, ListItem} from 'react-native-elements';
import { Header,Left,Right,Icon, Body} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert';
import {Alerta2B} from './../CustomComponents/customalert2B'
import { LinearGradient } from 'expo-linear-gradient';
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class cambio_pseudonimos extends Component {
    constructor(props){
        super(props);
        this.state={
            SendAlertMessage: "",
            SendAlertState: false,
            AlertTitle: "Solicitud de cambio",
            SendAlertType: 0,// 0: ok / 1: usuario ya esta / 2:campo faltante /3: Email no valido   
            isLoading:false,
            TypeAlert: 'Warning', //agregado para alerta nueva
            userToken: '',
            Pseudonimos: [],
            cantPseudos:3,
            HayPseudonimos : false,
            isPseudonimoVisible: false,
            cambiar : 0,//1: Aceptar / 2: rechazar
            usuarioCambio:"",
            nombreNino:"",
            idUser:-1,
            nuevoPseudo: "",
            TypeAlert2: 'Succsess',
            SendAlertMessage2: "Pseudonimo cambiado con éxito.",
            SendAlertType2: 0,//se cambio el pseudonimo
            SendAlertState2: false,
            AlertTitle2:"",
            refreshing:false,
        }
        this._bootstrapAsync();
    }

    static navigationOptions = {
        drawerLabel: ()=>null,
    }

    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});  
        this.getPseudonimos(); 
    };
     
    //obtiene todas las solicitudes de camio de la unidad del dirigente
    getPseudonimos = () =>{
        fetch('http://www.mitra.cl/SS/getPseudonimo.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
            },
            body:JSON.stringify({        
                "unidad": this.state.userToken.unidad1,
            })
        })
        .then(response => response.json())
        .then((responseJson) =>{
            if(responseJson["response"]>0){
                this.setState({
                    HayPseudonimos:true,
                    Pseudonimos: responseJson["solicitudes"],
                    isLoading: false,
                    cantPseudos: responseJson["response"],
                })
            }else{
                this.setState({
                    HayPseudonimos:false,
                    isLoading: false,
                    cantPseudos: responseJson["response"],
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    //acepta o rechaza el cambio de 1 pseudonimo por vez
    cambiarPseudonimos = () =>{
        fetch('http://www.mitra.cl/SS/CambiarPseudonimo.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
            },
            body:JSON.stringify({
                "cambio": this.state.cambiar,
                "usuario": this.state.usuarioCambio,
                "nuevo": this.state.nuevoPseudo,
                "id": this.state.idUser,
            })
        })
        .then(response => response.json())
        .then((responseJson) =>{
            console.log("############################+")
            console.log("respondse "+responseJson["response"])
            console.log("id "+responseJson["id"])
            console.log("usuario "+responseJson["usuario"])
            console.log("cambio "+responseJson["cambio"])
            console.log("nuevo "+responseJson["nuevo"])
            if(responseJson["response"] == 0){//estamos ok-- cambia estado y pseudonimo en usuario
                this.setState({
                    TypeAlert2: 'Succsess',
                    SendAlertMessage2: this.state.nombreNino+ "ha cambiado su pseudonimo a "+this.state.nuevoPseudo+".",
                    AlertTitle2: "Pseudonimo cambiado con éxito",
                    SendAlertType2: 0,
                    SendAlertState2: true,
                })
            }else if(responseJson["response"] == 1){//solo cambia el estado
                this.setState({
                    TypeAlert2: 'Succsess',
                    SendAlertMessage2: this.state.nombreNino+" no ha cambiado su pseudonimo.",
                    AlertTitle2: "Pseudonimo no cambiado",
                    SendAlertType2: 1,
                    SendAlertState2: true,
                })
            }else{
                this.setState({//algo pasó y no cambia nada o solo cambia el estado y no el pseudonimos
                    TypeAlert2: 'Warning',
                    SendAlertMessage2: "Ha ocurrido un error. intentalo más tarde.",
                    AlertTitle2: "OOPS",
                    SendAlertType2: -1,
                    SendAlertState2: true,
                })
            }
        })//llamar a un reload
        .catch((error) =>{
            console.error(error);
        });
    }

    clearText(){
        this.setState({
            
        })
    };

    toggleAlert1(){//* acá está fallando, no asigna el cambio antes de mandar a cambiar */
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar: 2,
        },() => {this.cambiarPseudonimos()})
        return;
    }

    toggleAlertAceptar(){
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar: 1,
        },() => {this.cambiarPseudonimos()})
        return;
    }

    toggleAlertRechazar(){
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar:2,
        },() => {this.cambiarPseudonimos()})
        return;
    }

    toggleAlert2(){
        this.setState({
            SendAlertState2 : false,
        })
    }


    handleOpen1 = () => {
        console.log("ID "+this.state.idUser)
        this.setState({
            SendAlertState: true,
            isLoading : false
        });
    }

    handleClose1 = () => {
        this.setState({ 
            SendAlertState: false,
            isLoading : false
        });
    }

    handleOpen2 = () => {
        this.setState({
            SendAlertState2: true,
            isLoading : false
        });
    }

    handleClose2 = () => {
        this.setState({ 
            SendAlertState2: false,
            isLoading : false
        });
    }

    onRefresh() {
        this.setState({
            Pseudonimos: [],
        },() => {this._bootstrapAsync()})
        return;
    }
 

    render() {
        return (
            
            <ScrollView contentContainerStyle={{flexGrow: 1 }}>
            
            <View style = {styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Cambio de Pseudonimos</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                
                <View style={{width: '100%', height: '80%', marginTop:5}} >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }>
                        <View>
                        
                            {
                                console.log("pseudonnimos render"),
                                //console.log(this.state.Pseudonimos),
                                this.state.Pseudonimos.map((obj,index) =>(
                                    <ListItem 
                                    key ={index}
                                    leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
                                    title={obj["nino"]}
                                    titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
                                    subtitle={"Pseudonimo actual: " + obj["actual"] + "\nNuevo pseudonimo: " + obj["Pseudonimo"]}
                                    subtitleStyle = {{color: '#104F55'}}
                                    linearGradientProps={{
                                        colors: ['#f2e6ff', '#F9F4FF'],
                                        start: [1.5, 0],
                                        end: [0.1, 0],
                                    }}
                                    
                                    ViewComponent={LinearGradient}
                                    containerStyle = {{width: '93%',borderWidth:1, borderRadius:10,marginTop:2, marginLeft:15,borderColor : '#e4ccff', marginBottom:2}}
                                    onPress = {() => {this.setState({
                                        SendAlertMessage : "cambiar el pseudonimo de "+obj["nino"]+" por "+obj["Pseudonimo"]+"." ,
                                        usuarioCambio: obj["usuario"],
                                        idUser: obj["id"],
                                        nombreNino: obj["nino"],
                                        nuevoPseudo: obj["Pseudonimo"]
                                    }),this.handleOpen1()}}
                                    bottomDivider
                                    />
                                )) 

                            }
                            {(this.state.cantPseudos == 0) &&//Pseudonimos.length > 0) &&
                            <View><Text style={{color: 'gray',fontSize:30,marginLeft:10,marginRight:5, fontFamily:'Roboto'}}
                            >No hay lobatos que quieran cambiar su pseudonimo en la aplicación.</Text>  
                            </View>}
                        </View>                      
                        <Alerta visible = {this.state.SendAlertState2} type = {this.state.TypeAlert2} titulo = {this.state.AlertTitle2} contenido = {this.state.SendAlertMessage2} rechazar = {() => {this.toggleAlert2()}}
                    />
                    </ScrollView>
                
                </View>
                <Alerta botones = {2} visible = {this.state.SendAlertState} type = {this.state.TypeAlert} titulo = {this.state.AlertTitle} contenido = {this.state.SendAlertMessage} aceptar = {() => {this.toggleAlertAceptar()}} rechazar = {() => {this.toggleAlertRechazar()}} titulo_boton_rechazar={"Rechazar"} hide = {() => {this.setState({
                    SendAlertState:false
                })}}
                    />
                

                <View style={{width: '100%', height: '7%',alignItems:'center', justifyContent:'center'}} >
                    <CustomButton 
                    onPress = {() => this.ValidarMail()}
                    title = "Agregar"
                    name = 'long-primary-button'
                    />
                </View>
                <View></View>
                <View style={{width: '100%', height: '7%'}} >
                <NavigationEvents onWillFocus={() => {this.setState({Pseudonimos:[]}),this.getPseudonimos()}}/> 
                </View>
            </View>
            </ScrollView>           
            );
    }
}
export default cambio_pseudonimos;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width:'100%',
        height:'100%'
    },
    banner:{
        color:'white',
        fontSize:28,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        fontFamily:'Roboto',
        paddingTop:20
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        flex: 1,
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        justifyContent:'center',
        alignItems:'center'
    },
    pickerMenu: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    misionInput:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%'
    },
    misionDesc:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white'   //'#F4F0BB'
    },
    //baseText: {
    //    fontFamily: 'Cochin',
    //  },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
      }
});