import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    FlatList,
    
} from "react-native";
import { Header,Left,Body} from 'native-base'
import { Icon, Rating } from 'react-native-elements'
const WOLF_HEAD = require('../assets/Wolf_Head.png')

class evalaptitudes extends Component {
    
    static navigationOptions = {
        drawerLabel: 'Consejo de la Tarde',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        )
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            PickerValue: "",
            dataSource: [],
        };
    }


    componentDidMount(){
        fetch('http://192.168.50.65/SS/GetNinosSeisena.php',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'nombre' : 'nombre',
            }),
        }).then((Response) => Response.json())
        .then((responseJson) =>{
            console.log(responseJson);
            this.setState({
                isLoading: false,
                dataSource: responseJson
            })   
        }).catch((error) => {
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
                        <Body style = {{justifyContent:'center'}}> 
                            <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                        </Body>
                    </Header >                    
                </View>

                <View style={{width: '100%', height: '7%'}} >
                    <View style = {styles.top}>
                        <Text style = {styles.header}> Evaluacion del día</Text>
                    </View>
                </View>

                <View style ={{width: '100%', height: '7%'}}>
                    
                    <View syle ={styles.Picker}>
                        <Picker 
                            selectedValue = {this.state.PickerValue}
                            style = {{}}
                            onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue : itemValue})
                            
                            }>
                            <Picker.Item label = 'Seleccione area de desarrollo' value = {null}/>   
                            <Picker.Item label = 'Corporalidad' value = {'corporalidad'}/>
                            <Picker.Item label = 'Creatividad' value = {'creatividad'} />
                            <Picker.Item label = 'Carácter' value = {'caracter'} />
                            <Picker.Item label = 'Afectividad' value = {'afectividad'} />
                            <Picker.Item label = 'Sociabilidad' value = {'sociabilidad'} />
                            <Picker.Item label = 'Espiritualidad' value = {'espiritualidad'} />
                        </Picker>
                    </View>
                </View>
                
                <View style ={ {width: '100%', height: '10%' }}>
                    <View style = {styles.UserRatingContainer}>
                        <View style ={styles.Item}>
                            <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                 Evaluacion Seisena x 
                            </Text>
                        </View>
                        <View style = {styles.Item}>
                            <View>
                                <Rating
                                    type='custom'
                                    ratingImage={WOLF_HEAD}
                                    ratingColor='#f7ec1e'
                                    ratingBackgroundColor='#c8c7c8'
                                    ratingCount={5}
                                    imageSize={30}
                                    onFinishRating={this.ratingCompleted}
                                    style={{ paddingVertical: 10 }}
                                />
                            </View>
                        </View> 
                    </View>
                </View>

                <View style = {{width: '100%', height: '64%'}}>
                    <View style = {styles.UserRatingContainer}>
                        <FlatList 
                        style = {styles.Item}
                        data={this.state.dataSource}
                        renderItem = {({item}) => <Text>{item.nombre}</Text>}
                        keyExtractor={(item, idex) => idex.toString()}
                        />
                        <Text > ESTO ES UNA PRUEBA</Text>
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
        alignItems:'center',
        alignContent:'center',
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
    },
    Picker:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    UserRatingContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Item: {
        width: '50%'
    }

});