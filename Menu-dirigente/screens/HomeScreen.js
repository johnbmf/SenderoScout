import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl

} from "react-native";
import { Header,Icon, Body, Right, Card, CardItem, Left, Container} from 'native-base';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";
import MenuItem from './../components/menuitems'
import { ThemeConsumer } from "react-native-elements";
import {Alerta} from './../CustomComponents/customalert'
import CustomButton from "../CustomComponents/CustomButtons";



class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Inicio',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        ),
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            button:false,
            dataSource: [],
            isModalVisible: false,
            hayInvitaciones: false,
            userToken: "",
            nombre_unidad: "",
            user_reclutador:"",
            id_unidad: 0,
            invitaciones : [],
            tkn : [],
            mensaje_respuesta: "",
            estado_respuesta : -1,
            update: false,
            error: false,
            refreshing:false,
            estadoAlerta: false,
            tituloAlerta: "Este es el titulo de la alerta",
            mensajeAlerta: "Misión creada con éxito",
            typeAlerta: 'Warning',
            cantPseudos:0,//agregado para el cambio de pseudonimos

            //Props diego
            modalInvitaciones: false,
        }
        this._bootstrapAsync();
        
    }


    getInvitaciones = () => {
        fetch('http://www.mitra.cl/SS/get_invitaciones.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "usuario":this.state.userToken.nombre
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                //console.log((typeof(responseJson[0].fecha_expiracion)));
                this.setState({
                    isLoading: false,
                    invitaciones: responseJson,
                    hayInvitaciones: true
                })
                console.log(responseJson);
                
            }else{
                this.setState({
                    isLoading: false,
                    invitaciones: [],
                    hayInvitaciones: false
                })
                console.log(responseJson);
            
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    //cambiar pseudonimos
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
            this.setState({
                cantPseudos: responseJson["response"]
            })           
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    toggleModal = (unidad, user, id) => {
        console.log("Toggle modal" + this.state.userToken);
        this.setState({isModalVisible : !this.state.isModalVisible,
            user_reclutador : user,
            nombre_unidad: unidad,
            id_unidad : id
        });
    };

    //agregado para el camnio de pseudonimos REVISAR
    toggleModal2 = (user, Pseudonimo, pos) => {
        console.log("Toggle modal2 " + this.state.userToken);
        this.setState({
            isPseudonimoVisible : !this.state.isPseudonimoVisible,
        });
    };

    componentDidUpdate() {
        if (this.state.update) {
            this.getInvitaciones()
            this.setState({update:false})
            this.getPseudonimos()
          // Use the `this.props.isFocused` boolean
          // Call any action
        }
      }

    componentDidMount(){

        fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "unidad":this.state.userToken.unidad1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                //console.log((typeof(responseJson[0].fecha_expiracion)));
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                })
            }else{
                this.setState({
                    isLoading: false,
                    dataSource: []
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    toggleAlert(){
        this.setState({
            estadoAlerta : !this.state.estadoAlerta
        })
    }
    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});
        //console.log("nombre: " + Token2.nombre);
        this.getInvitaciones();
        this.getPseudonimos();
      };

