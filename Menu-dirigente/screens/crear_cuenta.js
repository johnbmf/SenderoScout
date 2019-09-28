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
const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export class crear_cuenta extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuario : "",
            password: "",
            password2: "",
            dataSource:[],
            pwerror: false
        }
    }
    check_password = () => {
        if(this.state.password != "" && this.state.password2 != "" && this.state.password === this.state.password2){
            this.setState({pwerror: true})
        } 
        else{
            return false
        }
    }
    render() {
        return (
            <DismissKeyboard>
            <View style={styles.container}>
                <View style = {{ width:'100%', height:'15%', alignItems:'center', justifyContent: 'center'}}> 
                <Text style= {styles.banner}>Bienvenido</Text>
                </View>

                <View style = {{ width:'100%', height:'85%', alignItems:'center', justifyContent:'space-between',borderBottomColor: 'black',borderBottomWidth: StyleSheet.hairlineWidth}}>
                        <TextInput 
                            style = {{height:'10%', width:'90%',backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
                            maxLength = {60}

                            //{...this.props}
                            multiline = {false}
                            allowFontScaling = {true}
                            maxFontSizeMultiplier = {2}
                            numberOfLines = {4}
                            onChangeText={(valor) => this.setState({usuario: valor})}
                            placeholder = "Nombre"
                            value={this.state.usuario}
                            />
                        <TextInput 
                            style = {{height:'10%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
                            maxLength = {60}
                            //{...this.props}
                            multiline = {false}
                            allowFontScaling = {true}
                            maxFontSizeMultiplier = {2}
                            numberOfLines = {4}
                            onChangeText={(valor) => this.setState({password : valor})}
                            placeholder = "Usuario"
                            value={this.state.password}
                            />
                        <TextInput 
                            style = {{height:'10%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
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
                        <TextInput 
                            style = {{height:'10%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
                            maxLength = {60}
                            //{...this.props}
                            secureTextEntry = {true}
                            multiline = {false}
                            allowFontScaling = {true}
                            maxFontSizeMultiplier = {2}
                            numberOfLines = {4}
                            onChangeText={(valor) => this.setState({password : valor})}
                            placeholder = "Vuelva a ingresar la contraseña"
                            value={this.state.password2}
                            />
                        <TextInput 
                            style = {{height:'10%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
                            maxLength = {60}
                            //{...this.props}
                            multiline = {false}
                            allowFontScaling = {true}
                            maxFontSizeMultiplier = {2}
                            numberOfLines = {4}
                            keyboardType = {'email-address'}
                            onChangeText={(valor) => this.setState({password : valor})}
                            placeholder = "Correo"
                            value={this.state.password}
                            />
                        <TextInput 
                            style = {{height:'10%', width:'90%', backgroundColor:'#edf1f5', paddingLeft:20}}
                            underlineColorAndroid = "transparent"
                            fontSize = {20}
                            maxLength = {60}
                            //{...this.props}
                            secureTextEntry = {true}
                            multiline = {false}
                            allowFontScaling = {true}
                            maxFontSizeMultiplier = {2}
                            numberOfLines = {4}
                            onChangeText={(valor) => this.setState({password : valor})}
                            placeholder = "Grupo"
                            value={this.state.password}
                            />
                    <TouchableOpacity 
                        style={{ width:'90%',height: '15%', alignItems:'center', justifyContent: 'center', backgroundColor:'#31B6A8',marginBottom:20}}
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

export default crear_cuenta
