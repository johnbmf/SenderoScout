import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'

class SettingsScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Preferencias',
        drawerIcon: ({tintColor}) => (
            <Icon name='settings' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Header style={{height:80,backgroundColor:'orange'}}>
                    <Left style = {{flex:1, flexDirection:'row'}}>
                        <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                    </Left>
                </Header >
                <View style = {styles.top}>
                    <Text style = {styles.header} >P R E F E R E N C I A S</Text>
                </View>
            </View>
        );
    }
}
export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
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
        height : '80%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
        color:'white',
        paddingLeft:70, 
        fontSize:28,
        paddingTop:20
    }
});