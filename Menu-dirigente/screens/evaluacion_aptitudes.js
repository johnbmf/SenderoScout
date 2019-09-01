import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
} from "react-native";
import { Header,Left,Body} from 'native-base'
import {Icon,Rating, Button } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome';
const WOLF_HEAD = require('../assets/Wolf_Head.png')

class evalaptitudes extends Component {
    
    static navigationOptions = {
        drawerLabel: 'Consejo de la Tarde',
        drawerIcon: ({tintColor}) => (
            <Icon name='cannabis' style = {{fontSize:24,color:tintColor}} />
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
                <View style ={{width: '100%', height: '18%'}}>
                    
                    <View syle ={styles.Picker}>
                        <Picker 
                            selectedValue = {this.state.PickerValue}
                            style = {{width: '100%', height: '100%', borderColor:'gray', borderWidth:1}}
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
                
                <View style ={ {width: '100%', height: '35%' }}>
                    <View style = {styles.AreasContainer}>
                        
                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                Corporalidad:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>

                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                    Creatividad:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>

                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                Carácter:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>

                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                Afectividad:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>

                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20,justifyContent:'center', alignItems:'center'}}>
                                Sociabilidad:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>

                        <View style = {styles.RatingContainer}>
                            <View style ={styles.Item}>
                                <Text style = {{ fontSize: 20, justifyContent:'center', alignItems:'center'}}>
                                Espiritualidad:
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
                                        imageSize={35}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>  
                        </View>
                    </View>
                </View>

                <View style ={ {width: '100%', height: '35%' }}>
                    <View style={{width: '100%', height: '15%', alignItems:'center', justifyContent:'center'}} >
                        <Button
                        title = "Evaluar"
                        icon = {
                            <Icon
                            name = 'check'
                            size = '15'
                            color = 'White'
                            />
                        }
                        />
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
    RatingContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AreasContainer:{
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Item: {
        width: '50%'
    }

});