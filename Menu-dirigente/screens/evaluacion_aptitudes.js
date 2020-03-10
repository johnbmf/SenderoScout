import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right} from 'native-base'
import {Rating, Button } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import {ScrollView} from "react-native-gesture-handler";

import CustomButton from "../CustomComponents/CustomButtons";
import CustomRating from "../CustomComponents/CustomRating";


const WOLF_HEAD = require('../assets/Wolf_Head4.png')
const DEFAULT_RATING = 2
const RATING_WIDTH_PERCENT = 70
class evalaptitudes extends Component {
    
    static navigationOptions = {
        drawerLabel: 'Consejo de la Tarde',
        drawerIcon: ({tintColor}) => (
            <Icon name='angellist' type = 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    }

    constructor(props){
        super(props)
        this.state = {
            //datos usuarios
            unidad_dirigente: -1,
            userToken:{},
            seisena: 'default',

            isLoading: false,
            PickerValue: 'default',
            dataSource: [],
            users:[],
            nombres: [],
            corporalidad: DEFAULT_RATING,
            creatividad: DEFAULT_RATING,
            caracter: DEFAULT_RATING,
            afectividad: DEFAULT_RATING,
            sociabilidad:DEFAULT_RATING,
            espiritualidad:DEFAULT_RATING,
            GetAlertState: false,
            GetAlertMessage: "",
            GetAlertType:0, //-1 error 0 esperando 1 exito etoc error inesperado

            SendAlertState: false,
            SendAlertMessage: "Ha Ocurrido un error inesperado, Intentelo nuevamente.",
            SendAlertType: 0,
        };
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        console.log("Token ",JSON.parse(Token))
        this.setState({
            userToken : JSON.parse(Token),
            unidad_dirigente : JSON.parse(Token)["unidad1"],
            seisena : JSON.parse(Token)["seisena1"],
        });
        this.GetUsers(JSON.parse(Token)["seisena1"],JSON.parse(Token)["unidad1"])
    };

    SetWidth(porcentaje){
        return(Dimensions.get('window').width * (porcentaje/130))
    }

    SetHeight(porcentaje){
        return(Dimensions.get('window').height * (porcentaje/100))
    }
    
    GetUsers =(SeisenaValue, UnidadValue) => {
        //this.setState({seisena: SeisenaValue})
        console.log("LA SeisenaValue", this.state.seisena)
        if(SeisenaValue == 'default'){
            this.setState({dataSource: []})
        }
        else{
            console.log()
            this.setState({isLoading : true})
            //fetch('https://192.168.50.65/SS/GetNinosSeisena.php',{
            fetch('https://www.mitra.cl/SS/GetNinosSeisena.php',{    
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "seisena" : SeisenaValue,
                    "unida": UnidadValue,
                }),
            }).then((Response) => Response.json())
            .then((responseJson) =>{
                console.log(this.state.seisena)
                console.log(responseJson);
                this.setState({
                    dataSource: responseJson["data"],
                    GetAlertMessage: responseJson["message"],
                    GetAlertType: responseJson["type"],
                    isLoading: false
                })
            }).catch((error) => {
                console.error(error);
            });
        }
    }
 /*   
    componentDidMount(){
        console.log("recomendacion",this.state.userToken)
        this.GetUsers(this.state.seisena)
    }
*/
    EnviarEvaluacion = () =>{

        if(this.state.PickerValue == 'default'){
            return;
        }
        else{
            this.setState({isLoading : true})
            
            //fetch('https://192.168.50.65/SS/EvaluarAptitudes.php',{
            fetch('https://www.mitra.cl/SS/EvaluarAptitudes.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    "usuario":this.state.users[this.state.nombres.indexOf(this.state.PickerValue)],
                    "nombre":this.state.PickerValue,
                    "corporalidad":this.state.corporalidad,
                    "creatividad":this.state.creatividad,
                    "caracter":this.state.caracter,
                    "afectividad":this.state.afectividad,
                    "sociabilidad":this.state.sociabilidad,
                    "espiritualidad":this.state.espiritualidad
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    SendAlertMessage: responseJson["message"],
                    SendAlertType: responseJson["type"],
                    isLoading:false
                })
            })
            .catch((error)=>{
                console.error(error);
            });
        }
    }

    handleOpen = () => {
        this.setState({ SendAlertState: true });
    }
    
    handleClose = () => {
        this.setState({ SendAlertState: false });
    }

    ShowSendAlert(){
        if(this.state.PickerValue == 'default'){
            return(
                <SCLAlert
                theme="warning"
                show={this.state.SendAlertState}
                title="Seleccione un Lobato"
                subtitle= "Primero debe seleccionar un Lobato a calificar."
                onRequestClose = {this.handleClose}
                >
                <SCLAlertButton theme="warning" onPress={this.handleClose}>Aceptar</SCLAlertButton>
                </SCLAlert>
            );
        }
        else{
            if (this.state.SendAlertType == 0){
                return(
                    <Modal
                        transparent = {true}
                        visible = {this.state.isLoading}
                        animationType = 'none'
                        onRequestClose = {()=>{console.log("Closion Modal")}}
                    > 
                        <View style = {{position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
                            <ActivityIndicator
                            animating = {this.state.isLoading}
                            size="large" 
                            color="#00ff00" 
                            />    
                        </View> 
                    </Modal>
                ); 
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
                    <SCLAlertButton theme="success" onPress={this.handleClose}>Aceptar</SCLAlertButton>
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
                    <View style = {{ position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(52, 52, 52, 0.2)'}}>
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

        /*
        //let nombres = this.state.dataSource.map(({nombre, user}) => ({nombre,user}));

        if(this.state.nombres.length < 1){//para que solo serealice una vez y no en cada render
            this.state.nombres = this.state.dataSource.map(({nombre}) => nombre);
            this.state.users = this.state.dataSource.map(({user}) => user);
        };
        */
        this.state.nombres = this.state.dataSource.map(({nombre}) => nombre);
        this.state.users = this.state.dataSource.map(({user}) => user);

        //const {SendAlertState} = this.state;
        console.log(this.state.nombres)

        return (
            <View style={styles.container}>

                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Consejo de la Tarde</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>

                <View style = {{width: '100%', height: '88%',alignItems: 'center'}}>

                    <View>
                        {this.ShowSendAlert()}
                    </View>
                    <View>
                        {this.LoadingState()}
                    </View>
                    
                    <View style ={ {width: '100%', height: '80%'}}>
                        <ScrollView>
                            
                    <View style ={{width: '95%', height: '7%', borderColor:'gray', borderWidth:1,alignSelf: 'center',borderRadius:10, marginVertical:20}}>
                        
                        <View syle ={styles.Picker}>
                            <Picker 
                                selectedValue = {this.state.PickerValue}
                                style = {{width: '100%', height: '100%', borderColor:'gray', borderWidth: 5, alignItems:'center', justifyContent:'center' , alignSelf:'center'}}
                                itemStyle={{height: '50%', width:'100%',fontSize: 20}}
                                onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue : itemValue})}>
                                <Picker.Item label = 'Seleccione un Lobato' value = {'default'}/>
                                {this.state.nombres.map((item, index) => {return (<Picker.Item label={item} value={item} key={index}/>)})}
                            </Picker>
                        </View>
                    </View>
                
                        
                        <View style = {styles.AreasContainer}>
                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'flex-start'}}>
                                    Corporalidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                <CustomRating
                                        onChange = {(valor) => {this.setState({corporalidad: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'flex-start'}}>
                                        Creatividad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                <CustomRating
                                        onChange = {(valor) => {this.setState({creatividad: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems: 'flex-start'}}>
                                    Carácter:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                <CustomRating
                                        onChange = {(valor) => {this.setState({caracter: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'flex-start'}}>
                                    Afectividad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                <CustomRating
                                        onChange = {(valor) => {this.setState({afectividad: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'flex-start'}}>
                                    Sociabilidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <CustomRating
                                        onChange = {(valor) => {this.setState({sociabilidad: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text numberOfLines={1} style = {{ fontSize: 20, justifyContent:'center', alignItems:'flex-start'}}>
                                    Espiritualidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                <CustomRating
                                        onChange = {(valor) => {this.setState({espiritualidad: valor})}}
                                        width = {this.SetWidth(RATING_WIDTH_PERCENT)}
                                    />
                                </View>  
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                    

                    <View style ={ {width: '100%', height: '10%', alignItems:'center',  }}>
                        <CustomButton
                        onPress = {() => {this.EnviarEvaluacion(); this.handleOpen();}}
                        title = "Evaluar"
                        name = 'long-primary-button'
                        />                     
                    </View>
                </View>
            </View>
        );
    }
}
export default evalaptitudes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'Roboto'
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
    Picker:{

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    RatingContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AreasContainer:{
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        //alignItems: 'center',
        justifyContent: 'center'
    },
    TextArea: {
        width: '40%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 5,
        height: '80%'
    },
    Rating:{
        width: '53%',
        justifyContent:'flex-start',
        //alignItems: 'flex-start',
        alignSelf:'flex-start',
        //paddingRight:10,
        backgroundColor: '#FFFFFF'

    }

});