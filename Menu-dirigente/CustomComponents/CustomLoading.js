import React, { Component } from "react";
import {Modal, View, Text, StatusBar, ActivityIndicator} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import CustomButton from './CustomButtons'
const CustomLoading = (props) => {
    //if type=succsess, warning or error, cambiar el icono
    // Se necesita tener una variable de estado para hacerlo aparecer, de momento se le asigna la properti aceptar/rechazar para asignar funciones a los botones asignados.
    esVisible = false;
    return (
        <Modal visible={props.visible} transparent = {true} style = {{justifyContent:'center'}}>
            <View style={{height:'100%',justifyContent:'center', alignItems:'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <ActivityIndicator 
            size="large" 
            color="#00ff00"
            />
            <StatusBar barStyle="default" />
            </View>
        </Modal>
    )
    
}


export { CustomLoading };