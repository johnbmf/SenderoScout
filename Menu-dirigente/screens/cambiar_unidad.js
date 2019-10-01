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
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    Platform,
    UIManager
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
import { List, ListItem} from "react-native-elements";
import GradientCard from "react-native-gradient-card-view";
import SearchBar from "react-native-dynamic-search-bar";
import { CustomLayoutSpring } from "react-native-animation-layout";
import { LinearGradient } from 'expo';


const { width } = Dimensions.get("window");

class cambiar_unidad extends Component {
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
      data2: [] ,
      error: null,
      nombre_n: '',
      ide: null,
      usuario:'',
      refreshing: false,
      isLoading: true,
      page: 1 
    };
    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }

    this.arrayholder = [];
  }
  makeRemoteRequest(text) {
    this.setState({ loading: true,
    value:this.state.value,
    text:text});
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
        console.log(responseData)
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
  
  makeRemoteRequest2(text) {
    this.setState({ loading: true,
    value2:this.state.value2,
    text2:text});
    fetch('http://www.mitra.cl/SS/get_nombres_unidades2.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    nombre_u: text,
 
                    id_unidad:1 //Change this
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          data2: responseData.data,
          message2: responseData.message,
          error: null,
          loading: false,
          value2: text,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

    
  makeRemoteRequest3(user,idU) {
    this.setState({ loading: true});
    fetch('http://www.mitra.cl/SS/change_n_unidad.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    usuario: user,
 
                    id_unidad:idU,
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          data2: responseData.data,
          message2: responseData.message,
          error: null,
          loading: false,
          value2: text,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
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

 

 
    renderItem(item) {
        return (
        <View style={{ flex: 1 }}>
        <FlatList
        ItemSeparatorComponent={this.renderSeparator}
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
        );
      }
    
      onRefresh = () => {
        this.setState({
          dataSource: [],
          isLoading: false,
          refreshing: true,
          seed: 1,
          page: 1
        });
        // this.fetchData();
      };
    
      loadMore = () => {
        this.setState({
          // refreshing: true,
          page: this.state.page + 1
        });
        // this.fetchData();
      };

          
      selectItem(Ite, usu) {
        this.setState({
          value:Ite,
          text:Ite,
          usuario:usu
        });
        this.makeRemoteRequest2(this.text2)
        // this.fetchData();
      };

                
      selectItem2(Ite,ide) {
        this.setState({
          value2:Ite,
          text2:Ite,
          ide:ide
        });
        this.makeRemoteRequest3(this.usuario,this.ide)
        // this.fetchData();
      };

  render() {
    return(

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                    <View style={{width: '100%', height: '12%', alignItems:'center'}} > 
                        
                        <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                            <Left>
                                <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                            </Left>
                            <Body style = {{justifyContent:'center'}}> 
                                <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Cambiar Unidad</Text>
                            </Body>
                        </Header > 
                    </View>

        <SafeAreaView style={{ flex: 1}}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.container}>
          <SearchBar 
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#002642"
            cancelIconColor="#c6c6c6"
            backgroundColor="#104F55"
            placeholder="Ingresa nombre del niño o niña..."
            onChangeText={text => {
              this.makeRemoteRequest(text);
            }}
            value={this.state.value} 
            onPressCancel={() => {
              this.makeRemoteRequest("");
            }}
            onPress={() => alert("onPress")}
          />
        <View style={{ flex: 1 }}>
        <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data = {this.state.data}
        renderItem={({ item }) => (
            <ListItem
              title={`${item.nombre}`}
              containerStyle={{ borderBottomWidth: 0 }} 
               onPress={() => this.selectItem(item.nombre,item.user)}
            />
          )}
          keyExtractor={item => item.user}         
        />
        </View>
        </View>
        <View style={styles.container}>
        <Text>Seleccione unidad a la que se cambiará {this.state.value}:</Text>
          <SearchBar 
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#002642"
            cancelIconColor="#c6c6c6"
            backgroundColor="#104F55"
            placeholder="Ingresa nombre de la unidad..."
            onChangeText={text2 => {
              this.makeRemoteRequest(text2);
            }}
            value2={this.state.value2} 
            onPressCancel={() => {
              this.makeRemoteRequest("");
            }}
            onPress={() => alert("onPress")}
          />
        <View style={{ flex: 1 }}>
        <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data = {this.state.data2}
        renderItem={({ item }) => (
            <ListItem
              title={`${item.nombre_unidad}`}
              containerStyle={{ borderBottomWidth: 0 }} 
               onPress={() => this.selectItem2(item.nombre_unidad,item.id)}
            />
          )}
          keyExtractor={item => item.id}         
        />
        </View>

        
        </View>
        
      </SafeAreaView>
      </View>
                </ScrollView>
    );
    }
}
export default cambiar_unidad;

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