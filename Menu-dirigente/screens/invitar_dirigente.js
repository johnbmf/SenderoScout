import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import {Header,Left,Right,Icon, Body} from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';

export default class invitar_dirigente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken : "",
            usuarioElegido: "",
            dataSource : [],
            error: false

        }
        this._bootstrapAsync();
      }
    static navigationOptions = {
        drawerLabel: 'Invitar Dirigente',
        drawerIcon: ({tintColor}) => (
            <Icon name='users' type= 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    };
    getInvitados(){
        fetch('http://www.mitra.cl/SS/get_invitados.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "grupo":this.state.userToken.grupo,
                "usuario": this.state.userToken.user 
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson != null){
                this.setState({
                    dataSource: responseJson,
                })
            }else{
                this.setState({
                    dataSource: []
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});
        //console.log("nombre: " + Token2.nombre);
        this.getInvitados();
      };
 
    crearInvitacion(){
        console.log("User reclutador:" + this.state.userToken.user);
        console.log("User invitado:" + this.state.usuarioElegido);
        fetch('http://www.mitra.cl/SS/generar_invitacion.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "user_reclutador":this.state.userToken.user,
                "user_invitado" : this.state.usuarioElegido,
                "unidad_objetivo" : this.state.userToken.unidad1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.respuesta != 0){
                this.setState({
                    error: true,
                })
                console.log(responseJson);
                
            }else{
                this.setState({
                    error:false
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    render(){
        this.state.nombres = this.state.dataSource.map(({nombre}) => nombre);
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={() => this.getInvitados()}/>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Invitar Dirigente</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                {(this.state.userToken.unidad1 == 0 || this.state.userToken.unidad1 == null ) &&                             
                    <View style = {{flexDirection : 'row', width:'90%', height:'88%', justifyContent:'center', alignItems:'center',alignSelf:'center' }}>
                        <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Unidad')}} >
                            <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center'}}>Primero debes crear una unidad para poder invitar a otros dirigentes.</Text>
                        </TouchableOpacity>
                    </View>
                }
                {(this.state.userToken.unidad1 > 0) && 
                    <View style = {{width: '90%', height:'20%', alignSelf:'center', justifyContent:'center'}}>
                        <Text style = {{color: 'black', fontSize:22, justifyContent:'center', fontFamily:'Roboto',textAlign: 'center'}}>Seleccione un dirigente de su grupo para invitarlo a su unidad.</Text>
                    </View>
                }
                {(this.state.userToken.unidad1 > 0) &&
                    <View style= {styles.pickerMenu}>
                        <Picker 
                            style = {{width:'100%', height:'100%', alignItems: 'center',flexDirection: 'row'}}
                            mode = 'dropdown'
                            selectedValue = {this.state.usuarioElegido}
                            onValueChange ={ (itemValue,itemIndex) => this.setState({usuarioElegido: itemValue}) }>
                            <Picker.Item label = "Seleccione un Dirigente" value = {0} />
                            {this.state.dataSource.map((item, index) => {return (<Picker.Item label={item.nombre} value={item.nombre} key={index}/>)})}
                        </Picker>
                    </View>
                }
                {(this.state.userToken.unidad1 > 0) &&
                    <View style = {{width: '90%', height:'20%', alignSelf:'center', justifyContent:'center'}}>
                        <Text style = {{color: 'black', fontSize:16, justifyContent:'center', fontFamily:'Roboto',textAlign: 'center'}}>Nota: Solo se muestran dirigentes pertenecientes a su grupo y que no pertenecen a alguna unidad.</Text>
                    </View>
                }
                {(this.state.userToken.unidad1 > 0) &&
                    <View style = {{width:'100%', height:'35%', justifyContent:'flex-end', alignItems:'center'}}>
                        <TouchableOpacity 
                            style={{ width:'90%',height: '35%', alignItems:'center', justifyContent: 'center', backgroundColor:'#104F55',marginBottom:20}}
                            onPress = {() => {this.crearInvitacion()}}
                            >
                            <Text style= {{
                                color:'white',
                                fontSize:38,
                                justifyContent:'center', 
                                alignItems:'center',
                                alignContent:'center',
                                fontFamily:'Roboto'
                            }}>
                                Invitar</Text>
                            </TouchableOpacity>
                        </View> 
                }
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    banner:{
        color:'white',
        fontSize:28,
        justifyContent:'center', 
        alignItems: 'flex-start',
        alignContent:'flex-start',
        fontFamily:'Roboto',
        paddingTop:20
    },
    header:{
        flex: 1,
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        justifyContent:'center', 
        alignItems:'center'
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerMenu: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '90%',
        height: '10%',
        borderBottomColor: 'gray',
        borderBottomWidth:1,
    }

});
