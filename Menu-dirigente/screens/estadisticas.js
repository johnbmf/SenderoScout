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
    ScrollView
} from "react-native";
import {Header,Left,Right,Icon, Body} from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents, StackRouter } from 'react-navigation';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert'
import { VictoryBar, VictoryChart, VictoryTheme,VictoryLine, VictoryLabel, VictoryPolarAxis, VictoryArea } from "victory-native";
import Swiper from 'react-native-swiper'
const Height = Dimensions.get('window').height;
const Widht = Dimensions.get('window').width;
const data = [
    { quarter: 1, earnings: 1 },
    { quarter: 2, earnings: 2 },
    { quarter: 3, earnings: 3 },
    { quarter: 4, earnings: 4 },
    { quarter: 5, earnings: 5 }
  ];
class estadisticas extends Component {
    static navigationOptions = {
        drawerLabel: 'Estadísticas',
        drawerIcon: ({tintColor}) => (
            <Icon name='pie' style = {{fontSize:24,color:tintColor}} />
        )
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
                                <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Preferencias</Text>
                            </Body>
                            <Right></Right>
                        </Header >                    
                    </View>
                <View style={{width:'100%', height:'88%'}}>
                    <ScrollView 
                    nestedScrollEnabled={true}
                    contentContainerStyle = {{      
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',

                    }}>
                        <View style = {{width:'99%', height:Height*0.70}} >
                            <Text style = {styles.textlabel}>Áreas de Desarrollo</Text>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center', paddingLeft:10}}>
                                    <VictoryChart polar
                                        theme={VictoryTheme.material}
                                        height={(Height*0.57)} width={(Widht*0.95)}
                                        style = {{paddingBottom: 10}}
                                        >
                                        {
                                            ["Corporalidad", "Creatividad", "Carácter", "Afectividad", "Sociabilidad", "Espiritualidad"].map((d, i) => {
                                            return (
                                                <VictoryPolarAxis dependentAxis
                                                key={i}
                                                label={d}
                                                labelPlacement="perpendicular"
                                                style={{ 
                                                    tickLabels: { fill: "grey", padding:30, fontSize:10},
                                                    axisLabel: { fontSize:15,padding: 10},
                                                    axis: { stroke: "grey", opacity: 0.5,strokeWidth: 0.25 },
                                                    grid: { stroke: "grey", opacity: null,strokeWidth: 0.25} 
                                                }}
                                                axisValue={d}
                                                tickValues={[0,1,2,3,4,5]}
                                                domain={{y: [0, 5]}}
                                                innerRadius={20}
                                                />
                                            );
                                            })
                                        }
                                        <VictoryArea                                
                                            style={{ data: { fill: "#C14B81", alpha:0.25, fillOpacity: 0.2, strokeWidth: 2 } }}
                                            data={[
                                            { x: "Corporalidad", y: 1 },
                                            { x: "Creatividad", y: 4 },
                                            { x: "Carácter", y: 3 },
                                            { x: "Afectividad", y: 5 },
                                            { x: "Sociabilidad", y: 5 },
                                            { x: "Espiritualidad", y: 3 }
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
                                            data: { stroke: "grey" },
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
                                        data={[
                                        { x: '05-10', y: 2 },
                                        { x: '12-10', y: 3 },
                                        { x: '19-10', y: 5 },
                                        { x: '26-10', y: 5 },
                                        { x: '06-11', y: 3 },
                                        { x: '07-11', y: 3 }

                                    ]}
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
                                        data={[
                                        { x: '05-Oct', y: 2 },
                                        { x: '12-Oct', y: 3 },
                                        { x: '19-Oct', y: 5 },
                                        { x: '26-Oct', y: 5 },
                                        { x: '06-Nov', y: 3 },
                                        { x: '07-Nov', y: 3 }

                                    ]}
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
                                        data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 5 },
                                        { x: 5, y: 5 },
                                        ]} />
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
                                        data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 5 },
                                        { x: 5, y: 5 }
                                        ]} />
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
                                        data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 5 },
                                        { x: 5, y: 5 }
                                        ]} />
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
                                        data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 5 },
                                        { x: 5, y: 5 }]} />
                                </VictoryChart>
                                </View>
                            </Swiper>
                        </View>
                        <View style = {{width:Widht*0.99, height:Height*0.45, justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.textlabel}>Misiones Completadas</Text>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.36)} width={(Widht*0.85)}
                                    >
                                    <VictoryLabel text="Misiones completadas por unidad" x={Widht*0.5-20} y={30} textAnchor="middle"/>
                                    <VictoryLine
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 7 }]} />
                                </VictoryChart>
                                </View>
                    </ScrollView>
                </View>
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