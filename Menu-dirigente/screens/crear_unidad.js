import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Modal,
    Alert,
    ScrollView,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert'


class crear_unidad extends Component {
    constructor(props){
        super(props);
        this.state = {
            grupo : '',
            nombre_unidad : '',
            distrito: '',
            estadoAlerta: false,
            tituloAlerta: "Este es el titulo de la alerta",
            mensajeAlerta: "Unidad creada con éxito",
            typeAlerta: 'Warning',
            isLoading:false,
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
    toggleAlert(){
        this.setState({
            estadoAlerta : !this.state.estadoAlerta
        })
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
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor escriba un nombre de la nueva unidad"
            })
        }
        else if (this.state.grupo=='') {
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor escriba el nombre de grupo"
            })
        }else if (this.state.distrito=='') {
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor escriba el nombre del distrito"
            })
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
                    typeAlerta: 'Succsess',
                    estadoAlerta: true,
                    tituloAlerta : "Éxito",
                    mensajeAlerta : "La unidad fue creada correctamente"
                }, ()=> {storeItem('userToken',this.state.userToken);this.handleOpen()})
            })
            .catch((error)=>{
                console.error(error);
                this.setState({
                    typeAlerta: 'Error',
                    estadoAlerta: true,
                    tituloAlerta: "Error",
                    mensajeAlerta: "Algo a ocurrido, por favor intente nuevamente"
                })
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
//puede(): Funcion que muestra paneles para crear unidad en caso de que la persona no tenga Unidad, en caso que no, muestra que la persona ya tiene unidad. 
puede(){
    console.log("Puede", this.state.userToken)
if(this.state.userToken.unidad1 == 0){
    return(
        
        <View style = {styles.container}>
            <View >

            </View>
            <View style={{width: '100%', height: '7%'}} >
            <Text style={{marginLeft:20,fontSize: 20, marginBottom:10}}>Ingrese nombre de la unidad:</Text>
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({nombre_unidad : valor})}

                        value={this.state.nombre_unidad}
                        />
            </View>
            <View style={{width: '100%', height: '7%'}} >
            <Text style={{marginLeft:20,fontSize: 20, marginBottom:10}}>Ingrese nombre del grupo:</Text>             
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}

                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({grupo : valor})}

                        value={this.state.grupo}
                        />
            </View>
            <View style={{width: '100%', height: '7%'}} >
            <Text style={{marginLeft:20,fontSize: 20, marginBottom:10}}>Ingrese distrito:</Text>
                    <TextInput 
                        style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}

                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({distrito : valor})}

                        value={this.state.distrito}
                        />
        </View>
        <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
        <CustomButton 
        onPress = {() => {this.crearUnidad(() => {this.handleOpen()})}}
        
        title = "Crear"
        name = 'long-primary-button'
        />
        </View>
        <View >

</View>

        </View>
);
}
else{
    return(
        <View style = {styles.container}>
        <View style = {{flexDirection : 'row', width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
        <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center'}}>Ya tienes tu unidad correspondiente.</Text>
        </View>
        <View style = {{ width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
        <CustomButton
                                onPress = {()=> this.props.navigation.navigate('Unidad')}
                                title = "Volver"
                                name = 'long-primary-button'

                            />
        </View>
    </View>

    )
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
                
                <View>
            {this.LoadingState()}
            <Alerta visible = {this.state.estadoAlerta} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} rechazar = {() => {this.toggleAlert()}}
                    />
        </View>
        
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
        height:'100%',

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