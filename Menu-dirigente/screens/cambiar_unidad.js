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
    return (
<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
  <FlatList          
    data={this.state.data}          
    renderItem={({ item }) => ( 
      <ListItem              
        roundAvatar              
        title={`${item.name.first} ${item.name.last}`}  
        subtitle={item.email}                           
        avatar={{ uri: item.picture.thumbnail }}   
        containerStyle={{ borderBottomWidth: 0 }} 
       />          
     )}          
     keyExtractor={item => item.email}  
     ItemSeparatorComponent={this.renderSeparator} 
     ListHeaderComponent={this.renderHeader}                             
  />            
</List>
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