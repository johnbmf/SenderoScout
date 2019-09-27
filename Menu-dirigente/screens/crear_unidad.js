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
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
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

        }
    }
    static navigationOptions = {
        drawerLabel: 'Crear Unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
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
        this.setState({ loading: true, disabled: true }, () =>
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

                    distrito: this.state.distrito
                })
 
            }).then((response) => response.json()).then((responseJson) =>
            {
                Alert.alert("",responseJson);
                this.setState({ loading: false, disabled: false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ loading: false, disabled: false });
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
    render() {
    return (
                <View style = {styles.container}>
                    <View style={{width: '100%', height: '12%', alignItems:'center'}} > 
                        
                        <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                            <Left>
                                <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            </Left>
                            <Body style = {{justifyContent:'center'}}> 
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Crear Unidad</Text>
                            </Body>
                        </Header > 
                    </View>
                        <View style={{width: '100%', height: '6%',flexDirection: 'row', alignSelf:'center',justifyContent:'center'}} >
                                 <Text style = {{textAlign:'center', justifyContent:'center',alignSelf:'center'}}>Nombre: </Text>
                                <TextInput 
                                    style = {{height:'100%', width:'80%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
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
                                            <View style={{width: '100%', height: '6%'}} >

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
                                            <View style={{width: '100%', height: '6%'}} >
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
                        <TouchableOpacity 
                        onPress = {() => {this.crearUnidad(() => {this.handleOpen()})}}
                        style = {{flex:1,width:'40%', height:'100%', backgroundColor: '#104F55', justifyContent:'center'}}>
                            <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> Crear </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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