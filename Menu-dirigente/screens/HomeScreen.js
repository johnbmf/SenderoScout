import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from "react-native";
import { Header,Left,Right,Icon} from 'native-base'
import MenuItem from './../components/menuitems'
class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Inicio',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Header style={{height:80,backgroundColor:'#81C14B',font:'Roboto'}}>
                    <Left style = {{flex:1, flexDirection:'row'}}>
                        <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                    </Left>
                </Header >
                <View style = {styles.top}>
                    <Text style = {styles.header} >D A S H B O A R D</Text>
                </View>
                <View style = {styles.menuContainer } >
                    <MenuItem itemImage = {require('./../assets/chart1.png')} />
                    <MenuItem itemImage = {require('./../assets/chart2.png')} />
                    <MenuItem itemImage = {require('./../assets/chart4.png')} />
                    <MenuItem itemImage = {require('./../assets/chart6.png')} />
                </View>
                <View style = {{flexDirection:'row', alignItems:'center', height:60, paddingBottom:50}}>
                    <TouchableOpacity
                    style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                        <Text style = {{color: 'white', textAlign:'center', fontSize:18, backgroundColor: '#104F55'}}> Tienes 3 misiones sin evaluar </Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'  //'#F4F0BB'
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },
    header:{
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        padding:20,
        paddingLeft:40,
        paddingRight:40,

    },
    menuContainer : {
        height : '70%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop:20
    },
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
        color:'white',
        paddingLeft:50, 
        fontSize:28,
        paddingTop:20,
        fontFamily:'Roboto'
    }
});
