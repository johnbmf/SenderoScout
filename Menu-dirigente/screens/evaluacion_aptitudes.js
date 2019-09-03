import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    ActivityIndicator,
} from "react-native";
import { Icon,Header,Left,Body} from 'native-base'
import {Rating, Button } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'


const WOLF_HEAD = require('../assets/Wolf_Head.png')
const DEFAULT_RATING = 2

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
            isLoading: true,
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
    }
    componentDidMount(){
        //fetch('http://192.168.50.65/SS/GetNinosSeisena.php',{
        fetch('http://www.mitra.cl/SS/GetNinosSeisena.php',{    
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "seisena" : 'Amarilla',
            }),
        }).then((Response) => Response.json())
        .then((responseJson) =>{
            console.log(responseJson);
            this.setState({
                isLoading: false,
                dataSource: responseJson["data"],
                GetAlertMessage: responseJson["message"],
                GetAlertType: responseJson["type"]
            })
        }).catch((error) => {
            console.error(error);
        });
    }


    EnviarEvaluacion = () =>{

        if(this.state.PickerValue == 'default'){
            alert("Error","Es necesario elegir a un lobato");
            return;
        }
        else{
            
            //fetch('http://192.168.50.65/SS/EvaluarAptitudes.php',{
            fetch('http://www.mitra.cl/SS/EvaluarAptitudes.php',{
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
                    SendAlertType: responseJson["type"]
                })
                //this.SendAlert();
               // console.log("abrir alerta")
                //this.handleOpen
            })
            .catch((error)=>{
                console.error(error);
            });
        }
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
        this.setState({ SendAlertState: true });
      }
    
    handleClose = () => {
        this.setState({ SendAlertState: false });
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

    render() {
        //let nombres = this.state.dataSource.map(({nombre, user}) => ({nombre,user}));

        if(this.state.nombres.length < 1){//para que solo serealice una vez y no en cada render
            this.state.nombres = this.state.dataSource.map(({nombre}) => nombre);
            this.state.users = this.state.dataSource.map(({user}) => user);
        };
        const {SendAlertState} = this.state;
        console.log(this.state.nombres)

        return (
            <View style={styles.container}>

                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{justifyContent:'center'}}> 
                            <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                        </Body>
                    </Header >                    
                </View>
                <View style = {{width: '100%', height: '88%',alignItems: 'center'}}>

                    <View>
                        {this.ShowSendAlert()}
                    </View>

                    <View style ={{width: '100%', height: '22%'}}>
                        
                        <View syle ={styles.Picker}>
                            <Picker 
                                selectedValue = {this.state.PickerValue}
                                style = {{width: '80%', height: '100%', borderColor:'gray', borderWidth:1}}
                                onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue : itemValue})}>
                                <Picker.Item label = 'Seleccione un Lobato' value = {'default'}/>
                                {this.state.nombres.map((item, index) => {return (<Picker.Item label={item} value={item} key={index}/>)})}

                            </Picker>
                        </View>
                    </View>
                    
                    <View style ={ {width: '100%', height: '39%' }}>
                        <View style = {styles.AreasContainer}>
                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25,justifyContent:'center', alignItems:'center'}}>
                                    Corporalidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({corporalidad : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25,justifyContent:'center', alignItems:'center'}}>
                                        Creatividad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({creatividad : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25,justifyContent:'center', alignItems:'center'}}>
                                    Carácter:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({caracter : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25,justifyContent:'center', alignItems:'center'}}>
                                    Afectividad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({afectividad : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25,justifyContent:'center', alignItems:'center'}}>
                                    Sociabilidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({sociabilidad : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>

                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 25, justifyContent:'center', alignItems:'center'}}>
                                    Espiritualidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <View>
                                        <Rating
                                            type='custom'
                                            ratingImage={WOLF_HEAD}
                                            ratingColor='#f7ec1e'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue = {DEFAULT_RATING}
                                            ratingCount={5}
                                            imageSize={40}
                                            style={{ paddingVertical: 10 }}
                                            onFinishRating={(valor) => this.setState({espiritualidad : valor})}
                                        />
                                    </View>
                                </View>  
                            </View>
                        </View>
                    </View>

                    <View style ={ {width: '100%', height: '39%' }}>
                        <View style = {{height: '30%'}}>

                        </View>
                        <View style={{height: '70%', alignItems:'center', justifyContent:'center'}} >
                            <Button
                            onPress = {() => {this.EnviarEvaluacion(); this.handleOpen();}}
                            icon = {
                                <Icon
                                name= 'send'
                                type= 'Feather'
                                color= '#ffffff'
                                />
                            }iconRight
                            title = "Evaluar   "
                            buttonStyle = {{backgroundColor: '#104F55'}}
                            />                     
                        </View>
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
        alignItems:'center',
        alignContent:'center',
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
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextArea: {
        width: '40%',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    Rating:{
        width: '60%',
        justifyContent:'flex-start',
        alignItems: 'flex-start'

    }

});