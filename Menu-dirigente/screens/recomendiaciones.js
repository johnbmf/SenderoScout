import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right} from 'native-base'
import {Rating, Button, Divider } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";

const Actividades = require('../Local/Actividades.json')
const RecomendadasJson = require('../Local/ActividadesRecomendadas.json')

class recomendaciones extends Component {
    static navigationOptions = {
        drawerLabel: 'Recomendiaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
    }

    constructor(props){
        super(props)
        this.state = {

            setData: false,
            Recomendadas: []
        }
    }
    
    componentDidMount(){

    }
    MostrarRecomendadas(){
        console.log("Estado")
        console.log(this.state.setData)
        if (this.state.setData) {
            return(
                <ScrollView>
                <View>{this.state.Recomendadas.map(((obj,i) => 
                <View key = {i}>{                    
                    <TouchableOpacity
                    onPress = {()=> this.props.navigation.navigate('DetalleActividad', {data : obj})}
                    style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                            <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> {obj["Nombre"]}</Text>
                        </TouchableOpacity>}</View>))}
                    </View>

                </ScrollView>
            )
        }
    }

    RecomendarActividades(){
        console.log("RECOMENDACION")
        console.log(RecomendadasJson["Actividades"])
        this.setState({
            Recomendadas: RecomendadasJson["Actividades"],
            setData: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Recomendaciones</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                <View style = {{width: '100%', height: '5%'}}>

                </View>

                <View style = {{width: '100%', height: '83%',alignItems: 'center'}}> 
                    
                    <View style = {{width: '100%', height: '40%',alignItems: 'center'}}>
                        <Text style = {styles.textlabel}>Estado Areas de Desarrollo</Text>
                        <View style = {styles.areas_container}>
                            <View style= {{width: '50%', marginTop:5}}>
                                <View style = {styles.area}>
                                    <Text>Corporalidad</Text>
                                </View>
                                <View style = {styles.area}>
                                    <Text>Creatividad</Text>
                                </View>
                                <View style = {styles.area}>
                                    <Text>Caracter</Text>
                                </View>
                            </View>
                            <View style= {{width: '50%', marginTop: 5}}>
                                <View style = {styles.area}>
                                    <Text>Afectividad</Text>
                                </View>
                                <View style = {styles.area}>
                                    <Text>Sociabilidad</Text>
                                </View>
                                <View style = {styles.area}>
                                    <Text>Espiritualidad</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                                //onPress = {()=> this.props.navigation.navigate('DetalleActividad')}
                                onPress = {()=> this.RecomendarActividades()}
                                style = {{margin:10, height:50, backgroundColor: '#104F55', justifyContent:'center'}}>
                                <Text style = {{color: 'white', textAlign:'center', fontSize:18}}>  Recomendar Actividades  </Text>
                        </TouchableOpacity>
                        <View style = {{width:'90%', alignSelf: 'center', borderBottomColor: 'green', borderBottomWidth: 1}}></View>
                    </View>

                    <View style = {{width: '100%', height: '60%',alignItems: 'center'}}>
                        {this.MostrarRecomendadas()}
                    </View>
                </View>
            </View>
        );
    }
}
export default recomendaciones;

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



    }
   

});