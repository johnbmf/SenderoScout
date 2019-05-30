import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class recomendaciones extends Component {
    static navigationOptions = {
        drawerLabel: 'Recomendiaciones',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>recomendaciones</Text>
            </View>
        );
    }
}
export default recomendaciones;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});