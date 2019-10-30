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
    Image
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider, ListItem } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import ActivityCard from '../CustomComponents/ActivityCard'
import CustomButton from "../CustomComponents/CustomButtons";

class DetalleInsignia extends Component {


    constructor(props){
        super(props)
        this.state = {
            unidad_dirigente: -1,
            sisena: "",
            setData: false, //si estan o no seteadas las recomendaciones ya sean locales o nuevas
            setSmiles: false,
            isLoading: false,
            warningState: false,
            recomendacionAutorizada: false,
            //Datos usuario
            userToken: {},

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
                    <View style = {{width: '50%', height: '50%'}}>
                        <Image style = {{ height: this.SetWidth(50), width: this.SetWidth(50), margin: 25, alignSelf: 'center'}} resizeMode ='cover' source = {this.state.dataInsignia.Icon}
                        />
                    </View>
                    <View style = {{width: '100%', height: '40%'}}>
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
                    <View style = {{height: '10%', width: '100%'}}>
                        <ListItem 
                            leftIcon = {
                                <Icon
                                    name= 'user'
                                    type= 'FontAwesome'
                                    style={{fontSize: 25, alignContent: 'center' }}
                                />
                            }
                            title = {this.state.dataNino.Nombre}
                            rightElement = {<Image style = {{ height: '100%'}} source = {this.state.dataInsignia.Icon} />}
                            bottomDivider
                        
                        
                        />


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
        fontSize:20,
        fontWeight:'bold',
        marginLeft:20,
        alignContent: 'flex-start'

    },
    textdata:{
        fontFamily: 'Roboto',
        fontSize: 15,
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
