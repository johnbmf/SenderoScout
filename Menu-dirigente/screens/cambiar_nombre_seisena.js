import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TextInput,
    AsyncStorage
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from '../CustomComponents/customalert'
import { List, ListItem, Button} from "react-native-elements";
import { LinearGradient } from 'expo';
import TouchableScale from 'react-native-touchable-scale';


class cambiar_nombre_seisena extends Component {
    constructor(props){
        super(props);
        this.state = {
            nuevo_nombre : '',
            estadoAlerta: false,
            tituloAlerta: "Este es el titulo de la alerta",
            mensajeAlerta: "Unidad creada con éxito",
            typeAlerta: 'Warning',
            isLoading:false,
            userToken: "",
            id_seisena: null,
            data:[],
            seisena_seleccionada:false,
            boton_cancelar_seisena:null,

        }
        this._bootstrapAsync()
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
        {{this.mostrarSeisenas()}}
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

    mostrarSeisenas(){
        this.setState({ isLoading: true});
        fetch('http://www.mitra.cl/SS/get_nombres_seisenas.php',
                {
                    method: 'POST',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        id_seisena: this.state.id_seisena,
     
                        id_unidad:this.state.userToken.unidad1 
                    })
     
                })
          .then(res => res.json())
          .then((responseData) => {
            this.setState({
              data: responseData.data,
              message: responseData.message,
              error: null,
              isLoading: false,
            });
          })
          .catch(error => {
            this.setState({ error, isLoading: false });
          });
      };


    cambiarNombreSeisena = () =>
    {   
        if(this.state.nuevo_nombre==''){
            this.setState({
                typeAlerta : 'Warning',
                estadoAlerta: true,
                tituloAlerta: "Campo faltante",
                mensajeAlerta: "Por favor escriba el nuevo nombre para la seisena"
            })
        }
        else {
        this.setState({ isLoading: true, disabled: true, SendAlertMessage: "Nombre de seisena cambiado con éxito" }, () =>
        {
            fetch('http://www.mitra.cl/SS/change_seisena.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    nuevo_nombre: this.state.nuevo_nombre,
 
                    id_seisena: this.state.id_seisena,

                    //usuario: this.state.userToken.user //TOKEN
                })
 
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    message: responseJson.message,
                    isLoading : false,
                    typeAlerta: 'Succsess',
                    estadoAlerta: true,
                    tituloAlerta : "Éxito",
                    mensajeAlerta : "El cambio de nombre fue realizado correctamente"
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

Ingresar_nuevo_nombre(){
    if (this.state.seisena_seleccionada){
        return(
            <View style={{alignItems: 'flex-start'}}>

            <Text style={{alignSelf: 'flex-start', marginLeft:15,fontSize: 16, marginBottom:15, marginTop:15}}>Ingrese el nuevo nombre de la seisena:</Text>
                    <TextInput 
                        style = {{height:'15%', width:'93%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center',borderRadius:10,marginBottom:15}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({nuevo_nombre : valor})}

                        value={this.state.nuevo_nombre}
                        />

        <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
        <CustomButton 
        onPress = {() => {this.cambiarNombreSeisena()}}
        
        title = "Cambiar Nombre"
        name = 'long-primary-button'
        />
        </View>
        </View>
        )
    }
}

seleccionar_seisena(item){
    if(!this.state.seisena_seleccionada){
        this.setState({
            seisena_seleccionada:true,
            boton_cancelar_seisena:'clear',
            data: [item],
            id_seisena:item.id_seisena
        })
    }
    else{
        {this.mostrarSeisenas()}
        this.setState({
            seisena_seleccionada:false,
            boton_cancelar_seisena:null,
            id_seisena:null,
        })
    }
}



//puede(): Funcion que muestra paneles para cambiar el nombre de seisena en caso de que tenga Unidad, en caso que no, muestra que la persona no tiene unidad. 
puede(){
if(this.state.userToken.unidad1 != 0){
    return(
    <View>
    <Text style={{alignSelf: 'flex-start', marginLeft:15,fontSize: 16, marginBottom:15, marginTop:15}}>Seleccione seisena que desea cambiar nombre:</Text>
    <ScrollView>
        <FlatList
        data = {this.state.data}
        renderItem={({ item }) => (
            <ListItem
              title={`${item.nombre_seisena}`}
              titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
               onPress={() => this.seleccionar_seisena(item)}
               rightIcon={{name : this.state.boton_cancelar_seisena}}
               Component={TouchableScale}
              friction={90} //
              tension={100} // 
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#f2e6ff', '#F9F4FF'],
                start: [1.5, 0],
                end: [0.1, 0],
              }}
              ViewComponent={LinearGradient}
              containerStyle = {{width: '93%',borderRadius:10,marginTop:2, marginLeft:15}}
            />
          )}
          keyExtractor={item => item.id_seisena}         
        />
        </ScrollView>
    </View>
);
}
else{
    return(
        <View>
    <View style = {{flexDirection : 'row', width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
    <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center',marginTop:15,marginBottom:15}}>No formas parte de una unidad, crea una o unete a la de otro dirigente.</Text>
    </View>
    <View style = {styles.container}>
    <View style = {{ width:'90%', height:'40%', alignItems:'center',alignSelf:'center',marginTop:15}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.navigate('CrearUnidad')}
                                title = "Crear nueva unidad"
                                name = 'long-secondary-button'
                    
                            />
    
    <CustomButton
                            onPress = {()=> this.props.navigation.navigate('Unidad')}
                            title = "Volver"
                            name = 'long-primary-button'

                        />
    </View>
    </View>
</View>);
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
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Cambiar nombre de seisena</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View >
                <View style = {styles.container}>
                {this.puede()}
                {this.Ingresar_nuevo_nombre()}
                </View>
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
export default cambiar_nombre_seisena;

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