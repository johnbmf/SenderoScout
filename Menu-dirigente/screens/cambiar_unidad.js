import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    Button,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
import { List, ListItem} from "react-native-elements";
import SearchBar from "react-native-dynamic-search-bar"
class prueba extends Component {
    static navigationOptions = {
        drawerLabel: 'Prueba',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      nombre_n: '', 
    };

    this.arrayholder = [];
  }
  makeRemoteRequest(text) {
    this.setState({ loading: true,
    value:this.state.value});
    fetch('http://www.mitra.cl/SS/get_nombres_unidades.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    nombre_n: text,
 
                    id_unidad:1 //Change this
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        this.setState({
          data: responseData.data,
          message: responseData.message,
          error: null,
          loading: false,
          value: text,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  


  renderHeader = () => {    
  return (      
        <SearchBar 
      placeholder="Ingresa nombre del niño o niña..."        
      onChangeText={text => this.makeRemoteRequest(text)}
      value={this.state.value}  
      onPressCancel={() => {
        this.filterList("");
      }}
      onPress={() => alert("onPress")}         
    />    
  );  
    };

      renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    return(
      <View style={{ flex: 1 }}> 
    <View style={{ flex: 1 }}>
        <FlatList
        ItemSeparatorComponent={this.renderSeparator} 
        ListHeaderComponent={this.renderHeader}  
        data = {this.state.data}
        renderItem={({ item }) => (
            <ListItem
              title={`${item.nombre}`}
              containerStyle={{ borderBottomWidth: 0 }} 
            />
          )}
          keyExtractor={item => item.user}         
        />
        </View>
    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
                    <Button 
                    onPress = {() => { }}
                    icon = {
                        <Icon
                        name= 'send'
                        type= 'FontAwesome'
                        style={{fontSize: 22, color: 'white'}}
                        //color= '#ffffff'
                        />
                    }iconRight
                    title = "Crear   "
                    titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                    buttonStyle = {{backgroundColor: '#104F55',justifyContent:'center'}}
                    />
                    </View>
                    </View>
    );
    }
}
export default prueba;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width:'100%',
        height:'100%'
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
    top:{
        flex:1,
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        flex: 1,
        color: 'black',
        fontSize: 28,
        borderColor: 'black',
        justifyContent:'center', 
        alignItems:'center'
    },
    pickerMenu: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    }
});