import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
} from "react-native";
import { Icon,Header,Left,Body} from 'native-base'
import {Rating, Button } from 'react-native-elements'
const WOLF_HEAD = require('../assets/Wolf_Head.png')
const DEFAULT_RATING = 2

class evalaptitudes extends Component {
    
    static navigationOptions = {
        drawerLabel: 'Consejo de la Tarde',
        drawerIcon: ({tintColor}) => (
            <Icon name='angellist' type = 'FontAwesome' style = {{fontSize:24,color:tintColor}} />
        )
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            PickerValue: 'default',
            dataSource: [],
            users:[],
            nombres: [],
            corporalidad: DEFAULT_RATING,
            creatividad: DEFAULT_RATING,
            caracter: DEFAULT_RATING,
            afectividad: DEFAULT_RATING,
            sociabilidad:DEFAULT_RATING,
            espiritualidad:DEFAULT_RATING
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


    EnviarEvaluacion = () =>{

        if(this.state.PickerValue == 'default'){
            Alert.alert("Error","Es necesario elegir a un lobato");
            return;
        }
        else{
            
            fetch('http://192.168.50.65/SS/EvaluarAptitudes.php',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    "usuario":this.state.users[this.state.nombres.indexOf(this.state.PickerValue)],
                    "nombre":this.state.PickerValue,
                    "corporalidad":this.state.corporalidad,
                    "creatividad":this.state.creatividad,
                    "caracter":this.state.caracter,
                    "afectividad":this.state.afectividad,
                    "sociabilidad":this.state.sociabilidad,
                    "espiritualidad":this.state.espiritualidad
                })
            })

        }
    }
   
    render() {
        //let nombres = this.state.dataSource.map(({nombre, user}) => ({nombre,user}));

        if(this.state.nombres.length < 1){
            this.state.nombres = this.state.dataSource.map(({nombre}) => nombre);
            this.state.users = this.state.dataSource.map(({user}) => user);
        };
        console.log(this.state.nombres)



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
                            style = {{width: '80%', height: '100%', borderColor:'gray', borderWidth:1}}
                            onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue : itemValue})}>
                            <Picker.Item label = 'Seleccione un Lobato' value = {'default'}/>
                            {this.state.nombres.map((item, index) => {return (<Picker.Item label={item} value={item} key={index}/>)})}

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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({corporalidad : valor})}
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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({creatividad : valor})}
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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({caracter : valor})}
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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({afectividad : valor})}
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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({sociabilidad : valor})}
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
                                        startingValue = {DEFAULT_RATING}
                                        ratingCount={5}
                                        imageSize={35}
                                        style={{ paddingVertical: 10 }}
                                        onFinishRating={(valor) => this.setState({espiritualidad : valor})}
                                    />
                                </View>
                            </View>  
                        </View>
                    </View>
                </View>

                <View style ={ {width: '100%', height: '35%' }}>
                    <View style = {{height: '30%'}}>

                    </View>
                    <View style={{height: '70%', alignItems:'center', justifyContent:'center'}} >
                        <Button
                        onPress = {this.EnviarEvaluacion}
                        icon = {
                            <Icon
                            name= 'send'
                            type= 'Feather'
                            />
                        }iconRight
                        title = "Evaluar   "
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