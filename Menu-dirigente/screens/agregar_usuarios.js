import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class agregar_usuarios extends Component {
    static navigationOptions = {
        drawerLabel: 'Agregar Usuarios',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>agregar_usuarios</Text>
            </View>
        );
    }
}
export default agregar_usuarios;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});