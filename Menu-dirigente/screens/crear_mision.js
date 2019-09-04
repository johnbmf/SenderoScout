import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from "react-native";
import {Header,Left,Right,Icon, Body} from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class crear_mision extends Component {
    constructor(props){
        super(props);
        this.state = {
            TipoMision : 0,
            nombre_mision : '',
            desc_mision: '',
            Spot: '',
            Expiracion: 0,
            SendAlertState: false,
            SendAlertMessage: "Mision creada con éxito.",
            SendAlertType: 2,
            isLoading:false,

        }
    }
    static navigationOptions = {
        drawerLabel: 'Crear Misión',
        drawerIcon: ({tintColor}) => (
            <Icon name='today' style = {{fontSize:24,color:tintColor}} />
        )
    }
    clearText(){
        this.setState(
            {
                nombre_mision : '',
                desc_mision: ''
            }
        )
    }
    crearMision = () =>{
        console.log(this.state);
        if(this.state.TipoMision==0){
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario elegir el tipo de misión"
            }, ()=> {this.handleOpen()});
            //Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }
        else if (!this.state.Spot || !this.state.Spot.trim()) {
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario asignar una ubicación a la misión"
            }, ()=> {this.handleOpen()});
            //Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }else if (this.state.Expiracion==0) {
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertState: true,
                SendAlertMessage: "Es necesario asignar un tiempo de expiración de la misión"
            }, ()=> {this.handleOpen()});
            //Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }else if (!this.state.desc_mision || !this.state.desc_mision.trim()) {
            this.setState(
                {
                    isLoading : true,
                    SendAlertType : 2,
                    SendAlertMessage: "Es necesaria una descripción de la misión",
                    SendAlertState: true
                }, ()=> {this.handleOpen()});
            return;
        }else if (!this.state.nombre_mision || !this.state.nombre_mision.trim()) {
            this.setState({
                isLoading : true,
                SendAlertType : 2,
                SendAlertMessage: "Es necesario un nombre para la misión",
                SendAlertState: true}, ()=> {this.handleOpen()});
            return;
        } else {
            this.setState({isLoading:true});
            fetch('http://www.mitra.cl/SS/crearMision.php',{
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content/Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    "tipo_mision":this.state.TipoMision,
                    "nombre_mision":this.state.nombre_mision,
                    "descripcion_mision":this.state.desc_mision,
                    "spot":this.state.Spot,
                    "expiracion":this.state.Expiracion
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading : false,
                    SendAlertType:1
                }, ()=> {this.handleOpen()})
            })
            .catch((error)=>{
                console.error(error);
            });
        }
            
        }
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
        render() {
            
            return (
                <KeyboardAvoidingView style = {{flex:1}} behavior = "padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                    <View style={{width: '100%', height: '12%', alignItems:'center'}} > 
                        
                        <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                            <Left>
                                <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            </Left>
                            <Body style = {{justifyContent:'center'}}> 
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Crear Misión</Text>
                            </Body>
                        </Header >                    
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                    <NavigationEvents onWillFocus={() => this.clearText()}/> 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.TipoMision}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({TipoMision: itemValue}) }>
                                <Picker.Item label = "Elija un tipo de misión" value = {0} />
                                <Picker.Item label = "Tipo misión: Pregunta Abierta" value = {1} />
                            </Picker>
                        </View>
                    </View>
                    <View>
                        {this.LoadingState()}
                        {this.ShowSendAlert()}
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.Spot}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({Spot: itemValue}) }>
                                <Picker.Item label = "Elija la ubicación de la misión" value = {0} />
                                <Picker.Item label = "Campamento" value = {'campamento'} />
                                <Picker.Item label = "Caverna" value = {'caverna'} />
                                <Picker.Item label = "Bosque" value = {'bosque'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.Expiracion}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({Expiracion: itemValue}) }>
                                <Picker.Item label = "Elija la duración de la misión" value = {0} />
                                <Picker.Item label = "3 días" value = {3} />
                                <Picker.Item label = "7 dias" value = {7} />
                                <Picker.Item label = "14 días" value = {14} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} >
                                <TextInput 
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                                    underlineColorAndroid = "transparent"
                                    maxLength = {60}
                                    //{...this.props}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    onChangeText={(valor) => this.setState({nombre_mision : valor})}
                                    placeholder = "Nombre de la misión"
                                    value={this.state.nombre_mision}
                                    />
                    </View>
                    <View style={{width: '100%', height: '30%'}} >
                                <TextInput 
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                                    placeholder = "Descripción de la misión"
                                    maxLength = {240}
                                    //{...this.props}
                                    multiline = {true}
                                    numberOfLines = {20}
                                    onChangeText={(valor) => this.setState({desc_mision : valor})}
                                    value={this.state.desc_mision}
                                    />
                    </View>
                    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
                        <TouchableOpacity 
                        onPress = {() => {this.crearMision(() => {this.handleOpen()})}}
                        style = {{flex:1,width:'40%', height:'100%', backgroundColor: '#104F55', justifyContent:'center'}}>
                            <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> Crear </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}
            
export default crear_mision;

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



    }
});