import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'

class evalaptitudes extends Component {
    static navigationOptions = {
        drawerLabel: 'Consejo de la Tarde',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        )
    }
/*
    //data = new Object();

    componentDidMount(){

        fetch('localhost/SS/GetNinosSeisenas.php',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body: JSON.stringify({
                "nombre" : 'nombre',
            })
        }).then((Response) => Response.json())
        .then((responseJson) =>{
            this.data = responseJson;
        }).catch((error) =>{
            console.error(error);
        });
    }

*/
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>consejo de la tarde</Text>
                    
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
        justifyContent: 'center'
    }
});