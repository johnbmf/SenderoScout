import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right} from 'native-base'
import {Rating, Button } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'


const WOLF_HEAD = require('../assets/Wolf_Head4.png')
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
            isLoading: false,
            PickerValue: 'default',
            seisena: 'default',
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
    //componentDidMount(){
    GetUsers =(SeisenaValue) => {
        this.setState({seisena: SeisenaValue})
        
        if(SeisenaValue == 'default'){
            this.setState({dataSource: []})
        }
        else{
            this.setState({isLoading : true})
            //fetch('http://192.168.50.65/SS/GetNinosSeisena.php',{
            fetch('http://www.mitra.cl/SS/GetNinosSeisena.php',{    
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "seisena" : SeisenaValue,
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


    EnviarEvaluacion = () =>{

        if(this.state.PickerValue == 'default'){
            return;
        }
        else{
            this.setState({isLoading : true})
            
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

                    <View style ={{width: '100%', height: '20%'}}>
                        
                        <View syle ={styles.Picker}>
                            <Picker 
                                selectedValue = {this.state.seisena}
                                style = {{width: '60%', height: '50%', borderColor:'gray', borderWidth: 5, alignItems:'center', justifyContent:'center'/*, alignSelf:'center'*/}}
                                itemStyle={{height: '50%', width:'100%',fontSize: 20}}
                                onValueChange = {(itemValue, itemIndex) => this.GetUsers(itemValue)}>
                                <Picker.Item label = 'Seleccione una Seisena' value = {'default'}/>
                                <Picker.Item label = "Seisena Amarilla" value = {"Amarilla"}/>
                                <Picker.Item label = "Seisena Gris" value = {"Gris"}/>
                            </Picker>
                            <Picker 
                                selectedValue = {this.state.PickerValue}
                                style = {{width: '60%', height: '50%', borderColor:'gray', borderWidth: 5, alignItems:'center', justifyContent:'center' /*, alignSelf:'center'*/}}
                                itemStyle={{height: '50%', width:'100%',fontSize: 20}}
                                onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue : itemValue})}>
                                <Picker.Item label = 'Seleccione un Lobato' value = {'default'}/>
                                {this.state.nombres.map((item, index) => {return (<Picker.Item label={item} value={item} key={index}/>)})}
                            </Picker>
                        </View>
                    </View>
                    
                    <View style ={ {width: '100%', height: '50%'}}>
                        
                        <View style = {styles.AreasContainer}>
                            <View style = {styles.RatingContainer}>
                                <View style ={styles.TextArea}>
                                    <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'flex-start'}}>
                                    Corporalidad:
                                    </Text>
                                </View>
                                <View style = {styles.Rating}>
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start'}}
                                        onFinishRating={(valor) => this.setState({corporalidad : valor})}
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
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start' }}
                                        onFinishRating={(valor) => this.setState({creatividad : valor})}
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
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start' }}
                                        onFinishRating={(valor) => this.setState({caracter : valor})}
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
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start' }}
                                        onFinishRating={(valor) => this.setState({afectividad : valor})}
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
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start' }}
                                        onFinishRating={(valor) => this.setState({sociabilidad : valor})}
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
                                    <Rating
                                        type='custom'
                                        ratingImage={WOLF_HEAD}
                                        ratingColor='#eff224'
                                        ratingBackgroundColor='#dedede'
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={40}
                                        style={{ justifyContent:'center', alignItems:'flex-start' }}
                                        onFinishRating={(valor) => this.setState({espiritualidad : valor})}
                                    />
                                </View>  
                            </View>
                        </View>
                    </View>

                    <View style ={ {width: '100%', height: '30%' }}>
                        <View style = {{height: '30%'}}>

                        </View>
                        <View style={{height: '70%', alignItems:'center', justifyContent:'flex-start'}} >
                            <Button
                            onPress = {() => {this.EnviarEvaluacion(); this.handleOpen();}}
                            icon = {
                                <Icon
                                name= 'send'
                                type= 'FontAwesome'
                                style={{fontSize: 22, color: 'white'}}
                                //color= '#ffffff'
                                />
                            }iconRight
                            title = "Evaluar   "
                            titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                            buttonStyle = {{backgroundColor: '#104F55',justifyContent:'center'}}
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
        width: '45%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    Rating:{
        width: '55%',
        justifyContent:'flex-start',
        //alignItems: 'flex-start',
        alignSelf:'flex-start',
        //paddingRight:10,
        backgroundColor: '#FFFFFF'

    }

});