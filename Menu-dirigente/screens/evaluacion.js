import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class evaluacion extends Component {
    static navigationOptions = {
        drawerLabel: 'Evaluación',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>evaluacion</Text>
            </View>
        );
    }
}
export default evaluacion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});