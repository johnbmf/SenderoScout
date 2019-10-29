import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    Image,
    Text
} from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {Rating, Divider, ListItem } from 'react-native-elements'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { ScrollView, FlatList, ViewPagerAndroid } from "react-native-gesture-handler";
import { NavigationEvents } from 'react-navigation';
import CustomButton from '../CustomComponents/CustomButtons'
import {Alerta} from './../CustomComponents/customalert'
import {CustomTextContainer} from './../CustomComponents/CustomTextContainer'

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerta : true
        }
    }
    static navigationOptions = {
        drawerLabel: 'Preferencias',
        drawerIcon: ({tintColor}) => (
            <Icon name='settings' style = {{fontSize:24,color:tintColor}} />
        )
    }


    toggleAlert(){
        this.setState({
            alerta : !this.state.alerta
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
                                <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Preferencias</Text>
                            </Body>
                            <Right></Right>
                        </Header >                    
                    </View>
                    <View style={{flex:1,width: '100%', height: '88%', alignItems:'center'}}>
                        <Content style={{width:'90%'}}>
                        <Card>
                            <CardItem>
                            <Left>
                                <Thumbnail source = {require('./../assets/perfil.png')} />
                                <Body>
                                <Text>NativeBase</Text>
                                <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody>
                            <Image source={{uri: './../assets/chart4.png'}} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                            <Left>
                                <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                            </CardItem>
                        </Card>
                        </Content>
                    </View>
            </View>
        )
    }
}export default SettingsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:'100%',
        height:'100%',
        alignItems:'center'
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
    header:{
        flex: 1,
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        justifyContent:'center', 
        alignItems:'center'
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
   
});