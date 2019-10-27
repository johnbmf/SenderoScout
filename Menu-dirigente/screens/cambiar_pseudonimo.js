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
    AsyncStorage
} from "react-native";
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import base64 from 'react-native-base64';
import {Rating, Button, ListItem} from 'react-native-elements';
import { Header,Left,Right,Icon, Body} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert';
import {Alerta2B} from './../CustomComponents/customalert2B'
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
            HayPseudonimos : false,
            isPseudonimoVisible: false,
            cambiar : 0,//1: Aceptar / 2: rechazar
            usuarioCambio:"",
            nuevoPseudo: "",
            TypeAlert2: 'Succsess',
            SendAlertMessage2: "Pseudonimo cambiado con éxito.",
            SendAlertType2: 0,//se cambio el pseudonimo
            SendAlertState2: false,
            AlertTitle2:"",
        }
        this._bootstrapAsync();
    }

    static navigationOptions = {
        drawerLabel: 'Cambio de Pseudonimos',
        drawerIcon: ({tintColor}) => (//cambiar el icono
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
       )
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
                })
            }else{
                this.setState({
                    HayPseudonimos:false,
                    isLoading: false,
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
            })
        })
        .then(response => response.json())
        .then((responseJson) =>{
            if(responseJson["response"] == 0){//estamos ok
                this.setState({
                    TypeAlert2: 'Succsess',
                    SendAlertMessage2: "Pseudonimo cambiado con éxito.",
                    SendAlertType2: 0,
                })
            }else if(responseJson["response"] == 1){
                this.setState({
                    TypeAlert2: 'Succsess',
                    SendAlertMessage2: this.state.usuarioCambio+" no ha cambiado su pseudonimo.",
                    SendAlertType2: 1,
                })
            }else{
                this.setState({
                    TypeAlert2: 'Warning',
                    SendAlertMessage2: "OOPS, ha ocurrido un error. intentalo más tarde.",
                    SendAlertType2: -1,
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

    toggleAlert1(){
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar: 1,
        });
        this.cambiarPseudonimos();
    }

    toggleAlertAceptar(){
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar: 1,
        });
        this.cambiarPseudonimos();
    }

    toggleAlertRechazar(){
        this.setState({
            SendAlertState : !this.state.SendAlertState,
            cambiar:2,
        });
        this.cambiarPseudonimos();
    }

    toggleAlert2(){
        this.setState({
            SendAlertState2 : !this.state.SendAlertState
        })
    }


    handleOpen1 = () => {
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
                
                <View style={{width: '100%', height: '88%'}} >
                    <ScrollView>
                        <View>
                            {
                                //console.log("pseudonnimos render"),
                                //console.log(this.state.Pseudonimos),
                                this.state.Pseudonimos.map((obj,index) =>(
                                    <ListItem 
                                    key ={index}
                                    leftIcon={
                                        <Icon
                                        name= 'user'
                                        type= 'FontAwesome'
                                        style={{fontSize: 25, alignContent: 'center' }}
                                        />
                                    }
                                    title={obj["nino"]}
                                    subtitle={"Pseudonimo actual: " + obj["actual"] + "\nNuevo pseudonimo: " + obj["Pseudonimo"]}
                                    onPress = {() => {this.setState({
                                        SendAlertMessage : "cambiar el pseudonimo de "+obj["actual"]+" por "+obj["Pseudonimo"]+"." ,
                                        usuarioCambio: obj["usuario"],
                                        nuevoPseudo: obj["Pseudonimo"]
                                    }),this.handleOpen1()}}
                                    bottomDivider
                                    />
                                ))
                            }
                        </View>                      
                        <Alerta visible = {this.state.SendAlertState2} type = {this.state.TypeAlert2} titulo = {this.state.AlertTitle2} contenido = {this.state.SendAlertMessage2} rechazar = {() => {this.toggleAlert2()}}
                    />
                    </ScrollView>
                
                </View>
                <Alerta2B visible = {this.state.SendAlertState} type = {this.state.TypeAlert} titulo = {this.state.AlertTitle} contenido = {this.state.SendAlertMessage} rechazar = {() => {this.toggleAlert1()}}//aceptar = {() => {this.toggleAlertAceptar()}} rechazar = {() => {this.toggleAlertRechazar()}}
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
                <NavigationEvents onWillFocus={() => this.clearText()}/> 
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