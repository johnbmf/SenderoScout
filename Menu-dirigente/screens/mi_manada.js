import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class mi_manada extends Component {
    static navigationOptions = {
        drawerLabel: 'Mi Manada',
        drawerIcon: ({tintColor}) => (
            <Icon name='paw' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>mi_manada</Text>
            </View>
        );
    }
}
export default mi_manada;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});