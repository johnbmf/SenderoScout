import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class estadisticas extends Component {
    static navigationOptions = {
        drawerLabel: 'Estadísticas',
        drawerIcon: ({tintColor}) => (
            <Icon name='pie' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>estadisticas</Text>
            </View>
        );
    }
}
export default estadisticas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});