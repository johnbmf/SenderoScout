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
            usuarioElegido: ""
        }
        this._bootstrapAsync();
      }
      _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});
        //console.log("nombre: " + Token2.nombre);
      };
    static navigationOptions = {
        drawerLabel: 'Invitar Dirigente',
        drawerIcon: ({tintColor}) => (
            <Icon name='users' type= 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
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
                <View style = {{width: '90%', height:'20%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style = {{color: 'black', fontSize:22, justifyContent:'center', fontFamily:'Roboto',textAlign: 'center'}}>Seleccione un dirigente de su grupo para invitarlo a su unidad.</Text>
                </View>
                <View style= {styles.pickerMenu}>
                    <Picker 
                        style = {{width:'100%', height:'100%', alignItems: 'center',flexDirection: 'row'}}
                        mode = 'dropdown'
                        selectedValue = {this.state.usuarioElegido}
                        onValueChange ={ (itemValue,itemIndex) => this.setState({usuarioElegido: itemValue}) }>
                        <Picker.Item label = "Seleccione un Dirigente" value = {0} />
                        <Picker.Item label = "Campamento" value = {'campamento'} />
                        <Picker.Item label = "Caverna" value = {'caverna'} />
                        <Picker.Item label = "Bosque" value = {'bosque'} />
                    </Picker>
                </View>
                <View style = {{width: '90%', height:'20%', alignSelf:'center', justifyContent:'center'}}>
                    <Text style = {{color: 'black', fontSize:16, justifyContent:'center', fontFamily:'Roboto',textAlign: 'center'}}>Nota: Solo se muestran dirigentes pertenecientes a su grupo y que no pertenecen a alguna unidad.</Text>
                </View>
                <View style = {{width:'100%', height:'35%', justifyContent:'flex-end', alignItems:'center'}}>
                    <TouchableOpacity 
                        style={{ width:'90%',height: '35%', alignItems:'center', justifyContent: 'center', backgroundColor:'#104F55',marginBottom:20}}
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
                            Invitar</Text>
                        </TouchableOpacity>
                    </View>
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
