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
    FlatList
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";
class cambiar_unidad extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre_n : '',
            nombre_unidad : '',
            SendAlertState: false,
            SendAlertMessage: "Niño o niña cambiado de unidad con exito.",
            SendAlertType: 2,
            isLoading:false,
            data : [],
            arrayholder: [],
        }
    }

    static navigationOptions = {
        drawerLabel: 'Cambiar Unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
    clearText(){
        this.setState(
            {
                nombre_n : '',
                nombre_unidad: ''
            }
        )
    }

    cambiarUnidad = () =>
    {   
        this.setState({ loading: true, disabled: true }, () =>
        {
            fetch('http://www.mitra.cl/SS/get_nombres_unidades.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    nombre_n: this.state.nombre_n,
 
                    id_unidad:1 //Change this
                })
 
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    isLoading : false,
                    SendAlertType:1
                }, ()=> {this.handleOpen()});
                this.arrayholder = responseJson.results;
            })

            .catch((error)=>{
                console.error(error);
            });
        });
    }
searchFilterFunction = nombre_n => {    
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.name.title.toUpperCase()}   
    ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
    
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });
  
  this.setState({ data: newData });  
};
  updateSearch = nombre_n => {
    this.setState({ nombre_n });
  };
    SendAlert = () => {
            if(this.state.SendAlertType == -1){
                Alert.alert("")
    
            }
            else if (this.SendAlertType == 1){
    
            }
            else {
                Alert.alert("",SendAlertMessage)
            };
         }    
    
        SendAlert = () => {
            if(this.state.SendAlertType == -1){
                Alert.alert("")
    
            }
            else if (this.SendAlertType == 1){
    
            }
            else {
    
            };
        };
    
        handleOpen = () => {

            this.setState({ 
                SendAlertState: true,
                isLoading : false 
            }, () => {
                console.log(this.state.SendAlertType);
            });
        }
        
        handleClose = () => {

            this.setState({ SendAlertState: false });
            this.setState({isLoading : false})
        }

        ShowSendAlert(){

            if (this.state.SendAlertType == 0){
                return(
                <ActivityIndicator
                    animating = {this.state.SendAlertState}
                    size="large" 
                    color="#00ff00" 
                />);
            }
            else if(this.state.SendAlertType == 1){
                return(
                    <SCLAlert
                    theme="success"
                    show={this.state.SendAlertState}
                    title="Felicidades"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="success" onPress={() => {this.handleClose(); this.props.navigation.goBack()}}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
            else if(this.state.SendAlertType == -1){
                return(
                    <SCLAlert
                    theme="danger"
                    show={this.state.SendAlertState}
                    title="Ooops"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="danger" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
            else{
                console.log("ALERTA DE ERROR NO IDENTIFICADO")
                return(
                    <SCLAlert
                    theme="warning"
                    show={this.state.SendAlertState}
                    title="Estoy Confundido"
                    subtitle= {this.state.SendAlertMessage}
                    onRequestClose = {this.handleClose}
                    >
                    <SCLAlertButton theme="warning" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                );
            }
        }

        LoadingState(){
            console.log(this.state.isLoading)
            if(this.state.isLoading){
                return(
    
                    <Modal
    
                        transparent = {true}
                        visible = {this.state.isLoading}
                        animationType = 'none'
                        onRequestClose = {()=>{console.log("Closing Modal")}}
                    > 
                        <View style = {{position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                            <ActivityIndicator
                            animating = {this.state.isLoading}
                            size="large" 
                            color="#00ff00" 
                            />    
                        </View> 
                    </Modal>
                );   
            }
        }

    render() {
    const { nombre_n } = this.state;
    return (
                <KeyboardAvoidingView style = {{flex:1}} behavior = "padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                <View>
    <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round        
      onChangeText={nombre_n => this.cambiarUnidad(nombre_n)}
      autoCorrect={false}             
    />  
                </View>
                    <View style={{width: '100%', height: '12%', alignItems:'center'}} > 
                        
                        <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                            <Left>
                                <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            </Left>
                            <Body style = {{justifyContent:'center'}}> 
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Cambiar de unidad</Text>
                            </Body>
                        </Header > 
                    </View>
                    <View>
                        {this.LoadingState()}
                        {this.ShowSendAlert()}
                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
    );

    }
}
export default cambiar_unidad;

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
    }
});