/*
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
 */  
    getPendientes(){
        fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "unidad":1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,

                })

            }else{
                this.setState({
                    isLoading: false,
                    dataSource: []
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    mostrar_mensaje = () => {
        
        if ((this.state.dataSource.length)>0){
            console.log(this.state.dataSource.length);
            return true;
        }else{
            return false;
        }
    }

    onRefresh() {
        //Clear old data of the list
        //Call the Service to get the latest data
        this._bootstrapAsync();

    }

    NotificationCard(){
        return(
            <Card style = {{width: '90%',borderWidth:2, borderRadius:1,marginTop:20,borderColor : '#e4ccff', backgroundColor: '#F9F4FF', alignSelf:'center', margin:10}}>
                <CardItem style = {{backgroundColor: '#F9F4FF'}} header bordered>
                    <Left>
                        <Text style = {{fontWeight:'bold'}}>
                            Notificaciones
                        </Text>
                    </Left>
                    <Right >
                        <Icon
                        type = 'Feather'
                        name = {'bell'}
                        //style = {styles.AccordeonIcon}
                        />
                    </Right>
                </CardItem>
                {
                    (this.state.dataSource.length > 0) ? 
                        <CardItem bordered button onPress={()=> this.props.navigation.navigate('Pendientes')} >
                            <Body>
                                <Text>
                                    Tienes {this.state.dataSource.length} misiones sin evaluar.
                                </Text>
                            </Body>
                            <Right>
                                <Icon
                                    type = 'Feather'
                                    name = {'chevron-right'}
                                />
                            </Right>
                        </CardItem>:null
                }
                {
                    (this.state.cantPseudos> 0) ?                         
                        <CardItem bordered button onPress={()=> this.props.navigation.navigate("CambioPseudos")} >
                            <Body>
                                <Text>
                                Algunos lobatos quieren cambiar su pseudónimo.
                                </Text>
                            </Body>
                            <Right>
                                <Icon
                                    type = 'Feather'
                                    name = {'chevron-right'}
                                />
                            </Right>
                         </CardItem>:null

                }
                {
                    (this.state.invitaciones.length > 0) ?                  
                        <CardItem bordered button onPress={()=> this.props.navigation.navigate("InvitacionesUnidad", {dataInvitaciones: this.state.invitaciones})}>
                            <Body>
                                <Text>
                                    Has sido invitado a una unidad.
                                </Text>
                            </Body>
                            <Right>
                                <Icon
                                    type = 'Feather'
                                    name = {'chevron-right'}
                                />
                            </Right>
                        </CardItem>:null
                }
            </Card>
        )
    }
    
    InformativeCard(){
        if (this.state.userToken != ""){
            return(
                <Card style = {{width: '90%',borderWidth:2, borderRadius:1,marginTop:10,borderColor : '#e4ccff', backgroundColor: '#F9F4FF', alignSelf:'center', margin:10}}>
                    <CardItem style = {{backgroundColor: '#F9F4FF'}} header bordered>
                        <Left>
                            <Text style = {{fontWeight:'bold'}}>
                                Información
                            </Text>
                        </Left>
                        <Right >
                            <Icon
                                type = 'Feather'
                                name = {'edit'}
                            />
                        </Right>
                    </CardItem>

                    <CardItem  bordered>
                        <Left>
                            <Text>
                                {this.state.userToken.nombre}
                            </Text>
                        </Left>
                        <Right>
                            <Text>
                                {this.state.userToken.pseudonimo}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>
                                Perteneces a unidad
                            </Text>
                        </Left>
                        <Right>
                            <Text style= {{}}>
                                {this.state.userToken.nombre_unidad}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Text style = {{alignContent:'flex-start'}}>
                                Gestionas la seisena
                        </Text>
                        <Body style ={{alignContent:"center", justifyContent: 'center',alignItems:'flex-end'}}>
                            <Button 
                                onPress={()=> console.log("Cambiar seisena")}
                                type = 'clear'
                                style = {{height:'50%'}}
                                icon = {
                                    <Icon
                                        type = 'Feather' //FontAwesome
                                        name = {'repeat'}  //exchange
                                        style = {{fontSize: 20}}
                                    />
                                }
                            />
                        </Body>
                        <Right>
                            <Text>
                                {this.state.userToken.seisena1}
                            </Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        }
    }

    RenderCards(){
        return(
            <View>
            {this.NotificationCard()}
            {this.InformativeCard()}
            </View>
        )

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Sendero Scout</Text>
                        </Body>
                        <Right></Right>
                    </Header>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}>
                    <View>
                        {
                        (this.state.userToken.unidad1 != 0) ? this.RenderCards() :
                            <View style = {{flexDirection : 'row', width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
                                <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center'}}>
                                    Cree una unidad o únase a alguna existente para poder iniciar a utilizar la aplicación.
                                </Text>
                        </View>
                        }
                    </View>
                </ScrollView>
            </View>

        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',  //'#F4F0BB'
        justifyContent: "space-between"
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },
    header:{
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        padding:20,
        paddingLeft:40,
        paddingRight:40,

    },
    menuContainer : {
        height : '70%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop:20
    },
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
        color:'white',
        fontSize:28,
        paddingTop:20,
        fontFamily:'Roboto'
    }
});
