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
import { Icon,Header,Left,Body,Picker, Right} from 'native-base'
import {Rating, Button, Divider } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";

const Actividades = require('../Local/Actividades.json')
const RecomendadasJson = require('../Local/ActividadesRecomendadas.json')
//const RecomendacionesExistentes =  JSON.parse(AsyncStorage.getItem('Recomendaciones'))


class recomendaciones extends Component {
    static navigationOptions = {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
    }

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
                this.setState({

                    data: responseJson["data"],
                    ptj_Corporalidad: responseJson["corporalidad"],
                    ptj_creatividad: responseJson["creatividad"],
                    ptj_caracter: responseJson["caracter"],
                    ptj_afectividad: responseJson["afectividad"],
                    ptj_sociabilidad: responseJson["sociabilidad"],
                    ptj_espiritualidad: responseJson["espiritualidad"],
                    php_fecha_inicio: responseJson["fecha_inicio"],
                    php_fecha_inicio: responseJson["fecha_fin"],
                    mensaje: responseJson["message"],
                    ptj_ordenados: ordenados,

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


    RecomendarActividades(corporalidad, creatividad,caracter,afectividad,sociabilidad, espiritualidad, fecha_inicio, fecha_fin){
        //  3 del mas debil
        // 1 en el segundo mas debil
        // 2 del mas fuerte

        this.setState({isLoading:true})

        var ptj_ordenados = this.state.ptj_ordenados;
        var peores_count = 0;
        var malas_count = 0;
        var mejores_count =0;

        var temp = {"Actividades":[]}

/*
        ptj_ordenados.push(["Corporalidad",corporalidad]);
        ptj_ordenados.push(["Creatividad",creatividad]);
        ptj_ordenados.push(["Caracter",caracter]);
        ptj_ordenados.push(["Afectividad",afectividad]);
        ptj_ordenados.push(["Sociabilidad",sociabilidad]);
        ptj_ordenados.push(["Espiritualidad",espiritualidad]);

        ptj_ordenados.sort(function(a,b){
            return a[1] - b[1]
        });
*/
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

        RecomendadasJson["fecha_inicio"] = fecha_inicio
        RecomendadasJson["fecha_fin"] = fecha_fin

        this.StoreRecomendaciones(RecomendadasJson)

        this.setState({
            peor_recomendadas: RecomendadasJson["Peor_area"],
            mal_recomendadas: RecomendadasJson["Mal_area"] ,
            mejor_recomendadas: RecomendadasJson["Mejor_area"],
            fecha_inicio_recomendacion: fecha_inicio,
            fehca_fin_recomendacion: fecha_fin,
            setData: true})
    }

    MostrarRecomendadas(){
        console.log("Estado de los datos", this.state.setData)
        if (this.state.setData) {
            return(
                <ScrollView>
                <View>{this.state.peor_recomendadas.map(((obj,i) => 
                    <View key = {i}>{                    
                        <TouchableOpacity
                        onPress = {()=> this.props.navigation.navigate('DetalleActividad', {data : obj})}
                        style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                                <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> {obj["Nombre"]}</Text>
                            </TouchableOpacity>}
                    </View>
                    ))}
                </View>

                <View>{this.state.mal_recomendadas.map(((obj,i) => 
                    <View key = {i}>{                    
                        <TouchableOpacity
                        onPress = {()=> this.props.navigation.navigate('DetalleActividad', {data : obj})}
                        style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                                <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> {obj["Nombre"]}</Text>
                            </TouchableOpacity>}
                    </View>
                    ))}
                </View>

                <View>{this.state.mejor_recomendadas.map(((obj,i) => 
                    <View key = {i}>{                    
                        <TouchableOpacity
                        onPress = {()=> this.props.navigation.navigate('DetalleActividad', {data : obj})}
                        style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                                <Text style = {{color: 'white', textAlign:'center', fontSize:18}}> {obj["Nombre"]}</Text>
                            </TouchableOpacity>}
                    </View>
                    ))}
                </View>

                </ScrollView>
            )
        }
    };

    MostrarSalud(valor){

        if(this.state.setSmiles){
            return(<View></View>)

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
                <View style = {{width: '100%', height: '5%'}}>

                </View>

                <View style = {{width: '100%', height: '83%',alignItems: 'center'}}> 
                    
                    <View style = {{width: '100%', height: '40%',alignItems: 'center'}}>
                        <Text style = {styles.textlabel}>Estado Areas de Desarrollo</Text>
                        <View style = {styles.areas_container}>
                            <View style= {{width: '50%', marginTop:5}}>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Corporalidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Creatividad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Caracter</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>

                                </View>
                            </View>
                            <View style= {{width: '50%', marginTop: 5}}>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Afectividad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Sociabilidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>
                                </View>
                                <View style = {styles.area}>
                                    <View style = {{width: '50%'}}>
                                        <Text>Espiritualidad</Text>
                                    </View>
                                    <View style = {{width: '50%'}}>
                                        {this.MostrarSalud()}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                                //onPress = {()=> this.props.navigation.navigate('DetalleActividad')}
                                onPress = {()=> this.RecomendarActividades(this.state.ptj_Corporalidad, this.state.ptj_creatividad, this.state.ptj_caracter,this.state.ptj_afectividad, this.state.ptj_sociabilidad, this.state.ptj_espiritualidad, this.state.php_fecha_inicio, this.state.php_fecha_fin)}
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