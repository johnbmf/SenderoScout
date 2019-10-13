import React, { Component} from "react";
import {Button} from 'react-native-elements';
import { StyleSheet, Text,} from "react-native";
import { Icon,Body, Right,Left} from 'native-base'



class CustomButton extends Component{
/*
    constructor(props){
        super(props);
        this.state = {
        }

    }
*/

    render(){
        console.log(this.props.name)
        if(this.props.name == 'long-primary-button'){
            return(
                <Button
                //Caracteristicas estaticas
                    type = 'solid'
                    raised = {true}
                    containerStyle = {{margin:5, width: '90%'}}
                    buttonStyle = {{backgroundColor: '#8B4BC1', borderRadius: 15}}
                    titleStyle = {{alignContent: 'center',fontFamily: 'Roboto',fontSize: 18 , fontWeight: 'bold'}}
                //Propiedades variables
                    title= {this.props.title}
                    onPress = {this.props.onPress}
                    
                />
            )
        }
        else if (this.props.name === 'primary-button'){
            return(
                <Button
                //Caracteristicas estaticas
                    type = 'solid'
                    raised = {true}
                    containerStyle = {{margin:5, width: '30%'}}
                    buttonStyle = {{backgroundColor: '#8B4BC1', borderRadius: 15}}
                    titleStyle = {{alignContent: 'center',fontFamily: 'Roboto',fontSize: 18 , fontWeight: 'bold'}}
                //Propiedades variables
                    title= {this.props.title}
                    onPress = {this.props.onPress}
                    
                />
            )
        }
        else if (this.props.name === 'long-secondary-button'){
            return(
                <Button
                //Caracteristicas estaticas
                    type = 'outline'
                    raised = {true}
                    containerStyle = {{margin:5, width: '90%'}}
                    buttonStyle = {{borderColor:'#8B4BC1', borderRadius: 15, borderWidth: 1}}
                    titleStyle = {{alignContent: 'center',fontFamily: 'Roboto',fontSize: 18 , color: '#ab47bc' , fontWeight: 'bold'}}
                //Propiedades variables
                    title= {this.props.title}
                    onPress = {this.props.onPress}
                    
                />
            )

        }
        else if (this.props.name === 'secondary-button'){
            return(
                <Button
                //Caracteristicas estaticas
                    type = 'outline'
                    raised = {true}
                    containerStyle = {{margin:5, width: '30%'}}
                    buttonStyle = {{borderColor:'#8B4BC1', borderRadius: 15, borderWidth: 1}}
                    titleStyle = {{alignContent: 'center',fontFamily: 'Roboto',fontSize: 18 , color: '#ab47bc' , fontWeight: 'bold'}}
                //Propiedades variables
                    title= {this.props.title}
                    onPress = {this.props.onPress}      
                />
            )

        }
        else {
            return(
                <Button
                //Caracteristicas estaticas
                    type = 'solid'
                    containerStyle = {{margin:5, width: '30%'}}
                    buttonStyle = {{borderColor:'#8B4BC1', borderRadius: 15, borderWidth: 1}}
                    titleStyle = {{alignContent: 'center',fontFamily: 'Roboto',fontSize: 18, fontWeight: 'bold'}}

                //Propiedades variables
                    title= {"ERROR:NOMBRE DEL BOTON INCONRRECTO"}
                    onPress = {this.props.onPress}      
                />
            )
        }

    }

   
}export default CustomButton;


const styles = StyleSheet.create({

    BigButtonContainer:{
        marginTop: 5,
        marginBottom: 5,
        width: '90%',
    },

    BigButtonStyle:{
        backgroundColor: '#ab47bc',
    },

    BigButtonTitle: {
    alignContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 18 ,
    fontWeight: 'bold',
    },
    LittleButtonContainer:{
        width: '30%',
    },




})