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

 
    renderItem(item) {
        return (
          <GradientCard
            title={item.name}
            shadowStyle={{
              ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 3,
                    height: 3
                  },
                  shadowRadius: 3,
                  shadowOpacity: 0.4
                },
                android: {
                  elevation: 3
                }
              })
            }}
            imageSource={item.edad}
            subtitle={item.user}
            width={width * 0.9}
            style={{
              width: width,
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center"
            }}
            centerSubtitleStyle={{
              fontSize: 12,
              marginLeft: 8,
              textAlign: "center",
              color: item.strokeColor
            }}
            rightComponent={
              <View>

              </View>
            }
          />
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

  render() {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#21283d" }}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.container}>
          <SearchBar 
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#282828"
            cancelIconColor="#c6c6c6"
            backgroundColor="#353d5e"
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
          <View style={{ top: 12 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => this.renderItem(item)}
              onEndReached={this.loadMore}
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              keyExtractor={item => item.user}  
            />
          </View>
        </View>
      </SafeAreaView>
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