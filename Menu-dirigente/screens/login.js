import React, { Component } from 'react'
import { 
    Text, 
    View,
    ActivityIndicator,
    AsyncStorage,
    StatusBar, 
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { Button } from 'native-base'
const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
const IsOK = () => (
    <View style = {{ width:'90%', height:'15%', alignItems:'center', justifyContent: 'center', backgroundColor:'#d7576b'}}>
    <Text style= {{
                    color:'white',
                    fontSize:20,
                    justifyContent:'center', 
                    alignItems:'center',
                    alignContent:'center',
                    fontFamily:'Roboto'
                }}>
                Usuario o contraseña incorrectos
    </Text>
 </View>
);
export class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuario : "",
            password: "",
            dataSource:[],
            error: false
        }
    }
    getUser(){
        fetch('http://www.mitra.cl/SS/get_user.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "usuario":this.state.usuario,
                "password": this.state.password
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                this.setState({
                    dataSource: responseJson,
                    error: false
                    
                })
                console.log(this.state.dataSource);
                AsyncStorage.setItem('userToken',this.state.dataSource);
                if(this.state.dataSource[0].user === this.state.usuario){
                    this.props.navigation.navigate('Home')
                }
                else{
                    this.setState({
                        error: true
                    });
                }
            }else{
                this.setState({
                    isLoading: false,
                    dataSource: [],
                    error: true
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    render() {
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style = {{ width:'100%', height:'15%', alignItems:'center', justifyContent: 'center'}}> 
                    <Text style= {styles.banner}>Bienvenido</Text>
                    </View>

                    <View style = {{ width:'100%', height:'50%', alignItems:'center', justifyContent:'space-between',borderBottomColor: 'black',borderBottomWidth: StyleSheet.hairlineWidth}}>
                            {this.state.error ? <IsOK/> : null}
                            <TextInput 
                                style = {{height:'20%', width:'90%',backgroundColor:'#edf1f5', paddingLeft:20}}
                                underlineColorAndroid = "transparent"
                                fontSize = {25}
                                maxLength = {60}

                                //{...this.props}
                                multiline = {false}
                                allowFontScaling = {true}
                                maxFontSizeMultiplier = {2}
                                numberOfLines = {4}
                                onChangeText={(valor) => this.setState({usuario: valor})}
                                placeholder = "Usuario"
                                value={this.state.usuario}
                                />
                            <TextInput 
                                style = {{height:'20%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                                underlineColorAndroid = "transparent"
                                fontSize = {25}
                                maxLength = {60}
                                //{...this.props}
                                secureTextEntry = {true}
                                multiline = {false}
                                allowFontScaling = {true}
                                maxFontSizeMultiplier = {2}
                                numberOfLines = {4}
                                onChangeText={(valor) => this.setState({password : valor})}
                                placeholder = "Contraseña"
                                value={this.state.password}
                                />
                        <TouchableOpacity 
                            style={{ width:'90%',height: '20%', alignItems:'center', justifyContent: 'center', backgroundColor:'#31B6A8',marginBottom:20}}
                            onPress = {() => {this.getUser()}}
                        >
                            <Text style= {{
                                    color:'white',
                                    fontSize:38,
                                    justifyContent:'center', 
                                    alignItems:'center',
                                    alignContent:'center',
                                    fontFamily:'Roboto'
                                }}>
                                Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{ width:'100%', height:'20%', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={{width: '50%', height: '50%', alignItems:'center', justifyContent: 'center'}}
                            onPress = {()=> this.props.navigation.navigate('CrearCuenta')}
                        >
                            <Text style = {{       
                                color:'black',
                                fontSize:30,
                                justifyContent:'center', 
                                alignItems:'center',
                                alignContent:'center',
                                fontFamily:'Roboto'}}>
                                Registrarse</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </DismissKeyboard>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:'100%',
        height:'100%'
    },
    banner:{
        color:'black',
        fontSize:38,
        justifyContent:'center', 
        alignItems:'center',
        alignContent:'center',
        fontFamily:'Roboto'
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
export default login
