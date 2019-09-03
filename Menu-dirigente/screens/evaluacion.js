import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import {Header,Left,Right,Icon, Body} from 'native-base'
import { Rating, AirbnbRating } from 'react-native-elements';
const paw_image = require('../assets/paw.png')
ratingCompleted = (rating) => {
     this.state.rating = rating;
  }
class evaluacion extends Component { 
    constructor(props){
        super(props);
        this.state = {
            rating : 0
        }
    }
    enviarEvaluacion = () =>{   
        fetch('http://www.mitra.cl/SS/evaluar_mision.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "user": data.user,
                "unidad1": "1",
                "nombre": data.nombre,
                "id": data.id,
                "estado": data.estado,
                "fecha_expiracion": data.fecha_expiracion,
                "fecha_borrado": data.fecha_borrado,
                "id_mision": data.id_mision,
                "respuesta": data.respuesta,
                "nombre_mision": data.nombre_mision,
                "descripcion_mision": data.descripcion_mision,
                "rating" : this.state.rating
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            alert(responseJson);
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    render() {
        const data = this.props.navigation.getParam('data', {});  
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
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Evaluar Misión</Text>
                            </Body>
                        </Header >                    
                    </View>
                    <View style={{width:'100%', height:'10%'}}> 
                        <View style={{width:'90%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,borderBottomColor:'black', borderBottomWidth:1,fontFamily:'Roboto'}}
                            >{data.nombre_mision} </Text>
                        </View>
                        <View style={{width:'90%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,borderBottomColor:'black', borderBottomWidth:1,fontFamily:'Roboto'}}
                            >{data.nombre} </Text>
                        </View>
                    </View>
                    <View style={{width:'100%', height:'30%'}}>
                    <View style={{width:'100%', height:'50%'}}>
                        <Text style={{fontSize:20,marginLeft:20,fontFamily:'Roboto',fontWeight:'bold'}}
                            >Descripción de la mision: 
                        </Text>
                        <ScrollView>
                            <Text style={{fontSize:20,marginLeft:25, width:'90%'}}>
                                {data.descripcion_mision}
                            </Text>
                        </ScrollView>
                        </View>
                    <View style={{width:'100%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,fontFamily:'Roboto',fontWeight:'bold'}}
                            >Respuesta: </Text>
                            <ScrollView>
                                <Text style={{fontSize:20,marginLeft:25, width:'90%'}}
                                >{data.respuesta}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                    <Text style={{fontSize:20,marginLeft:20,fontFamily:'Roboto',fontWeight:'bold'}}
                            > Puntaje: </Text>
                        <Rating
                            swipeable={'false'}
                            type='custom'
                            ratingImage={paw_image}
                            ratingColor='#f1c40f'
                            ratingBackgroundColor='#c8c7c8'
                            ratingCount={5}
                            defaultRating={0}
                            startingValue = {0}
                            imageSize={50}
                            onFinishRating={ratingCompleted}
                            style={{marginBottom:20}}
                            />
                    </View>
                    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center', marginBottom:10}} >
                        <TouchableOpacity 
                        onPress = {this.enviarEvaluacion}
                        style = {{flex:1,width:'40%', height:'100%', backgroundColor: '#104F55', justifyContent:'center'}}>
                            <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> Enviar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}
export default evaluacion;

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