import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Dimensions
} from "react-native";
import { Icon,Header,Left,Body,Picker, Right, Card, CardItem} from 'native-base'
import CustomButton from "../CustomComponents/CustomButtons";

class Unidad extends Component {
    static navigationOptions = {
        drawerLabel: 'Gestion unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='users' type= 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return(

        <View style={styles.container}>
                   <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>

                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Gestion Unidad</Text>
                        </Body>
                        <Right></Right>
                    </Header>                  
                </View>
                <View elevation = {5} style = {{width: '100%', height: '88%',alignItems: 'center'}}>
                    <View style = {{width: '70%', height: '30%', alignItems: 'center', alignSelf: 'center'}}></View>
                    <View style = {{width: '100%', height: '50%', alignItems: 'center', alignSelf: 'center'}} >
                        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.navigate('CrearUnidad')}
                                title = "Crear nueva unidad"
                                name = 'long-secondary-button'
                    
                            />
                        </View>
                        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.navigate('CambiarUnidad')}
                                title = "Cambiar niño de unidad"
                                name = 'long-secondary-button'

                            />
                        </View>
                        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.navigate('GestionarSeisena')}
                                title = "Gestionar seisena"
                                name = 'long-secondary-button'
                    
                            />
                        </View>
                        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.navigate('CambiarNombreSeisena')}
                                title = "Cambiar nombre seisena"
                                name = 'long-secondary-button'

                            />
                        </View>
                    </View>
                    
                    <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center',}}>
                            <CustomButton
                                onPress = {()=> this.props.navigation.goBack(null)}
                                title = "Volver"
                                name = 'long-primary-button'
   
                            />
                    </View>
                </View>
            </View>
        );
    }
}
export default Unidad;

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