import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import {Rating, Button, Divider } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';

import ActivityCard from '../CustomComponents/ActivityCard'

const Actividades = require('../Local/Actividades.json')
const RecomendadasJson = require('../Local/ActividadesRecomendadas.json')
//const RecomendacionesExistentes =  JSON.parse(AsyncStorage.getItem('Recomendaciones'))


class recomendaciones extends Component {

    constructor(props){
        super(props)
        this.state = {
            unidad_dirigente: 1,
            sisena: "Amarilla",
            setData: false,
            setSmiles: false,
            isLoading: false,

            //Datos a mostrar
            peor_recomendadas: [],
            mal_recomendadas: [],
            mejor_recomendadas: [],
            fecha_inicio_recomendacion: "",
            fehca_fin_recomendacion: "",

            //Recomendaciones locales

            RecomendacionesGuardadas: {},

            //php response
            data: [],
            ptj_Corporalidad: -1,
            ptj_creatividad: -1,
            ptj_caracter: -1,
            ptj_afectividad: -1,
            ptj_sociabilidad: -1,
            ptj_espiritualidad: -1,
            php_fecha_inicio: "",
            php_fecha_fin: "",
            mensaje: "",
            ptj_ordenados: []
        }
        AsyncStorage.clear()
        this.GetRecomendaciones()
    }
    static navigationOptions = {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='gear' type = 'FontAwesome' style = {{fontSize:24, color:tintColor}} />
        )
    }


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

    
    componentDidMount(){
        var ordenados = [];
        
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
                    "unidad":this.state.unidad_dirigente,
                    "seisena":this.state.seisena,

                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                ordenados.push(["Corporalidad",responseJson["corporalidad"]]);
                ordenados.push(["Creatividad",responseJson["creatividad"]]);
                ordenados.push(["Caracter",responseJson["caracter"]]);
                ordenados.push(["Afectividad",responseJson["afectividad"]]);
                ordenados.push(["Sociabilidad",responseJson["espiritualidad"]]);
                ordenados.push(["Espiritualidad",responseJson["fecha_fin"]]);
        
                ordenados.sort(function(a,b){
                    return a[1] - b[1]
                });
                console.log(ordenados)
                this.setState({

                    data: responseJson["data"],
                    ptj_Corporalidad: responseJson["corporalidad"],
                    ptj_creatividad: responseJson["creatividad"],
                    ptj_caracter: responseJson["caracter"],
                    ptj_afectividad: responseJson["afectividad"],
                    ptj_sociabilidad: responseJson["sociabilidad"],
                    ptj_espiritualidad: responseJson["espiritualidad"],
                    php_fecha_inicio: this.FormatData(responseJson["fecha_inicio"]),
                    php_fecha_fin: this.FormatData(responseJson["fecha_fin"]),
                    mensaje: responseJson["message"],
                    ptj_ordenados: ordenados,

                    setSmiles: true,
                    isLoading:false
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }

    componentDidUpdate(){
        //console.log("largo del objeto", Object.keys(this.state.RecomendacionesGuardadas).length)
        //console.log(this.state.RecomendacionesGuardadas)

        if (Object.keys(this.state.RecomendacionesGuardadas).length !== 0  && this.state.setData === false) {
            
            this.setState({
                peor_recomendadas: this.state.RecomendacionesGuardadas["Peor_area"],
                mal_recomendadas: this.state.RecomendacionesGuardadas["Mal_area"],
                mejor_recomendadas: this.state.RecomendacionesGuardadas["Mejor_area"],
                fecha_inicio_recomendacion: this.state.RecomendacionesGuardadas["fecha_inicio"],
                fehca_fin_recomendacion: this.state.RecomendacionesGuardadas["fecha_fin"] ,
                setData: true
            })

            console.log("Las recomendaciones fueron obtenidas de la Memoria")
        }
    }


    RecomendarActividades(){
        //  3 del mas debil
        // 1 en el segundo mas debil
        // 2 del mas fuerte

        this.setState({isLoading:true})

        var ptj_ordenados = this.state.ptj_ordenados;
        var peores_count = 0;
        var malas_count = 0;
        var mejores_count =0;

        var temp = {"Actividades":[]}

        console.log(ptj_ordenados)
        //Peores


        while (peores_count < 3) {

            r = Math.round(Math.random()* (Actividades[ptj_ordenados[0][0]].length - 1));
            
            console.log("El numer random es:" + r);
            actividad_random = Actividades[ptj_ordenados[0][0]][r];
            console.log("El nombre de la actividad es " + actividad_random["Nombre"])
            

            if(Object.keys(temp["Actividades"].filter(obj => {return obj.Nombre === actividad_random["Nombre"]})).length < 1){
                temp["Actividades"].push(actividad_random)
                RecomendadasJson["Peor_area"].push(actividad_random)
                peores_count ++;
            }
        }

        //Malas
        while (malas_count < 1) {

            r = Math.round(Math.random()* (Actividades[ptj_ordenados[1][0]].length - 1));
            
            console.log("El numer random es:" + r);
            actividad_random = Actividades[ptj_ordenados[1][0]][r];
            console.log("El nombre de la actividad es " + actividad_random["Nombre"])
            

            if(Object.keys(temp["Actividades"].filter(obj => {return obj.Nombre === actividad_random["Nombre"]})).length < 1){
                temp["Actividades"].push(actividad_random)
                RecomendadasJson["Mal_area"].push(actividad_random)
                malas_count ++;
            }
        }

        //Mejores
        while (mejores_count < 2) {

            r = Math.round(Math.random()* (Actividades[ptj_ordenados[ptj_ordenados.length - 1][0]].length - 1));
            
            console.log("El numer random es:" + r);
            actividad_random = Actividades[ptj_ordenados[(ptj_ordenados.length - 1)][0]][r];
            console.log("El nombre de la actividad es " + actividad_random["Nombre"])
            

            if(Object.keys(temp["Actividades"].filter(obj => {return obj.Nombre === actividad_random["Nombre"]})).length < 1){
                temp["Actividades"].push(actividad_random)
                RecomendadasJson["Mejor_area"].push(actividad_random)
                mejores_count++;
            }
        }

        RecomendadasJson["fecha_inicio"] = this.state.php_fecha_inicio
        RecomendadasJson["fecha_fin"] = this.state.php_fecha_fin

        this.StoreRecomendaciones(RecomendadasJson)

        this.setState({
            peor_recomendadas: RecomendadasJson["Peor_area"],
            mal_recomendadas: RecomendadasJson["Mal_area"] ,
            mejor_recomendadas: RecomendadasJson["Mejor_area"],
            fecha_inicio_recomendacion: this.state.php_fecha_inicio,
            fehca_fin_recomendacion: this.state.php_fecha_fin,
            setData: true})
    }

    CustomCard = () => {
        estado = 0
        
        if (estado === 1){
            return(
            <Card>
            <CardItem header bordered button onPress={() => alert("This is Card Header")}>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
            )
        }

        else{
            return(
                <Card>
            <CardItem header bordered button onPress={() => estado = 1}>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
            )
        }



    }

    MostrarRecomendadas(){
    console.log("Estado de los datos", this.state.setData)
    
    if (this.state.setData) {
        return(
            <View>
                <ScrollView>
                    <Text>Area Peor Evaluada</Text>
                    <View>{this.state.peor_recomendadas.map(((obj,i) => 
                        <View key = {i}>{
                            <ActivityCard
                                actividad = {obj}
                                navegacion = {this.props.navigation}
                           /> 
                        }         
                        </View>
                        ))}
                    </View>
                    <Text>Area Mal Evaluada</Text>
                    <View>{this.state.mal_recomendadas.map(((obj,i) => 
                        <View key = {i}>{                    
                            <ActivityCard
                            actividad = {obj}
                            navegacion = {this.props.navigation}
                            /> 
                        } 
                        </View>
                        ))}
                    </View>
                    <Text>Area Mejor Evaluada</Text>
                    <View>{this.state.mejor_recomendadas.map(((obj,i) => 
                        <View key = {i}>{                    
                            <ActivityCard
                            actividad = {obj}
                            navegacion = {this.props.navigation}
                            /> 
                        } 
                        </View>
                        ))}
                    </View>
                    
                    <Text>*Recomendaciones en base a las evaluaciones realizadas entre las fechas:</Text>
                    <View style = {{ flexDirection: 'row'}}>
                        <Text>{this.state.php_fecha_inicio} y </Text>
                        <Text>{this.state.php_fecha_fin} </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
};

    MostrarSalud(valor){
       
        if(this.state.setSmiles && this.state.ptj_ordenados.length > 0){
            const index = this.state.ptj_ordenados.findIndex( obj => obj[0] === valor)
            
            if (index > -1 && index < 2) {
                return(
                    <Icon
                        name = 'frown'
                        type = "AntDesign"
                        style = {{fontSize: 20, color : '#d64242',alignContent: 'center', alignSelf: 'center' }}
                    />
                )
            }
            
            else if (index > 1 && index < 4) {
                return(
                    <Icon
                        name = 'meho'
                        type = "AntDesign"
                        style = {{fontSize: 20, color: '#f0e348',alignContent: 'center',alignSelf: 'center'}}
                    />
                )
            }

            else if (index > 3 && index < 6){
                    return(
                        <Icon
                            name = 'smile-circle'
                            type = "AntDesign"
                            style = {{fontSize: 20, color : '#34c240',alignContent: 'center',alignSelf: 'center'}}
                        />
                    )
            }
            else {
                console.log("error al desplegar iconos de estado")
            }
        }
        else{
            return(
            <ActivityIndicator
            style = {{alignContent: 'center'}}
            animating = {!this.state.setSmiles}
            size="small" 
            color="#00ff00" 
            />
            )
        }
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
                <View style = {{width: '100%', height: '3%'}}></View>

                <View style = {{width: '100%', height: '85%',alignItems: 'center'}}> 
                    
                    <View style = {{width: '100%', height: '30%',alignItems: 'center'}}>
                        <Text style = {styles.textlabel}>Estado Areas de Desarrollo</Text>
                        <View style = {styles.areas_container}>
                            <View style= {{width: '50%', marginTop:5}}>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Corporalidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Corporalidad")}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Creatividad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Creatividad")}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Caracter</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Caracter")}
                                    </View>

                                </View>
                            </View>
                            <View style= {{width: '50%', marginTop: 5}}>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Afectividad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Afectividad")}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Sociabilidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Sociabilidad")}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Espiritualidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud("Espiritualidad")}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Button
                            onPress = {()=> this.RecomendarActividades()}
                            icon = {
                                <Icon
                                name= 'gear'
                                type= 'FontAwesome'
                                style={{fontSize: 25, color: 'white', alignContent: 'center' }}
                                />
                            }iconRight

                            title = "Recomendar Actividades "
                            titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                            buttonStyle = {{backgroundColor: '#83cf4c',justifyContent:'center', margin: 10}}                        
                        />
                        <View style = {{width:'90%', height: "1%", alignSelf: 'center', borderBottomColor: 'green', borderBottomWidth: 1}}></View>
                    </View>
                    <View style = {{width: '90%', height: '70%',alignItems: 'center'}}>
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
    },

    observacion:{
        fontFamily: 'Roboto',
        fontSize: 9,

    }
   
});