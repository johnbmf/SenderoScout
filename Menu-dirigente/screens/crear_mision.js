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
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class crear_mision extends Component {
    constructor(props){
        super(props);
        this.state = {
            TipoMision : 0,
            nombre_mision : '',
            desc_mision: '',
            Spot: '',
            Expiracion: 0

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
        if(this.state.TipoMision==0){
            Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }
        else if (!this.state.Spot || !this.state.Spot.trim()) {
            Alert.alert("Error","Es necesario asignar una ubicación a la misión");
            return;
        }else if (this.state.Expiracion==0) {
            Alert.alert("Error","Es necesario asignar un tiempo de expiración de la misión");
            return;
        }else if (!this.state.desc_mision || !this.state.desc_mision.trim()) {
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
                    "tipo_mision":this.state.TipoMision,
                    "nombre_mision":this.state.nombre_mision,
                    "descripcion_mision":this.state.desc_mision,
                    "spot":this.state.Spot,
                    "expiracion":this.state.Expiracion
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
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                    <View style={{width: '100%', height: '12%', alignItems:'center'}} > 
                        
                        <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                            <Left>
                                <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            </Left>
                            <Body style = {{justifyContent:'center'}}> 
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Crear Misión</Text>
                            </Body>
                        </Header >                    
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignSelf: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.TipoMision}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({TipoMision: itemValue}) }>
                                <Picker.Item label = "Elija un tipo de misión" value = {0} />
                                <Picker.Item label = "Tipo misión: Pregunta Abierta" value = {1} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.Spot}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({Spot: itemValue}) }>
                                <Picker.Item label = "Elija la ubicación de la misión" value = {0} />
                                <Picker.Item label = "Campamento" value = {'campamento'} />
                                <Picker.Item label = "Caverna" value = {'caverna'} />
                                <Picker.Item label = "Bosque" value = {'bosque'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} > 
                        <View style= {styles.pickerMenu}>
                            <Picker 
                                style = {{width:'70%', borderColor:'gray', borderWidth:1,alignItems: 'center',flexDirection: 'row'}}
                                mode = 'dropdown'
                                selectedValue = {this.state.Expiracion}
                                onValueChange ={ (itemValue,itemIndex) => this.setState({Expiracion: itemValue}) }>
                                <Picker.Item label = "Elija la duración de la misión" value = {0} />
                                <Picker.Item label = "3 días" value = {3} />
                                <Picker.Item label = "7 dias" value = {7} />
                                <Picker.Item label = "14 días" value = {14} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '7%'}} >
                                <TextInput 
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                                    underlineColorAndroid = "transparent"
                                    maxLength = {60}
                                    //{...this.props}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    onChangeText={(valor) => this.setState({nombre_mision : valor})}
                                    placeholder = "Nombre de la misión"
                                    value={this.state.nombre_mision}
                                    />
                    </View>
                    <View style={{width: '100%', height: '30%'}} >
                                <TextInput 
                                    style = {{height:'100%', width:'90%', borderColor: 'gray', borderWidth:1, textAlign:'center', justifyContent:'center',alignSelf:'center'}}
                                    placeholder = "Descripción de la misión"
                                    maxLength = {240}
                                    //{...this.props}
                                    multiline = {true}
                                    numberOfLines = {20}
                                    onChangeText={(valor) => this.setState({desc_mision : valor})}
                                    value={this.state.desc_mision}
                                    />
                    </View>
                    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
                        <TouchableOpacity 
                        onPress = {this.crearMision}
                        style = {{flex:1,width:'40%', height:'100%', backgroundColor: '#104F55', justifyContent:'center'}}>
                            <Text style = {{color: 'white', textAlign:'center', fontSize:18, backgroundColor: '#104F55'}}> Crear </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}
            
export default crear_mision;

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