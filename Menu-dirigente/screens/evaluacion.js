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
const nombre_nino = 'Pedro Chacon';
const nombre_mision = 'Mision 20';
ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  }
class evaluacion extends Component {
    static navigationOptions = {
        drawerLabel: 'Evaluación',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        )
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
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Evaluar Misión</Text>
                            </Body>
                        </Header >                    
                    </View>
                    <View style={{width:'100%', height:'10%'}}> 
                        <View style={{width:'90%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,borderBottomColor:'black', borderBottomWidth:1,fontFamily:'Roboto'}}
                            >{nombre_mision} </Text>
                        </View>
                        <View style={{width:'90%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,borderBottomColor:'black', borderBottomWidth:1,fontFamily:'Roboto'}}
                            >{nombre_nino} </Text>
                        </View>
                    </View>
                    <View style={{width:'100%', height:'30%'}}>
                    <View style={{width:'100%', height:'50%'}}>
                        <Text style={{fontSize:20,marginLeft:20,fontFamily:'Roboto',fontWeight:'bold'}}
                            >Descripción de la mision: 
                        </Text>
                        <ScrollView>
                            <Text style={{fontSize:20,marginLeft:25, width:'90%'}}
                            >s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.s simplemente el texto de relleno de las imprentas y archivos de texto.(N. del T.</Text>
                        </ScrollView>
                        </View>
                    <View style={{width:'100%', height:'50%'}}>
                            <Text style={{fontSize:20,marginLeft:20,fontFamily:'Roboto',fontWeight:'bold'}}
                            >Respuesta: </Text>
                            <ScrollView>
                                <Text style={{fontSize:20,marginLeft:25, width:'90%'}}
                                >Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el</Text>
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
                            imageSize={50}
                            onFinishRating={ratingCompleted}
                            style={{marginBottom:20}}
                            />
                    </View>
                    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center', marginBottom:10}} >
                        <TouchableOpacity 
                        onPress = {this.crearMision}
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