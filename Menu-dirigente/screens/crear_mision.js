import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { Header,Left,Right,Icon} from 'native-base'
const DimissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class crear_mision extends Component {
    constructor(props){
        super(props);
        this.state = {
            PickerValue : 0,
            nombre_mision : '',
            desc_mision: ''

        }
    }
    static navigationOptions = {
        drawerLabel: 'Crear Misión',
        drawerIcon: ({tintColor}) => (
            <Icon name='today' style = {{fontSize:24,color:tintColor}} />
        )
    }
    crearMision = () =>{
        console.log(this.state);
        if(this.state.PickerValue==0){
            Alert.alert("Error","Es necesario elegir el tipo de misión");
            return;
        }
        else if (!this.state.desc_mision || !this.state.desc_mision.trim()) {
            Alert.alert("Error","Es necesaria una descripción de la misión");
            return;
        } if (!this.state.nombre_mision || this.state.nombre_mision.trim()) {
            Alert.alert("Error","Es necesario un nombre para la misión");
            return;
        } else {
            
            fetch('http://192.168.2.28/crearMision.php',{
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content/Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    tipo_mision:this.state.PickerValue,
                    nombre_mision:this.state.nombre_mision,
                    descripcion_mision:this.state.desc_mision
                })
            })
            .then(response => response.json())
            .then((responseJson) => {
                alert(responseJson);
            })
            .catch((error)=>{
                console.error(error);
            });
        }
            
        }
        render() {
            
            return (
                <DimissKeyboard>
                <View style={styles.container}>
                    <Header style={{height:80,backgroundColor:'#81C14B',font:'Roboto'}}>
                        <Left style = {{flex:1, flexDirection:'row'}}>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                        </Left>
                    </Header >
                    <View style = {styles.top}>
                        <Text style = {styles.header} >C R E A R  M I S I O N</Text>
                    </View>
                <View style= {styles.pickerMenu}>
                    <Picker 
                        style = {{width:'80%', borderColor:'gray', borderWidth:1}}
                        mode = 'dropdown'
                        selectedValue = {this.state.PickerValue}
                        onValueChange ={ (itemValue,itemIndex) => this.setState({PickerValue: itemValue}) }>
                        <Picker.Item label = "Elija un tipo de misión" value = {0} />
                        <Picker.Item label = "Misión Tipo 1" value = {1} />
                        <Picker.Item label = "Mision Tipo 2" value = {2} />
                        <Picker.Item label = "Mision Tipo 3" value = {3} />
                    </Picker>
                </View>
                <View style = {styles.misionInput}>
                    <TextInput 
                        style = {{flex:0,height:40, width:'95%', borderColor: 'gray', borderWidth:1, marginBottom:20, textAlign:'center'}}
                        underlineColorAndroid = "transparent"
                        maxLength = {60}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(valor) => this.setState({nombre_mision : valor})}
                        placeholder = "Nombre de la misión"
                        value={this.state.nombre_mision}
                        />
                </View>
                <View style = {styles.misionDesc}>
                    <TextInput 
                        style = {{height:200, width:'95%', borderColor: 'gray', borderWidth:1, marginBottom:20,textAlign:'center'}}
                        placeholder = "Descripción de la misión"
                        maxLength = {240}
                        //{...this.props}
                        multiline = {true}
                        numberOfLines = {20}
                        onChangeText={(valor) => this.setState({desc_mision : valor})}
                        value={this.state.desc_mision}
                        />
                </View>
                <Button 
                    style = {{flex:0,width:60,height:30}}
                    type = "outline"
                    title = "Crear"
                    backgroundColor = '#104F55'
                    onPress = {this.crearMision}
                    //console.log({tipo_mision:this.state.PickerValue,nombre_mision:this.state.nombre_mision,descripcion:this.state.desc_mision})
                    />
            </View>
        </DimissKeyboard>
        );
    }
}
            
export default crear_mision;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height:'100%'
    },
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header:{
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        padding:20,
        paddingLeft:40,
        paddingRight:40,
    },
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
        color:'white',
        paddingLeft:70, 
        fontSize:28,
        paddingTop:20
    },
    pickerMenu: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingTop:60,
        paddingBottom:30
    },
    misionInput:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:60,
        paddingLeft:25,
        paddingBottom:120

    },
    misionDesc:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:200,
        paddingBottom: 230,
        paddingLeft:25,
        backgroundColor:'white'


    }
});