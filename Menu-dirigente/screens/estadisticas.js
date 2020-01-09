import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    ScrollView,
    StatusBar
} from "react-native";
import {
    G,
    Svg,
    Circle
  } from 'react-native-svg';
import {Header,Left,Right,Icon, Body} from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents, StackRouter } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert'
import { VictoryBar, VictoryChart, VictoryTheme,VictoryLine, VictoryLabel, VictoryPolarAxis, VictoryArea, VictoryPie, VictoryTooltip, VictoryContainer, VictoryLegend } from "victory-native";
import Swiper from 'react-native-swiper'
import {CustomLoading} from '../CustomComponents/CustomLoading';
const Height = Dimensions.get('window').height;
const Widht = Dimensions.get('window').width;
class CustomLabel extends React.Component {
    render() {
      return (
        <G>
          <VictoryLabel {...this.props}/>
          <VictoryTooltip
            {...this.props}
            x={200} y={250}
            orientation="top"
            pointerLength={0}
            cornerRadius={50}
            flyoutWidth={100}
            flyoutHeight={100}
            flyoutStyle={{ fill: "black" }}
            active={true}
          />
        </G>
      );
    }
  }
  
CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;
class estadisticas extends Component {
    static navigationOptions = {
        drawerLabel: 'Estadísticas',
        drawerIcon: ({tintColor}) => (
            <Icon name='pie' style = {{fontSize:24,color:tintColor}} />
        )
    }
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            button:false,
            dataSource: [],
            isModalVisible: false,
            hayInvitaciones: false,
            // corporalidad : [],
            // creatividad  : [],
            // caracter : [],
            // afectividad: [],
            // sociabilidad : [],
            // espiritualidad : [],
            testData : [
                { x: 'Amarilla', y: 2 },
                { x: 'Lalala23', y: 3 },
                { x: 'asdasd', y: 5 },
                ],
            radar : [],
            barra : [],
            userToken: ""
        }
        this._bootstrapAsync();
        
    }
    loadingView(){
        return (
            <View style={{height:'82%',justifyContent:'center', alignItems:'center',backgroundColor: 'white'}}>
                <ActivityIndicator 
                    size="large" 
                    color="#00ff00"
                />
                <StatusBar barStyle="default" />
            </View>
        )
    }
    noDataMsj(){
        return (
            <View style={{height:'82%',justifyContent:'center', alignItems:'center',backgroundColor: 'white'}}>
                <Text style = {{ 
                    fontFamily:'Roboto',
                    fontSize:20,
                    color: 'grey',
                    }}>
                    Evalue niños para poder ver</Text>    
                    <Text style = {{ 
                    fontFamily:'Roboto',
                    fontSize:20,
                    color: 'grey',
                    }}>
                    sus estadísticas</Text>            
            </View>
        )
    }

    _bootstrapAsync = async () => {
        const Token = await AsyncStorage.getItem('userToken');
        this.setState({userToken : JSON.parse(Token)});
        this.getEstadisticas();
      };
    //   formatData = (data) => {
    //       aux = data.map((obj,i) => {
    //           return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.corporalidad,10)}
    //       })
    //       this.setState({
    //           corporalidad : aux
    //       }, () => {console.log(this.state.corporalidad);
    //         console.log(this.state.testData);
            
    //       })

    //   }
      getEstadisticas = () => {
        fetch('http://www.mitra.cl/SS/get_estadisticas.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "unidad":this.state.userToken.unidad1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson.data != null){
                //console.log((typeof(responseJson[0].fecha_expiracion)));
                this.setState({
                    dataSource: responseJson.data,
                    radar : responseJson.radar,
                    barra : responseJson.barra,
                    isLoading: false
                }, () => {
                    console.log(this.state.dataSource);
                    //this.formatData(this.state.dataSource);
                })
                
                
            }else{
                this.setState({
                    dataSource: [],
                    isLoading: false
                })
                console.log("Respuesta no data" + responseJson.data + "Mensaje" + responseJson.message);
            
            }
        })
        .catch((error)=>{
            console.error(error);
        });
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
                                <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Estadísticas</Text>
                            </Body>
                            <Right></Right>
                        </Header>                    
                    </View>
                {this.state.isLoading ? <this.loadingView/> : <View style={{width:'100%', height:'88%'}}>
                    <ScrollView 
                    nestedScrollEnabled={true}
                    contentContainerStyle = {{      
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',

                    }}>
                        <View style = {{width:'99%', height:Height*0.70}} >
                            <Text style = {styles.textlabel}>Áreas de Desarrollo</Text>
                        {console.log(this.state.dataSource.length)}
                        {(this.state.dataSource.length <= 0) ? <this.noDataMsj/> : <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center', paddingLeft:10}}>
                                    <VictoryChart polar
                                        theme={VictoryTheme.material}
                                        height={(Height*0.57)} width={(Widht*0.95)}
                                        style = {{paddingBottom: 10}}
                                        >
                                        {
                                            ["Corporalidad", "Creatividad", "Carácter", "Afectividad", "Sociabilidad", "Espiritualidad"].map((d, i) => {
                                            return (
                                                <VictoryPolarAxis 
                                                dependentAxis
                                                key={i}
                                                label={d}
                                                labelPlacement="perpendicular"
                                                style={{ 
                                                    tickLabels: { fill: "grey", padding:30, fontSize:10},
                                                    axisLabel: { fontSize:15,padding: 10},
                                                    axis: { stroke: "grey", opacity: 0.5,strokeWidth: 0.5 },
                                                    grid: { stroke: "grey", opacity: null,strokeWidth: 0.5} 
                                                }}
                                                axisValue={d}
                                                tickValues={[0,1,2,3,4,5]}
                                                domain={{y: [0, 5]}}
                                                innerRadius={20}
                                                />
                                            );
                                            })
                                        }
                                        {console.log("RADAR!!!!")}
                                        {console.log(this.state.radar)}
                                        <VictoryArea                                
                                            style={{ data: { fill: "#C14B81", alpha:0.25, fillOpacity: 0.2, strokeWidth: 2 } }}
                                            data={[
                                            { x: "Corporalidad",  y:  parseFloat(this.state.radar[0].corporalidad   )  },
                                            { x: "Creatividad",   y:  parseFloat(this.state.radar[0].creatividad    )  },
                                            { x: "Carácter",      y:  parseFloat(this.state.radar[0].caracter       )  },
                                            { x: "Afectividad",   y:  parseFloat(this.state.radar[0].afectividad    )  },
                                            { x: "Sociabilidad",  y:  parseFloat(this.state.radar[0].sociabilidad   )  },
                                            { x: "Espiritualidad",y:  parseFloat(this.state.radar[0].espiritualidad )  }
                                            ]}
                                        />
                                        <VictoryLine
                                            data={[
                                                { x: 1, y: 5 },
                                                { x: 2, y: 5 },
                                                { x: 3, y: 5 },
                                                { x: 4, y: 5 },
                                                { x: 5, y: 5 },
                                                { x: 6, y: 5 }

                                            ]}
                                            style={{
                                            data: { stroke: "grey", strokeWidth: 0.5 },
                                            }}
                                        />
                                        <VictoryLine
                                            data={[
                                                { x: 1, y: 4 },
                                                { x: 2, y: 4 },
                                                { x: 3, y: 4 },
                                                { x: 4, y: 4 },
                                                { x: 5, y: 4 },
                                                { x: 6, y: 4 }

                                            ]}
                                            style={{
                                            data: { stroke: "grey", strokeWidth: 0.5 },
                                            }}
                                        />
                                        <VictoryLine    
                                        data={[
                                                { x: 1, y: 3 },
                                                { x: 2, y: 3 },
                                                { x: 3, y: 3 },
                                                { x: 4, y: 3 },
                                                { x: 5, y: 3 },
                                                { x: 6, y: 3 }

                                            ]}
                                            style={{
                                            data: { stroke: "grey", strokeWidth: 0.5 },
                                            }}
                                        />
                                        <VictoryLine
                                        data={[
                                                { x: 1, y: 2 },
                                                { x: 2, y: 2 },
                                                { x: 3, y: 2 },
                                                { x: 4, y: 2 },
                                                { x: 5, y: 2 },
                                                { x: 6, y: 2 }

                                            ]}
                                            style={{
                                            data: { stroke: "grey", strokeWidth: 0.5 },
                                            }}
                                        />
                                                                                <VictoryLine
                                        data={[
                                                { x: 1, y: 1 },
                                                { x: 2, y: 1 },
                                                { x: 3, y: 1 },
                                                { x: 4, y: 1 },
                                                { x: 5, y: 1 },
                                                { x: 6, y: 1 }

                                            ]}
                                            style={{
                                            data: { stroke: "grey", strokeWidth: 0.5 },
                                            }}
                                        />
                                        </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Corporalidad" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ1")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.corporalidad,10)}
                                        })}
                                         />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Creatividad" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ1")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.creatividad,10)}
                                        })}
                                         />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Carácter" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ2")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.caracter,10)}
                                        })} />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Afectividad" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ3")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.afectividad,10)}
                                        })} />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Sociabilidad" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ4")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.sociabilidad,10)}
                                        })} />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center',paddingLeft:10}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.57)} width={(Widht*0.95)}
                                    >
                                    <VictoryLabel text="Espiritualidad" x={Widht*0.5-40} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        domain={{ x: [0.5, 5.5], y: [0, 5.5] }}
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={this.state.dataSource.map((obj,i) => {
                                            {console.log("DATA OBJ5")}
                                            {console.log(obj)}
                                            return {x : obj.dia + "-" + obj.mes, y : parseInt(obj.espiritualidad,10)}
                                        })} />
                                </VictoryChart>
                                </View>
                            </Swiper>
                        }
                        </View>
                        <View style = {{width:Widht*0.99, height:Height*0.65, justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.textlabel}>Desarrollo de misiones por seisena</Text>
                        {(this.state.dataSource.length <= 0) ? <this.noDataMsj/> : <VictoryChart
                            theme = {VictoryTheme.material}
                            height={(Height*0.57)} 
                            width={(Widht*0.95)}
                            >
                            <VictoryBar 
                                data={this.state.barra.map((obj,i) => {
                                    console.log({x : i, y : parseInt(obj.puntaje,10)})
                                    return {x : obj.seisena, y : parseInt(obj.puntaje,10)}
                                })}
                                alignment="start"
                                />
                            </VictoryChart>}
                         </View>
                    </ScrollView>
                </View>}
                </View>
        );
    }
}


export default estadisticas;

const styles = StyleSheet.create({
    wrapper : {
        justifyContent: 'center',
        alignItems:'center',
        alignContent: 'center',
        width : Widht*0.98,
        margin: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },  banner:{
        color:'white',
        fontSize:28,
        justifyContent:'center', 
        alignItems: 'flex-start',
        alignContent:'flex-start',
        fontFamily:'Roboto',
        paddingTop:20
    }, textlabel : {
        fontFamily:'Roboto',
        marginTop:15,
        fontSize:20,
        fontWeight:'bold',
        marginLeft:25,
        alignContent: 'flex-start',
        alignSelf:"flex-start",
        color: 'black'
    }, textgraph : {
        fontFamily:'Roboto',
        fontSize:12,
        fontWeight:'bold',
        marginTop:50,
        marginLeft:10,
        color: 'black',
        alignContent: 'flex-start',
    }
});