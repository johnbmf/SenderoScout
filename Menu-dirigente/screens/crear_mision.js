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
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert'

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
            estadoAlerta: false,
            tituloAlerta: "Este es el titulo de la alerta",
            mensajeAlerta: "Misión creada con éxito",
            typeAlerta: 'Warning',
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
                TipoMision : 0,
                nombre_mision : '',
                desc_mision: '',
                Spot: '',
                Expiracion: 0,
            }
        )
    }
    toggleAlert(){
        this.setState({
            estadoAlerta : !this.state.estadoAlerta
        })
    }
    crearMision = () =>{
        console.log(this.state);
        if(this.state.TipoMision==0){
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor seleccione una misión e intente nuevamente"
            })
        }
        else if (!this.state.Spot || !this.state.Spot.trim()) {
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor seleccione una ubicación e intente nuevamente"
            })
        }else if (this.state.Expiracion==0) {
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor asigne una fecha de expiración a su misión e intente nuevamente"

            })
        }else if (!this.state.desc_mision || !this.state.desc_mision.trim()) {
            this.setState({
                    typeAlerta : 'Warning',
                    estadoAlerta: true,
                    tituloAlerta: "Campo faltante",
                    mensajeAlerta : "Por favor escriba una descripción para su misión e intente nuevamente"
                })
        }else if (!this.state.nombre_mision || !this.state.nombre_mision.trim()) {
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta : "Por favor escriba un nombre para su misión e intente nuevamente"
        })} 
        else {
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
                if(responseJson != -2){
                    this.setState({
                        typeAlerta: 'Succsess',
                        estadoAlerta: true,
                        tituloAlerta : "Éxito",
                        mensajeAlerta : "La misión fue creada correctamente"
                    })
                }else{
                    this.setState({
                        typeAlerta: 'Error',
                        estadoAlerta: true,
                        tituloAlerta: "Error",
                        mensajeAlerta: "Algo a ocurrido, por favor intente nuevamente"
                    })
                }
            })
            .catch((error)=>{
                console.error(error);
            });
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
                    <View style={{width: '90%', height: '7%',borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row',borderRadius:10}} > 
                    <NavigationEvents onWillFocus={() => this.clearText()}/> 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'100%', borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.TipoMision}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({TipoMision: itemValue}) }>
                                <Picker.Item label = "Elija un tipo de misión" value = {0} />
                                <Picker.Item label = "Tipo misión: Pregunta Abierta" value = {1} />
                            </Picker>
                        </View>
                    </View>
                    <Alerta visible = {this.state.estadoAlerta} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} rechazar = {() => {this.toggleAlert()}}
                    />
                    <View style={{width: '90%', height: '7%',borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row',borderRadius:10}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'100%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row',borderRadius:10}}
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
                    <View style={{width: '90%', height: '7%',borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row',borderRadius:10}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'100%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row',borderRadius:10}}
                                mode = 'dropdown'
                                selectedValue = {this.state.Expiracion}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({Expiracion: itemValue}) }>
                                <Picker.Item label = "Elija la duración de la misión" value = {0} />
                                <Picker.Item label = "3 días" value = {3} />
                                <Picker.Item label = "7 días" value = {7} />
                                <Picker.Item label = "14 días" value = {14} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} >
                                <TextInput 
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10}}
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
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10}}
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
                        <CustomButton 
                            onPress = {() => {this.crearMision(() => {this.handleOpen()})}}
                            name = 'long-primary-button'
                            title = 'Crear mision'
                        />
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
        height: '100%',
        borderRadius:10
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