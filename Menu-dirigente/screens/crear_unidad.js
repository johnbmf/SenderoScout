import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
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
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
import {Rating, Button, ThemeConsumer } from 'react-native-elements'
class crear_unidad extends Component {
    constructor(props){
        super(props);
        this.state = {
            grupo : '',
            nombre_unidad : '',
            distrito: '',
            SendAlertState: false,
            SendAlertMessage: "Unidad creada con éxito.",
            SendAlertType: 2,
            isLoading:false,
            userToken: "",

        }
        this._bootstrapAsync()
    }
    static navigationOptions = {
        drawerLabel: 'Crear Unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
    clearText(){
        this.setState(
            {
                grupo : '',
                nombre_unidad: '',
                distrito: ''
            }
        )
    }
    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({
            userToken : JSON.parse(Token),
        });
        
      };
    crearUnidad = () =>
    {   
        if(this.state.nombre_unidad==''){
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario dar un nombre a la unidad"
            }, ()=> {this.handleOpen()});
            return;
        }
        else if (this.state.grupo=='') {
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario agregar el grupo"
            }, ()=> {this.handleOpen()});
            return;
        }else if (this.state.distrito=='') {
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario asignar el distrito de la unidad."
            }, ()=> {this.handleOpen()});
            return;
        }else {
        this.setState({ isLoading: true, disabled: true, SendAlertMessage: "Unidad creada con éxito" }, () =>
        {
            fetch('http://www.mitra.cl/SS/crearUnidad.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    nombre_unidad: this.state.nombre_unidad,
 
                    grupo: this.state.grupo,

                    distrito: this.state.distrito,

                    usuario: this.state.userToken.user //TOKEN
                })
 
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    message: responseJson.message,
                    userToken : {
                        user : this.state.userToken.user,
                        nombre: this.state.userToken.nombre,
                        pseudonimo : this.state.userToken.pseudonimo,
                        edad : this.state.userToken.edad,
                        email : this.state.userToken.email,
                        seisena1 : this.state.userToken.seisena1,
                        tipo: this.state.userToken.tipo,
                        grupo : this.state.userToken.grupo,
                        nombre_unidad:this.state.nombre_unidad,
                        unidad1 : responseJson.id_unidad},
                    usuario: responseJson.nombre_usuario,
                    isLoading : false,
                    SendAlertType:1
                }, ()=> {storeItem('userToken',this.state.userToken);this.handleOpen()})
            })
            .catch((error)=>{
                console.error(error);
            });
        });}
    }
            SendAlert = () => {
            if(this.state.SendAlertType == -1){
                Alert.alert("")
    
            }
            else if (this.SendAlertType == 1){
    
            }
            else {
                Alert.alert("",SendAlertMessage)
            };
        };
    
        SendAlert = () => {
            if(this.state.SendAlertType == -1){
                Alert.alert("")
    
            }
            else if (this.SendAlertType == 1){
    
            }
            else {
    
            };
        };
    
        handleOpen = () => {

            this.setState({ 
                SendAlertState: true,
                isLoading : false 
            }, () => {
                console.log(this.state.SendAlertType);
            });
          }
        
        handleClose = () => {

            this.setState({ SendAlertState: false });
            this.setState({isLoading : false})

        }
    
        ShowSendAlert(){

            if (this.state.SendAlertType == 0){
                return(
                <ActivityIndicator
                    animating = {this.state.SendAlertState}
                    size="large" 
                    color="#00ff00" 
                />);
            }
            else if(this.state.SendAlertType == 1){
                return(
                    <SCLAlert
                    theme="success"
                    show={this.state.SendAlertState}
                    title="Felicidades"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="success" onPress={() => {this.handleClose(); this.props.navigation.goBack()}}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
            else if(this.state.SendAlertType == -1){
                return(
                    <SCLAlert
                    theme="danger"
                    show={this.state.SendAlertState}
                    title="Ooops"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="danger" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
            else{
                console.log("ALERTA DE ERROR NO IDENTIFICADO")
                return(
                    <SCLAlert
                    theme="warning"
                    show={this.state.SendAlertState}
                    title="Estoy Confundido"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="warning" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
    
        }
        LoadingState(){
            console.log(this.state.isLoading)
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

puede(){
    console.log("Puede", this.state.userToken)
if(this.state.userToken.unidad1 == 0){
    return(
        <View style = {styles.container}>
            <View style={{width: '100%', height: '7%'}} >
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({nombre_unidad : valor})}
                        placeholder = "Ingrese nombre de la unidad"
                        value={this.state.nombre_unidad}
                        />
            </View>
            <View style={{width: '100%', height: '7%'}} >             
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({grupo : valor})}
                        placeholder = "Ingrese nombre del grupo"
                        value={this.state.grupo}
                        />
            </View>
            <View style={{width: '100%', height: '7%'}} >
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({distrito : valor})}
                        placeholder = "Ingrese distrito"
                        value={this.state.distrito}
                        />
        </View>
        <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
        <Button 
        onPress = {() => {this.crearUnidad(() => {this.handleOpen()})}}
        icon = {
            <Icon
            name= 'send'
            type= 'FontAwesome'
            style={{fontSize: 22, color: 'white'}}
            //color= '#ffffff'
            />
        }iconRight
        title = "Crear   "
        titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
        buttonStyle = {{backgroundColor: '#104F55',justifyContent:'center'}}
        />
        </View>

        <View>
            {this.LoadingState()}
            {this.ShowSendAlert()}
        </View>
        </View>
);
}
else{
    <View style ={{width:'90%', height:'20%'}}>
        <Text style={{fontSize: 22, color : 'black'}}>Ya tienes tu unidad correspondiente.</Text>
    </View>
}
}
    render() {
    return (

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                
                <View style = {styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Crear Unidad</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                {this.puede()}
                </View>
                </ScrollView>

    );

    }
}
export default crear_unidad;

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
    }
});