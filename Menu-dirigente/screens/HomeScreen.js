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
import { Header,Left,Right,Icon} from 'native-base'
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";
import MenuItem from './../components/menuitems'
import { ThemeConsumer } from "react-native-elements";
import {Alerta} from './../CustomComponents/customalert'



const CModal = ({ nombre, value }) => (                    
    <Modal isVisible={value}>
        <View style={{ flex: 1 , backgroundColor:'white'}}>
            <Text> {nombre}</Text>
            <Button title="Hide modal" onPress={() => {HomeScreen.toggleModal()}} />
        </View>
    </Modal>
);
class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Inicio',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
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
            Pseudonimos: [],
            HayPseudonimos : false,

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
            console.log("pseudonimos")
            console.log(responseJson)
            if(responseJson["solicitudes"]>0){
                this.setState({
                    HayPseudonimos:true,
                    Pseudonimos: responseJson,
                })
            }else{
                this.setState({
                    HayPseudonimos:false,
                })
            }
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
    CModal = () => (              
        <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 , backgroundColor:'white', flexDirection:'column', justifyContent:'space-around', borderWidth:5, borderColor:'#81C14B'}}>
                <View style = {{height:'20%'}}>
                    <Text style={{fontSize:48, fontFamily:'Roboto', color: 'black', alignSelf:'center',borderBottomWidth:1}}>Invitacion</Text>
                </View>
                <View style = {{width:'90%', alignSelf:'center', height:'40%',justifyContent:'center', alignContent:"center", alignItems:'center'}}>
                    <Text style = {{width:'90%', justifyContent:'center',alignContent:'center', fontSize:25, fontFamily:'Roboto',textAlign: 'center'}}>{this.state.user_reclutador} que pertenece a tu grupo acaba de invitarte a su unidad, aceptando podrás empezar a crear misiones y evaluar a los niños que pertenescan a ella.</Text>
                </View>
                <View style={{height:'20%', paddingBottom:80}}>
                    <Button titleStyle={{color:'#00AB66'}} buttonStyle = {{width:'70%' , marginHorizontal:10, marginBottom:5, alignSelf:'center', borderColor:'#00AB66'}} type = "outline" title="Aceptar" onPress={() => {this.responderInvitacion(1, this.state.nombre_unidad,this.state.id_unidad);this.toggleModal();this.setState({update:true})}} />
                    <Button titleStyle={{color:'#d9534f'}} buttonStyle = {{width:'70%' , marginHorizontal:10, marginBottom:5, alignSelf:'center', borderColor:'#d9534f'}} type = "outline" title="Rechazar" onPress={() => {this.responderInvitacion(-1,this.state.nombre_unidad,this.state.id_unidad);this.toggleModal();this.setState({update:true})}} />
                    <Button titleStyle={{color:'#428bca'}} buttonStyle = {{width:'70%' , marginHorizontal:10, marginBottom:5, alignSelf:'center', borderColor:'#428bca'}} type = "outline" title="Cancelar" onPress={() => {this.toggleModal()}} />
                </View>
            </View>
        </Modal>
    );
    onRefresh() {
        //Clear old data of the list
        //Call the Service to get the latest data
        this._bootstrapAsync();

      }
    render() {
        return (
            <View style={styles.container}>
                <Header style={{height:80,backgroundColor:'#81C14B',font:'Roboto'}}>
                    <Left style = {{flex:1, flexDirection:'row'}}>
                        <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                    </Left>
                </Header >
                <NavigationEvents onWillFocus={() => {this.getPendientes(); this.setState({isModalVisible:false})}}/> 
                <View style = {{width: '100%', height: '20%', alignItems:'center'}}> 
                    <View style = {{ width: '90%', height: '100%', flexDirection:'column', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize:20, fontFamily:'Roboto', color: 'black', alignSelf:'center',borderBottomWidth:1}}>Unidad</Text>
                        <Text style={{fontSize:28, fontFamily:'Roboto', color: 'black', alignSelf:'center'}}>{this.state.userToken.nombre_unidad}</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
    >   

                {this.state.userToken.unidad1 == 0 &&
                    <View style = {{flexDirection : 'row', width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
                            <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center'}}>Cree una unidad o únase a alguna existente para poder iniciar a utilizar la aplicación.</Text>
                    </View>
                }
                
                {(this.state.dataSource.length > 0) &&
                <View style = {{flexDirection:'row', alignItems:'center', height:60, paddingBottom:50}}>
                    <TouchableOpacity
                    onPress = {()=> this.props.navigation.navigate('Pendientes')}
                    style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                        <Text style = {{color: 'white', textAlign:'center', fontSize:18}}>Tienes {this.state.dataSource.length} misiones sin evaluar</Text>
                    </TouchableOpacity>
                </View>}
                {(this.state.userToken.unidad1) > 0 &&
                <View style = {styles.menuContainer } >
                    <MenuItem itemImage = {require('./../assets/chart1.png')} />
                    <MenuItem itemImage = {require('./../assets/chart2.png')} />
                    <MenuItem itemImage = {require('./../assets/chart4.png')} />
                    <MenuItem itemImage = {require('./../assets/chart6.png')} />
                </View>}               
                {this.state.invitaciones.length > 0 &&
                <View style={{ width:'90%', height:'30%' , justifyContent : 'center', alignItems:'center', alignSelf:'center'}}>
                    {this.state.invitaciones.map(((obj,i) => 
                        <View style={{flexDirection:'row', marginBottom:10}} key = {i}>
                        {
                        <View key = {i}>
                        <Button
                        buttonStyle = {{marginHorizontal:10, marginBottom:5, alignSelf:'center'}}
                        onPress = {() => {this.toggleModal(obj.nombre_unidad,obj.user_reclutador,obj.id)}}
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
                </View>}
                <this.CModal/>
                    <Alerta visible = {this.state.estadoAlerta} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} rechazar = {() => {this.toggleAlert()}}
                    />

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
        paddingLeft:50, 
        fontSize:28,
        paddingTop:20,
        fontFamily:'Roboto'
    }
});
