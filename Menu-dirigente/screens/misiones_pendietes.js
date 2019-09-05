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
import { NavigationEvents } from 'react-navigation';
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
            Expiracion: 0,
            isLoading: true,
            dataSource: []

        }
    }
        static navigationOptions = {
            drawerLabel: 'Cacerías',
            drawerIcon: ({tintColor}) => (
                <Icon name='star' style = {{fontSize:24,color:tintColor}} />
            )
        }
        componentDidMount(){        
            fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content/Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    "unidad":1
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson != null){
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    })
                }else{
                    this.setState({
                        isLoading: false,
                        dataSource: []
                    })
                }
            })
            .catch((error)=>{
                console.error(error);
            });
        }
        getPendientes(){
            fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content/Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    "unidad":1
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson != null){
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    })
                }else{
                    this.setState({
                        isLoading: false,
                        dataSource: []
                    })
                }
            })
            .catch((error)=>{
                console.error(error);
            });
        }

        render() {
            responseJ = this.props.navigation.getParam('data', {})
            console.log(responseJ);
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
                                    <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Cacerías</Text>
                                </Body>
                            </Header >                    
                        </View>
                        <NavigationEvents onWillFocus={() => this.getPendientes()}/> 
                        {(this.state.dataSource.length <= 0) && 
                            <View style = {{flexDirection : 'row', width:'90%', height:'88%', justifyContent:'center', alignItems:'center',alignSelf:'center' }}>
                                <Text style ={{color:'red',fontFamily:'Roboto',fontSize:30, textAlign: 'center'}}>No se encuentran misiones disponibles para evaluar.</Text>
                            </View>

                            }
                        {(this.state.dataSource.length > 0) &&    
                            <View style = {{width:'100%', height:'80%'}}> 
                            <View>{this.state.dataSource.map(((obj,i) => 
                            <View key = {i}>{                    
                                <TouchableOpacity
                                onPress = {()=> this.props.navigation.navigate('./screen/evaluacion', {data : obj})}
                                style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                                        <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> {obj.nombre}</Text>
                                    </TouchableOpacity>}</View>))}
                                </View>
                            </View>
                            }
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