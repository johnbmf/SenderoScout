import React, { Component } from "react";
import {Modal, View, Text} from 'react-native';
import { Button, Icon } from 'react-native-elements';

const Alerta = (props) => {
    //if type=succsess, warning or error, cambiar el icono
    // Se necesita tener una variable de estado para hacerlo aparecer, de momento se le asigna la properti aceptar/rechazar para asignar funciones a los botones asignados.
    esVisible = false;
    return (
        <Modal visible={props.visible} transparent = {true} style = {{justifyContent:'center'}}>
            <View style={{height:'100%',justifyContent:'center', alignItems:'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{ felx:1, backgroundColor:'white', flexDirection:'column', justifyContent:'space-between', borderWidth:2.5, borderColor:'#81C14B', width:'95%', height:'60%', alignSelf:'center', borderRadius:8}}>
                    {(props.type == 'Warning') && <View style = {{height:'20%', justifyContent:'center', paddingTop:15}}>
                        <Icon style = {{alignSelf:'center'}} type = "antdesign" name="exclamationcircle" color = '#FFA000' size = {65}/>
                    </View>}
                    {(props.type == 'Succsess') && <View style = {{height:'20%', justifyContent:'center',paddingTop:15}}>
                        <Icon style = {{alignSelf:'center'}} type = "antdesign" name="checkcircle" color = 'green' size = {65}/>
                    </View>}
                    {(props.type == 'Error') && <View style = {{height:'20%', justifyContent:'center',paddingTop:15}}>
                        <Icon style = {{alignSelf:'center'}} type = "antdesign" name="closecircle" color = 'red' size = {65}/>
                    </View>}
                    <View style = {{width:'90%', alignSelf:'center', height:'15%',justifyContent:'center', alignContent:"center", alignItems:'center'}}>
                        <Text style = {{width:'90%', justifyContent:'center',alignContent:'center', fontSize:30, fontFamily:'Roboto',textAlign: 'center'}}>{props.titulo}</Text>
                    </View>
                    <View style = {{width:'90%', alignSelf:'center', height:'40%',justifyContent:'center', alignContent:"center", alignItems:'center'}}>
                        <Text style = {{width:'90%', justifyContent:'center',alignContent:'center', fontSize:22, fontFamily:'Roboto',textAlign: 'center'}}>{props.contenido}</Text>
                    </View>
                    <View style={{height:'20%', flexDirection:'row', justifyContent:'space-between', marginHorizontal:5, alignItems:'center'}}>
                        <Button titleStyle={{color:'#d9534f'}} buttonStyle = {{width:'80%' , marginBottom:5, alignSelf:'center', borderColor:'#d9534f'}} type = "outline" title="Rechazar" onPress = {props.rechazar} />
                        <Button titleStyle={{color:'#00AB66'}} buttonStyle = {{width:'80%' , marginBottom:5, alignSelf:'center', borderColor:'#00AB66'}} type = "outline" title="Aceptar" onPress = {props.aceptar}  />
                    </View>
                </View>
            </View>
        </Modal>
    )
    
}


export { Alerta };