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
import { ScrollView, ViewPagerAndroid, FlatList } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert';

class InvitacionesUnidad extends Component {


    constructor(props){
        super(props)
        this.state = {
            dataInvitaciones: this.props.navigation.getParam('dataInvitaciones', {}),
            alertState:false,
            tempUnidad:"",
            tempId:"",
            tempReclutador:"",

        }
    }
    
    static navigationOptions = {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='list' type = 'Entypo' style = {{fontSize:24, color:tintColor}} />
        ),
        header: null
    }

    toggleAlert = (unidad, Reclutador, Id) => {
        this.setState({
            alertState : !this.state.alertState,
            tempUnidad:unidad,
            tempId: Id,
            tempReclutador: Reclutador
        });
    };

    responderInvitacion(estado,nombre_unidad1, id){
        if(this.state.userToken.unidad1 > 0 && estado == 1){
            this.setState({
                estadoAlerta : true,
                typeAlerta: "Warning",
                tituloAlerta: "Ya perteneces a una unidad",
                mensajeAlerta : "Para poder unirte a una nueva unidad es necesario que abandones primero la que perteneces"
            });
            return
        }
        if(estado == 1){
            this.setState({
                nombre_unidad:nombre_unidad1
            });
        }
        fetch('http://www.mitra.cl/SS/aceptar_invitacion.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "user": this.state.userToken.user,
                "nombre":this.state.userToken.nombre,
                "estado": estado,
                "user_reclutador" : this.state.user_reclutador,
                "nueva_unidad" : this.state.id_unidad
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                this.setState({
                    isLoading: false,
                    estado_respuesta: responseJson.alert_type
                })
                if(estado != -1){
                    this.setState({
                        userToken : {
                            user : this.state.userToken.user,
                            nombre: this.state.userToken.nombre,
                            pseudonimo : this.state.userToken.pseudonimo,
                            edad : this.state.userToken.edad,
                            email : this.state.userToken.email,
                            seisena1 : this.state.userToken.seisena1,
                            tipo: this.state.userToken.tipo,
                            grupo : this.state.userToken.grupo,
                            unidad1 : id,
                            nombre_unidad:nombre_unidad1
                        },
                        estadoAlerta : true,
                        typeAlerta: "Succsess",
                        tituloAlerta: "Éxito",
                        mensajeAlerta: "Felicitaciones, ahora perteneces a la unidad" + this.state.nombre_unidad
                    },()=> {storeItem('userToken',this.state.userToken)})
                }

            }else{
                this.setState({
                    isLoading: false,
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    RenderAlert(){
        return(
            <Alerta
                botones={2}
                type = "Warning"
                visible = {this.state.alertState}
                titulo = "Invitacion"
                contenido =  {this.state.tempReclutador+", te acaba de invitar a su unidad."}
                titulo_boton_aceptar = "Aceptar"
                Aceptar = {() => {this.responderInvitacion(1, this.state.tempUnidad,this.state.tempId);this.toggleAlert()}}
                titulo_boton_rechazar = "Rechazar"
                Rechazar = {() => {this.responderInvitacion(-1,this.state.tempUnidad,this.state.tempId);this.toggleAlert()}}
            />
        )
    }


    render() {
        return(
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Invitaciones a unidad</Text>
                        </Body>
                        <Right></Right>
                    </Header>
                </View>
                <View style = {{width: '100%', height: '80%',alignItems: 'center'}}>
                    {this.state.dataInvitaciones.map(((obj,i) => 
                        <View style={{flexDirection:'row', marginBottom:10}} key = {i}>
                        {
                            <View key = {i}>
                                <Button
                                    buttonStyle = {{marginHorizontal:10, marginBottom:5, alignSelf:'center'}}
                                    onPress = {() => {this.toggleAlert(obj.nombre_unidad,obj.user_reclutador,obj.id)}}
                                    icon={
                                        <Icon
                                        style = {{color:'red', marginRight:20}}
                                        type = "Octicons"
                                        name="primitive-dot"
                                        color="white"
                                        />
                                        
                                    }
                                    iconRight
                                    title={"Tienes una invitación para unirte a la unidad "+ obj.nombre_unidad}
                                />   
                            </View>
                        }</View>))
                    }
                    {this.RenderAlert()}

                </View>
                <View style = {{width: '100%', height: '8%'}}>

                </View>
            </View>

        )
    }
}export default InvitacionesUnidad;

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