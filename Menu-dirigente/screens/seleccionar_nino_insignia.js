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
    RefreshControl,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider, ListItem} from 'react-native-elements'
import { ScrollView, ViewPagerAndroid, FlatList } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import Insignias from "../Local/Insignias"


class SeleccionarNino extends Component {

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
            refreshing: false,
            warningState: false,
            setNino: false,  
            
            //Respuesta php
            respuesta : -1,
            cantidad: -1,
            miembros: [],
        }
        //AsyncStorage.clear()
        this._bootstrapAsync();
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
            seisena:JSON.parse(Token)["seisena1"],
        });
        this.getMiembros()
      };


    SetWidth(porcentaje){
        return(Dimensions.get('window').width * (porcentaje/100))
    }

    SetHeight(porcentaje){
        return(Dimensions.get('window').height * (porcentaje/100))
    }

    onRefresh() {
        //Clear old data of the list
        //Call the Service to get the latest data
        this._bootstrapAsync();
      }
    onGoBack(){
        console.log("refresh on back will focus")
        this.getMiembros()
    }

    getMiembros(){
        console.log("Mi manda tokn", this.state.userToken);
        console.log("unidad dir" , this.state.unidad_dirigente)
        console.log("seisena dir" , this.state.seisena)
        this.setState({
            isLoading:true,    
        })

        fetch('https://www.mitra.cl/SS/get_miembros_insignias.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "unidad": this.state.unidad_dirigente,
                    "seisena": this.state.seisena

                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({
                    isLoading:false,
                    setData: true,
                    respuesta: responseJson["response"],
                    cantidad : responseJson["num_rows"],
                    miembros: responseJson["miembros"]
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }

    IsInsigniaIn(NameKey, list){
        for (let i = 0; i < list.length; i++) {
            if(list[i]["id"]==NameKey){
                return true
            }
        }
        return false
    }

    SortInsignias(total, adquiridas){
        var primeras = []
        var ultimas = []

        total.forEach((obj, index) => {
            if (this.IsInsigniaIn(obj.Id, adquiridas)){
                ultimas.push(obj)
            }
            else{
                primeras.push(obj)
            }
        })
        return(primeras.concat(ultimas))
    }

    RenderLoadStatus(){
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

    RenderNino(nino){
        return(
            <ListItem
                onPress =  {()=> {this.props.navigation.navigate('EntregarInsignia', {ninoSeleccionado: nino})}}
                leftIcon = {
                    <Icon
                        name= 'user'
                        type= 'FontAwesome'
                        style={{fontSize: 25, alignContent: 'center' }}
                    />
                }
                title = {nino.nombre}
                bottomDivider
            />
        )
    }

    SelectNino(){
        if (this.state.setData){
            console.log("Seleccionar niño")
            return(
                <View>
                    <View style ={{height:'89%'}}>
                        <Text style = {{fontFamily: 'Roboto', fontSize: 20, marginLeft: 10, marginTop: 5, marginBottom: 5}}>
                        Seleccione un niño para entregarle insignias
                        </Text>
                        <ScrollView>
                            <View style= {{width: '100%'}}>
                                <FlatList
                                    data = {this.state.miembros}
                                    keyExtractor = {(item, index) => item.nombre}
                                    renderItem = {({item}) => this.RenderNino(item)}
                                />
                            </View>
                        </ScrollView>
                    </View>

                </View>
            )
        }
        else{
            return (
                <Text>No hay niños aun</Text>
            )
        }
    }

    render() {
        //console.log(this.state.ninoSeleccionado)
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}>
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Entrega de Insignias</Text>
                        </Body>
                        <Right></Right>
                    </Header>
                </View>
                <View style = {{width: '100%', height: '73%',alignItems: 'center'}}>
                    {this.RenderLoadStatus()}
                    <NavigationEvents
                        onWillFocus={() => {this.onGoBack()}}
                    />
                    {this.SelectNino()}
                </View>
                <View style = {{width: '100%', height: '15%',alignItems:"center"}}>
                    <CustomButton 
                        onPress = {() => this.props.navigation.goBack(null)}
                        title = 'Volver'
                        name = 'long-primary-button'  
                    />
                </View>
            </View>
        );
    }

}export default SeleccionarNino;

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
