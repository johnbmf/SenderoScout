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
import CustomButton from "../CustomComponents/CustomButtons";
import Insignias from "../Local/Insignias"




class EntregaInsignias extends Component {


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
            toRefresh:false,
            warningState: false,
            setNiño: false,
            
            //variables funcionales
            ninoSeleccionado: this.props.navigation.getParam('ninoSeleccionado', {}),
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
        this.setState({ninoSeleccionado: this.props.navigation.getParam('ninoSeleccionado', {})})
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

    RenderInsignia(item) {
        //console.log(this.state.ninoSeleccionado)    
        if(this.IsInsigniaIn(item.Id, this.state.ninoSeleccionado["insignias"])){
            return(
                <TouchableOpacity 
                    style= {{height: this.SetWidth(20), width: this.SetWidth(20), alignContent: 'space-between', margin: 10, marginBottom: 25}}
                    onPress = {() => this.props.navigation.navigate('DetalleInsignia', {dataInsignia : item, dataNino: this.state.ninoSeleccionado})}>
                    <Image style = {{height: this.SetWidth(20), width: this.SetWidth(20), aspectRatio: 1,tintColor:'gray'}} resizeMode ='cover' source = {item.Icon} />
                    <Image style = {{height: this.SetWidth(20), width: this.SetWidth(20), aspectRatio: 1, position: 'absolute', opacity: 0.1}} resizeMode= 'cover' source = {item.Icon} />
                    <Text style = {{fontFamily: 'Roboto', fontSize: 12, textAlign: 'center',alignSelf:"center", margin:2}}>
                    {item.Nombre}
                    </Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <TouchableOpacity 
                    style= {{height: this.SetWidth(20), width: this.SetWidth(20),  aspectRatio: 1, alignContent: 'space-between', margin: 10,marginBottom: 25}}
                    onPress = {()=> {this.props.navigation.navigate('DetalleInsignia', {dataInsignia : item, dataNino: this.state.ninoSeleccionado})}}>
                    <Image style = {{height: this.SetWidth(20), width: this.SetWidth(20), aspectRatio: 1}} resizeMode ='cover' source = {item.Icon} />
                    <Text style = {{fontFamily: 'Roboto', fontSize: 12, textAlign: 'center',alignSelf:"center", margin:2}}>
                    {item.Nombre}
                    </Text>
                </TouchableOpacity>

            )
        }
    }
    SelectInsignia(){
        console.log("seleccion de insignias")
        console.log(this.state.ninoSeleccionado)
        return(
            <View style = {{height: "100%",width: '100%', alignContent:'space-around',}}>
                <ListItem
                    leftIcon = {
                        <Icon
                            name= 'user'
                            type= 'FontAwesome'
                            style={{fontSize: 25, alignContent: 'center' }}
                        />
                    }
                    title = {this.state.ninoSeleccionado.nombre}
                    bottomDivider
                />
                <ScrollView style = {{flex:1}} contentContainerStyle={{flexGrow:1}} refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20}}
                    style = {{alignContent: 'space-between'}}
                    numColumns = {4}
                    data = {this.SortInsignias(Insignias, this.state.ninoSeleccionado["insignias"])}
                    renderItem = {({item}) => this.RenderInsignia(item)}
                    keyExtractor = {item => item.Id}
                />         
                </ScrollView>   
            </View>
        )
    }
    
    
    render() {
        console.log(this.state.ninoSeleccionado)
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
                    {(this.state.ninoSeleccionado !=null)? this.SelectInsignia(): null}
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

}export default EntregaInsignias;

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
