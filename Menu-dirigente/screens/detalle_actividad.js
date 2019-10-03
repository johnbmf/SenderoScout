import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right} from 'native-base'
import {Rating, Button } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList } from "react-native-gesture-handler";


const Actividades = require('../Local/Actividades.json')


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
            NombreActividad: '',
            ResumenActividad: '',
            AreaActividad: '',
            DescripcionActividad: '',
            MaterialesActividad: '',
            DuracionActividad: '',
            Actividad_seleccionada: {} ,
        }
    }


    componentDidMount(){
    }

    render() {

        console.log(this.state.TestRecomendaciones)

        //console.log(this.state.Actividad_seleccionada["Nombre"])
        //console.log(this.state.Actividad_seleccionada["Area"])
        //console.log(this.state.Actividad_seleccionada["Duracion"])


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
                <View style = {{width: '100%', height: '88%',alignItems: 'center'}}>
                    
                    <View style = {{width: '100%', height: '5%'}}></View>
                    
                    <View style = {{width: '100%', height: '20%', flexDirection: 'column'}}>
                        <View style={styles.campo}>
                            <Text style = {styles.textlabel}>Nombre</Text>
                            <Text style = {styles.textdata}>{this.state.Actividad_seleccionada["Nombre"]}</Text>
                        </View>

                        <View style={styles.campo}>
                            <Text style = {styles.textlabel}>Area desarrollo</Text>
                            <Text style = {styles.textdata}>{this.state.Actividad_seleccionada["Area"]}</Text>
                        </View>

                        <View style={styles.campo}>
                            <Text style = {styles.textlabel}>Duración</Text>
                            <Text style = {styles.textdata}>{this.state.Actividad_seleccionada["Duracion"]}</Text>
                        </View>
     

                    </View>
                    <View style = {{width: '100%', height: '55%', flexDirection: 'column'}}>
                        <ScrollView style = {{width:'95%', height: '100%', alignSelf: 'flex-start'   }}>
                            <Text style = {styles.textlabel}>Descripcion</Text>
                            <Text style = {styles.textdata}>{this.state.Actividad_seleccionada["Descripcion"]}{'\n'}</Text>
                            <Text style = {styles.textlabel}>Materiales</Text>
                            <FlatList
                                data = {this.state.Actividad_seleccionada["Materiales"]}
                                renderItem = {({item}) => <Text style = {styles.textdata}>{'\u2022'} {item.key}</Text>}
                                
                            />

                        </ScrollView>
                    </View>
                    <View style = {{width: '100%', height: '20%', flexDirection: 'column'}}>

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

    campo:{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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