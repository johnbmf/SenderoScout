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
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Header,Left,Right,Icon} from 'native-base'
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class crear_mision extends Component {
    constructor(props){
        super(props);
        this.state = {
            PickerValue : 0,
            nombre_mision : '',
            desc_mision: ''

        }
    }
    static navigationOptions = {
        drawerLabel: 'Crear Misión',
        drawerIcon: ({tintColor}) => (
            <Icon name='today' style = {{fontSize:24,color:tintColor}} />
        )
    }
    crearMision = () =>{
        console.log(this.state);
        if(this.state.PickerValue==0){
            Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }
        else if (!this.state.desc_mision || !this.state.desc_mision.trim()) {
            Alert.alert("Error","Es necesaria una descripción de la misión");
            return;
        }else if (!this.state.nombre_mision || !this.state.nombre_mision.trim()) {
            Alert.alert("Error","Es necesario un nombre para la misión");
            return;
        } else {
            
            fetch('http://www.mitra.cl/SS/crearMision.php',{
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content/Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    tipo_mision:this.state.PickerValue,
                    nombre_mision:this.state.nombre_mision,
                    descripcion_mision:this.state.desc_mision
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
            
        }
        render() {
            
            return (
                <KeyboardAvoidingView style = {{flex:1}} behavior = "padding">
                    <ScrollView> 
                        <DimissKeyboard>
                            <View style = {styles.container}>
                                <View style={{width: '100%', height: '25%', backgroundColor: 'powderblue'}} />
                            </View>
                        </DimissKeyboard>
                    </ScrollView>
                </KeyboardAvoidingView>
        );
    }
}
            
export default crear_mision;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});