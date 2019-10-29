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
import { VictoryBar, VictoryChart, VictoryTheme,VictoryLine, VictoryLabel } from "victory-native";
const Height = Dimensions.get('window').height;
const Widht = Dimensions.get('window').width;
const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
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
                        <View style = {{width:'90%', height:Height*0.45}} >
                            <Text style = {styles.textlabel}>Mundos de Desarrollo</Text>
                            <ScrollView 
                            horizontal={true}
                            pagingEnabled = {true}
                            contentContainerStyle = {{      
                                flexGrow: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
        
                            }}
                            >
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center'}}>
                                    <VictoryChart 
                                        height={(Height*0.39)} width={(Widht*0.85)} 
                                        theme={VictoryTheme.material} 
                                        domain={{ x: [0, 4], y: [0, 20000] }}
                                    >
                                        <VictoryLabel text="Mundo Espiritual" x={Widht*0.5-20} y={30} textAnchor="middle"/>
                                        <VictoryBar data={data} x="quarter" y="earnings" />
                                    </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center'}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    domainPadding={10}
                                    height={(Height*0.39)} width={(Widht*0.85)}
                                    domain={{ x: [0, 4], y: [0, 20000] }}
                                    >
                                    <VictoryLabel text="Mundo Mágico" x={Widht*0.5-20} y={30} textAnchor="middle"/>
                                    <VictoryBar
                                        style={{ data: { fill: "#c43a31" } }}
                                        data={data}
                                        x="quarter" y="earnings"
                                    />
                                </VictoryChart>
                                </View>
                                <View style = {{width:Widht*0.9, height:'95%', justifyContent: 'center', alignItems:'center'}}>
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    height={(Height*0.39)} width={(Widht*0.85)}
                                    >
                                    <VictoryLabel text="Mundo Corporal" x={Widht*0.5-20} y={30} textAnchor="middle"/>
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
                        <View style = {{width:Widht*0.9, height:Height*0.45, justifyContent: 'center', alignItems:'center'}}>
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
        marginLeft:10,
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