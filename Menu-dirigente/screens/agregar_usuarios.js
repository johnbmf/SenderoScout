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
import {Rating, Button } from 'react-native-elements';
import { Header,Left,Right,Icon, Body} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert'
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class agregar_usuarios extends Component {
    constructor(props){
        super(props);
        this.state={
            Usuario : '',
            NombreNino:'',
            Email : '',
            Password : 'sprint2',
            Puntos:0,
            SendAlertMessage: "Debes rellenar todos los campos.",
            SendAlertState: false,
            SendAlertType: 0,// 0: ok / 1: usuario ya esta / 2:campo faltante /3: Email no valido   
            isLoading:false,
            TypeAlert: 'Warning', //agregado para alerta nueva
            AlertTitle: 'Campo Faltate',//agregado para alerta nueva
            MailText:'',
            userToken: '',
        }
        this._bootstrapAsync();
    }

    static navigationOptions = {
        drawerLabel: 'Agregar Usuarios',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
       )
    }

    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});
        //console.log("nombre: " + Token2.nombre);
        //this.getInvitados();
      };

    clearText(){
        this.setState({
            Usuario : '',
            Email : '',
            NombreNino:'',
            Pseudonimo: '',
            Edad: 0,
        })
    };

    toggleAlert(){
        this.setState({
            SendAlertState : !this.state.SendAlertState
        })
    }

   //funcion enviar mail
    enviarMail = () =>{
        console.log(this.setState)
        fetch('https://api.mailjet.com/v3.1/send',{
            method:'post',
            headers:{
                'Authorization': 'Basic '+base64.encode('cfa0fcf8d32d75646647ad4421cca54e:22a8ae3a80429f516237f05566cfe633'),//+btoa('cfa0fcf8d32d75646647ad4421cca54e:22a8ae3a80429f516237f05566cfe633'),//'Username : cfa0fcf8d32d75646647ad4421cca54e, Password : 22a8ae3a80429f516237f05566cfe633',
                'Content-Type': 'application/json',           
            },
            body:JSON.stringify({
                "Messages":[{
                    "From": {
                        "Email": "hammersoft.fesw@gmail.com",
                        "Name": "Hammersoft"
                    },
                    "To": [{
                        "Email": this.state.Email.toLowerCase().trim(),//"ian.mora.14@sansano.usm.cl",
                        "Name": ""
                        }],
                    "Subject": "Bienvenido a Sendero Scout!",
                    "TextPart": "Bienvenido a Sendero Scout! El dirigente scout de tu pupilo te creó una cuenta. Para poder utilizar la aplicación debes iniciar sesión y cambiar tu contraseña Usuario: "+this.state.Usuario+" Contraseña: "+this.state.Password+" De parte de Hammersoft esperamos que disfrutes la aplicación!",
                    "HTMLPart": this.state.MailText//"<h3>Bienvenido a Sendero Scout!</h3><br />El dirigente scout de tu pupilo te creó una cuenta. Para poder utilizar la aplicación debes iniciar sesión y cambiar tu contraseña Usuario: [USER] Contraseña: [PASS] De parte de Hammersoft esperamos que disfrutes la aplicación!" 
                }]   
            })
        })//acá esta el error tengo que revisar la respuesta del php 
        .then(response => response.json())
        .then((responseJson) => {
            //console.log('fin mandar mail')
            console.log(responseJson)
        })
        console.log('fin el mail')
    }

   //funcion crear usuario
    crearUsuario = () =>{
        this.setState({isLoading:true});
        fetch('http://www.mitra.cl/SS/AgregarUsuario.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
            },
            body:JSON.stringify({
                "user":this.state.Usuario.trim(),
                "password":this.state.Password.trim(),
                "email":this.state.Email.trim(),
                "confirmacion_email":0,
                "unidad1": this.state.userToken.unidad1,//cambiar por el token del usuario (this.state.Unidad)
                "tipo":'nino',
                "nombre": "",
                "puntos": this.Puntos,
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson['respuesta'] == 0){//estamos ok
                this.setState({
                    isLoading : false,
                    SendAlertType:0,
                    SendAlertState:true,
                    SendAlertMessage: "Hemos enviado un email al apoderado con los datos de la cuenta.",//responseJson['message ']
                    MailText: "<h3>Bienvenido a Sendero Scout!</h3><br />El dirigente scout de tu pupilo te creó una cuenta. <br />Para poder utilizar la aplicación debes iniciar sesión y cambiar tu contraseña <br /><br />Usuario: "+this.state.Usuario+"<br />Contraseña: "+this.state.Password+" <br /><br />De parte de Hammersoft esperamos que disfrutes la aplicación!" ,
                    AlertTitle: 'Usuario creado con éxito',//agregado para alerta nueva
                    TypeAlert : 'Succsess',//agregado para alerta nueva
                }, ()=> {this.enviarMail();this.handleOpen();this.clearText()})//{this.handleOpen();this.enviarMail()})
                //deberia llamar a mandar el mail                   
            }else if(responseJson['respuesta'] == 1){//no se pudo agregar
                this.setState({
                    SendAlertMessage: "Nombre de usuario ya existe, intente con uno nuevo.",//responseJson['message '],// "Nombre de usuario ya existe, intente con uno nuevo.",
                    isLoading : false,
                    SendAlertState:true,
                    SendAlertType:1,
                    AlertTitle: 'Usuario ya existe',//agregado para alerta nueva
                    TypeAlert : 'Error',//agregado para alerta nueva
                }, ()=> {this.handleOpen()})
            }
        })
        .catch((error) => {
            console.log("error")
            console.error(error);
        });
    }

    ValidarMail = () =>{
        //console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
        if(this.state.Usuario == ''){
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Debes agregar un nombre de usuario.",
                AlertTitle: 'Campo Faltante',//agregado para alerta nueva
                TypeAlert : 'Warning',//agregado para alerta nueva
            },  ()=> {this.handleOpen()});
            return;
        }else if(this.state.Email == ''){
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Debes ingresar un email.",
                AlertTitle: 'Campo Faltante',//agregado para alerta nueva
                TypeAlert : 'Warning',//agregado para alerta nueva
                }, ()=> {this.handleOpen()});
            return;
        }else{      
            if(reg.test(this.state.Email) === false){
                console.log("Email is Not Correct");
                this.setState({
                    SendAlertType:-3,
                    SendAlertMessage:"Ingresa una direccion de email válida",
                    AlertTitle: 'Email no válido',//agregado para alerta nueva
                    TypeAlert : 'Warning',//agregado para alerta nueva
                }, () =>{this.handleOpen()})
                return;
            }else {
                //console.log("Email is Correct");
                this.setState({
                    Puntos:0
                }, () => this.crearUsuario())
                return;
            }
        }
    }

    SendAlert = () => {
        if(this.state.SendAlertType == 2){//falta un campo
           // Alert.alert(this.state.SendAlertMessage)
        }else if (this.state.SendAlertType == 1){//usuario existe
            //Alert.alert(this.state.SendAlertMessage)
        }else if(his.state.SendAlertType == 0){//ok
           // Alert.alert(this.state.SendAlertMessage)
        };
    };

    handleOpen = () => {
        this.setState({
            SendAlertState: true,
            isLoading : false
            }, 
        );
    }

   handleClose = () => {
        this.setState({ SendAlertState: false });
        this.setState({isLoading : false})
   }

    ShowSendAlert(){
        if(this.state.SendAlertType == 0){
            return(
                <SCLAlert
                    theme="success"
                    show={this.state.SendAlertState}
                    title="Usuario Creado"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="success" onPress={() => {this.handleClose(); this.clearText()}}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }
        else if(this.state.SendAlertType == 1){
            return(
                <SCLAlert
                    theme="danger"
                    show={this.state.SendAlertState}
                    title="Usuaio ya existe"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="danger" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }
        else if(this.state.SendAlertType == 2){
            return(
                <SCLAlert
                    theme="warning"
                    show={this.state.SendAlertState}
                    title="Campo Faltante"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="warning" onPress={() => {this.handleClose()}}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }
        else if(this.state.SendAlertType == 3){
            return(
                <SCLAlert
                    theme="warning"
                    show={this.state.SendAlertState}
                    title="Email incorrecto"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="warning" onPress={() => {this.handleClose()}}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }
        else{
            console.log("ALERTA DE ERROR NO IDENTIFICADO")
            return(
                <SCLAlert
                    theme="warning"
                    show={this.state.SendAlertState}
                    title="Email incorrecto"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="warning" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }

    }

    LoadingState(){
        if(this.state.isLoading){
            return(
                <Modal
                    transparent = {true}
                    visible = {this.state.isLoading}
                    animationType = 'none'
                    onRequestClose = {()=>{console.log("Closing Modal")}}
                >
                <View style = {{position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
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
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Agregar usuarios</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                <View style={{width: '100%', height: '7%'}} >
                <NavigationEvents onWillFocus={() => this.clearText()}/> 
                </View>
                <View style={{width: '100%', height: '7%'}} >
                    <Text style={{width: '90%'}}>
                        <Text style={{width: '90%'}}>
                            {"      Nombre de Usuario:"}
                        </Text>
                    </Text>
                    <TextInput
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {false}
                        //numberOfLines = {4}
                        onChangeText={(valor) => this.setState({Usuario : valor})}
                        placeholder = "Ejemplo: Mowgli"
                        keyboardType = 'default'
                        value={this.state.Usuario}                       
                    />
                </View>    
                           
                <View style={{width: '100%', height: '7%'}} >
                    <Text style={{width: '90%'}}>
                        <Text style={{width: '90%'}}>
                            {"      Email Apoderado:"}
                        </Text>
                    </Text>
                    <TextInput
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {false}
                        //numberOfLines = {4}
                        onChangeText={(valor) => this.setState({Email : valor})}
                        placeholder = "Ejemplo: hammersoft.fesw@gmail.com"
                        //textAlign={'left'}
                        keyboardType ='email-address'
                        value={this.state.Email}                       
                    />
                </View>
                <Alerta visible = {this.state.SendAlertState} type = {this.state.TypeAlert} titulo = {this.state.AlertTitle} contenido = {this.state.SendAlertMessage} rechazar = {() => {this.toggleAlert()}}
                    />
                <View>
                    {this.LoadingState()}
                    
                </View>
                <View
                    style = {{height:'10%', width:'90%', backgroundColor:'#white5', paddingLeft:20}} 
                ></View>
                <View style={{width: '100%', height: '7%',alignItems:'center', justifyContent:'center'}} >
                    <CustomButton 
                    onPress = {() => this.ValidarMail()}
                    title = "Agregar"
                    name = 'long-primary-button'
                    />
                </View>
                <View></View>
            </View>
            </ScrollView>           
            );
    }
}
export default agregar_usuarios;
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