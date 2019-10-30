import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    Image,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider, ListItem } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import {RFPercentage} from 'react-native-responsive-fontsize'

//Custom
import ActivityCard from '../CustomComponents/ActivityCard'
import CustomButton from "../CustomComponents/CustomButtons";

class DetalleInsignia extends Component {


    constructor(props){
        super(props)
        this.state = {
            //Datos de Usuario
            userToken: "",
            unidad_dirigente: -1,
            seisena: 'default',

            //Variables de estado
            setData: false, //si estan o no seteadas las recomendaciones ya sean locales o nuevas
            isLoading: false,
            warningState: false,
            insigniaEntregada : false,


            //variables funcionales
            dataInsignia : this.props.navigation.getParam('dataInsignia', {}),
            dataNino : this.props.navigation.getParam('dataNino', {})
        }
        //AsyncStorage.clear()
        //this._bootstrapAsync();
        //this.GetRecomendaciones()
        
    }
    static navigationOptions = {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='list' type = 'Entypo' style = {{fontSize:24, color:tintColor}} />
        ),
        header: null
    }
    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({
            userToken : JSON.parse(Token),
            unidad_dirigente: JSON.parse(Token)["unidad1"],
            seisena:JSON.parse(Token)["Seisena1"],
        });
      };

    GetRecomendaciones = async () =>{
        try {
            const value = await AsyncStorage.getItem('Recomendaciones');

            if (value !== null){
                console.log("Datos obtenidos con exito AsyncStorage")
                //console.log(value)
                this.setState({RecomendacionesGuardadas: JSON.parse(value)})
            }
        }catch (error) {
            console.log("Error al obtener datos AsyncStorage")
        }


    };

    StoreRecomendaciones = async (data) => {
        try {
            await AsyncStorage.setItem('Recomendaciones',JSON.stringify(data))
        } catch (error){
            console.log("Error al gruardar los datos en AsyncStorage")

        }

        console.log("Recomendaciones guardads con exito en AsyncStorage")
    }

    FormatData(fecha){
        return (fecha.split("-").reverse().join("-"))
    }

    SetWidth(porcentaje){
        return(Dimensions.get('window').width * (porcentaje/100))
    }

    SetHeight(porcentaje){
        return(Dimensions.get('window').height * (porcentaje/100))
    }

    /*
    componentDidMount(){
        this.setState({
            isLoading:true,
        })

        fetch('http://www.mitra.cl/SS/get_actividades.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    "unidad": this.state.unidad_dirigente,
                    "seisena": this.state.sisena,

                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({

                    setSmiles: true,
                    isLoading:false,
                    RecomendacionesNuevas: RecomendadasTemplate
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }
*/
 
    render() {
        console.log(this.state.dataNino.nombre)
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>{this.state.dataInsignia.Nombre}</Text>
                        </Body>
                        <Right></Right>
                    </Header >
                </View>
                <View style = {{width: '100%', height: '83%',alignItems: 'center'}}>
                    <View style = {{height: '70%', width: '100%'}}>
                        <Image style = {{ height: this.SetWidth(50), width: this.SetWidth(50), margin: 25, alignSelf: 'center'}} resizeMode ='cover' source = {this.state.dataInsignia.Icon}
                        />
                        <Text style = {styles.textdata}>
                            {this.state.dataInsignia.Descripcion}
                        </Text>
                        <ScrollView style= {{width: '100%'}}>
                            <FlatList
                            data={this.state.dataInsignia.Requisitos}
                            keyExtractor = {(item,index) => index.toString()}
                            renderItem = {({item}) => <Text style = {styles.textdata}>{'\u2022'} {item}</Text>}
                            />
                        </ScrollView>
                    </View>
                    <View style={{height: '30%', width: '100%'}}>
                        <ListItem

                            containerStyle = {{width: '100%'}}
                            leftElement = {
                                <Icon
                                    name= 'user'
                                    type= 'FontAwesome'
                                    style={{fontSize: 25, alignContent: 'center' }}
                                />
                            }
                            title = {this.state.dataNino.nombre}
                            titleStyle= {styles.textlabel}
                            rightElement = {
                                this.state.insigniaEntregada? (
                                    <Image style = {{height: this.SetHeight(83)*0.10, width: this.SetHeight(83)*0.10, aspectRatio: 1}} resizeMode= 'cover' source = {this.state.dataInsignia.Icon} />
                                ):(
                                    <View>
                                        <Image style = {{height: this.SetHeight(83)*0.10, width: this.SetHeight(83)*0.10, aspectRatio: 1, tintColor : 'gray'}} resizeMode= 'cover' source = {this.state.dataInsignia.Icon} />

                                        <Image style = {{height: this.SetHeight(83)*0.10, width: this.SetHeight(83)*0.10, aspectRatio: 1, position: 'absolute', opacity: 0.1}} resizeMode= 'cover' source = {this.state.dataInsignia.Icon} />
                                    </View>
                                    )
                                } 
                        />
                        {this.state.insigniaEntregada? (
                            <View style = {{alignItems: 'center'}}>
                                <CustomButton 
                                    onPress = {() => {console.log("Insignia entregada")} }
                                    title = 'Aceptar'
                                    name = 'long-primary-button'  
                                />
                            </View>
                        ):(
                            <View style = {{alignItems: 'center'}}>
                                <CustomButton 
                                    onPress = {() => {console.log("Volver a Insignias")} }
                                    title = 'Volver'
                                    name = 'long-primary-button'  
                                />
                            </View>
                        )
                        }
                    </View>
                </View>
                <View style = {{height: '5%'}}>

                </View>
            </View>
        );
    }
}
export default DetalleInsignia;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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

    areas_container:{
        alignItems: 'center',
        flexDirection: 'row',
    },

    area:{
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginLeft: 20,

    },


    textlabel:{
        fontFamily:'Roboto',
        fontSize:RFPercentage(3),
        fontWeight:'bold',
        marginLeft:20,
        alignContent: 'flex-start'

    },
    textdata:{
        fontFamily: 'Roboto',
        fontSize: RFPercentage(2.5),
        marginLeft:20,
        marginBottom: 10,
        alignContent: 'flex-start',
    },

    observacion:{
        fontFamily: 'Roboto',
        fontSize: 9,

    },

    alert: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }


});
