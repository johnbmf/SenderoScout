import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header,Left,Right,Icon } from 'native-base'
class misiones_pendientes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>misiones_pendientes</Text>
            </View>
        );
    }
}
export default misiones_pendientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});