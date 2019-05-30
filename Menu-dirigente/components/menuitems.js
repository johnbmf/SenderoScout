import React, { Component } from "react";
import { 
    View,
    Image,
    StyleSheet
} from "react-native";

class MenuItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source = {this.props.itemImage} style = {styles.image}/>
            </View>
        );
    }
}
export default MenuItem;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height : '30%',
        padding : 20,
        borderColor:'black'
    },
    image: {
        width: '100%',
        height: '100%',
        borderColor: 'black',
        resizeMode: 'contain'

    }
});