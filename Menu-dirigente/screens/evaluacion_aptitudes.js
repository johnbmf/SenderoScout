import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    FlatList,
    
} from "react-native";
import { Header,Left,Right,Icon ,Body} from 'native-base'

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
            seisena: "",
        };
    }

    updateAptitud = (aptitud) =>{
        this.setState({PickerValue:aptitud})
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
        var seisena = this.state.dataSource[0].seisena1;
        console.log(seisena);
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
                            <Text style = {styles.header} >Evaluacion del día</Text>
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

                    <View syle = {styles.UserRating}>
                            


                    </View>

                </View>
                <View style = {{width: '100%', height: '64%'}}>
                        <Text>consejo de la tarde</Text>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem = {({item}) => <Text>{item.nombre}</Text>}
                            keyExtractor={(item, idex) => idex}
                        />
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
    Picker:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    UserRatingContainer:{
        width: '100%', 
        height: '68%', 
        backgroundColor: 'red'
    },

});