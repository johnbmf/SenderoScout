import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
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
    UIManager,
    Image,
    AsyncStorage
} from "react-native";
import { Header,Left,Right,Icon,Body } from 'native-base'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert'
import { NavigationEvents } from 'react-navigation';
import { List, ListItem, Button} from "react-native-elements";
import GradientCard from "react-native-gradient-card-view";
import SearchBar from "react-native-dynamic-search-bar";
import { CustomLayoutSpring } from "react-native-animation-layout";
import { LinearGradient } from 'expo';
import TouchableScale from 'react-native-touchable-scale';


const { width } = Dimensions.get("window");

class cambiar_unidad extends Component {
    static navigationOptions = {
        drawerLabel: 'Cambiar Unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='person-add' style = {{fontSize:24,color:tintColor}} />
        )
    }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading2:false,
      data: [],
      data2: [] ,
      error: null,
      nombre_n: '',
      ide: null,
      usuario:'',
      refreshing: false,
      isLoading: true,
      page: 1,
      show1: false,
      show2: false,
      userToken: "",
      SendAlertType: 1,
      SendAlertMessage: "",
      
    };
    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }

    this.arrayholder = [];
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    this.setState({
        userToken : JSON.parse(Token),
    });
    
  };

          
  handleClose = () => {

    this.setState({ SendAlertState: false });
    this.setState({isLoading : false})

}
  ShowSendAlert(){
    console.log('lalalalalalalalsadsadas')
console.log(this.state.SendAlertType)
    if (this.state.SendAlertType == 0){
        return(
        <ActivityIndicator
            animating = {this.state.SendAlertState}
            size="large" 
            color="#00ff00" 
        />);
    }
    else if(this.state.SendAlertType == 1){
        return(
            <SCLAlert
            theme="success"
            show={this.state.SendAlertState}
            title="Felicidades"
            subtitle= {this.state.SendAlertMessage}
            onRequestClose = {this.handleClose}
            >
            <SCLAlertButton theme="success" onPress={() => {this.handleClose(); this.props.navigation.goBack()}}>Aceptar</SCLAlertButton>
            </SCLAlert>
        );
    }
    else if(this.state.SendAlertType == -1){
        return(
            <SCLAlert
            theme="danger"
            show={this.state.SendAlertState}
            title="Ooops"
            subtitle= {this.state.SendAlertMessage}
            onRequestClose = {this.handleClose}
            >
            <SCLAlertButton theme="danger" onPress={this.handleClose}>Aceptar</SCLAlertButton>
            </SCLAlert>
        );
    }
    else{
        return(
            <SCLAlert
            theme="warning"
            show={this.state.SendAlertState}
            title="Estoy Confundido"
            subtitle= {this.state.SendAlertMessage}
            onRequestClose = {this.handleClose}
            >
            <SCLAlertButton theme="warning" onPress={this.handleClose}>Aceptar</SCLAlertButton>
            </SCLAlert>
        );
    }

}

LoadingState(){
  console.log(this.state.isLoading)
  if(this.state.isLoading){
      return(

          <Modal

              transparent = {true}
              visible = {this.state.isLoading}
              animationType = 'none'
              onRequestClose = {()=>{console.log("Closing Modal")}}
          > 
              <View style = {{position:'absolute', top:0,left:0,right:0,bottom:0, alignContent: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <ActivityIndicator
                  animating = {this.state.isLoading}
                  size="large" 
                  color="#00ff00" 
                  />    
              </View> 
          </Modal>
      );   
  }
}


  makeRemoteRequest(text) {
    this.setState({ loading: true,
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
 
                    id_unidad:this.state.userToken.unidad1 
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
    this.setState({ loading2: true,
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
 
                    id_unidad:this.state.userToken.unidad1 //Change this
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          data2: responseData.data,
          message2: responseData.message,
          error: null,
          loading2: false,
          value2: text,
          show1:true
        });
      })
      .catch(error => {
        this.setState({ error, loading2: false });
      });
  };

    
  makeRemoteRequest3(user,idU) {
    this.setState({ isLoading: true});
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
          data3: responseData.data,
          SendAlertMessage: responseData.message,
          error: null,
          isLoading:false
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
      this.handleOpen();
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
 
  handleOpen = () => {
console.log('HOLAAAAAAAAAAAAAAAAASDAFSDFDFDS')
    this.setState({ 
        SendAlertState: true,
        isLoading : false 
    }, () => {
        console.log(this.state.SendAlertType);
    });
  }
 
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
        console.log('holi2')
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
          usuario:usu,
          data: []
        });
        this.makeRemoteRequest2(this.text2)
        // this.fetchData();
      };

                
      selectItem2(Ite,ide) {
        this.setState({
          value2:Ite,
          text2:Ite,
          ide:ide,
          data2: []
        });
        // this.fetchData();
        this.setState({
        show2:true
        });
      };

show1() {
    if (this.state.show1) {
      return (
        <View style={{ flex: 1 }}>
        <Text>Seleccione unidad a la que se cambiará {this.state.value}:</Text>
          <SearchBar 
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            cancelIconComponent={this.charge2()}
            iconColor="#c6c6c6"
            shadowColor="#002642"
            cancelIconColor="#c6c6c6"
            backgroundColor="#104F55"
            placeholder="Ingresa nombre de la unidad..."
            onChangeText={text2 => {
              this.makeRemoteRequest2(text2);
            }}
            value2={this.state.value2} 
            onPressCancel={() => {
              this.makeRemoteRequest2("");
            }}
            onPress={() => alert("onPress")}
            textInputValue={this.state.text2}
          />
<ScrollView>
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
        </ScrollView>
        </View>

      );
  } else {
      return null;
  }
}


show2() {
  
  if(this.state.show2){
    return(
                    <View style={{width: '100%', height: '8%',alignItems:'center', justifyContent:'center'}} >
                    <Button 
                    onPress = {() => {this.makeRemoteRequest3(this.state.usuario,this.state.ide)}}
                    icon = {
                        <Icon
                        name= 'send'
                        type= 'FontAwesome'
                        style={{fontSize: 22, color: 'white'}}
                        //color= '#ffffff'
                        />
                    }iconRight
                    title = "Cambiar"
                    titleStyle = {{fontFamily: 'Roboto', fontSize: 22}}
                    buttonStyle = {{backgroundColor: '#104F55',justifyContent:'center'}}
                    />
                    </View>);

  }
  else{
return null;
  }
}
//Mostrar simbolo de carga en la lista de nines
charge(){
  if(this.state.loading){
    return(
    <View><ActivityIndicator size="small" color="#81C14B" /></View>);
  }
  else{
    return(null)
  }
}
//Mostrar simbolo de carga en la lista de unidades
charge2(){
  if(this.state.loading2){
    return(
    <View><ActivityIndicator size="small" color="#81C14B" /></View>);
  }
  else{
    return(null)
  }
}


  render() {
    return(
                <View style = {styles.container}>
                <View style={{width: '100%', height: '12%', alignItems:'center'}} >     
                    <Header style={{width: '100%', height: '100%',backgroundColor: '#81C14B',font:'Roboto'}}>
                        <Left>
                            <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        </Left>
                        <Body style = {{position:'absolute', justifyContent:'center',alignContent: 'flex-start', alignItems: 'flex-start', flexWrap:'nowrap'}}> 
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Cambiar Unidad</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                    <View style={{width: '100%', height: '5%', alignItems:'center'}} > 
                      
                </View>
                <SafeAreaView style={{ flex: 1}}>
        
        <Text>Seleccione niño o niña que desea cambiar de unidad:</Text>
        <View style={styles.container}>
        
          <SearchBar 
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#002642"
            cancelIconComponent={this.charge()}
            cancelIconColor="#c6c6c6"
            backgroundColor="#104F55"
            placeholder="Ingresa nombre del niño o niña..."
            onChangeText={text => {
              this.makeRemoteRequest(text);
            }}
            value={this.state.text} 
            onPressCancel={() => {
              this.makeRemoteRequest('');
            }}
            onPress={() => alert("onPress")}
            textInputValue={this.state.text}

          />
          
        <View style={{ flex: 1 }}>
        <ScrollView > 
                
        <FlatList
        data = {this.state.data}

        renderItem={({ item }) => (

            <ListItem

              containerStyle = { {width: '93%', alignSelf: 'center',borderRadius:10,marginTop:2,shadowColor: '#000',shadowRadius:4}}
              title={`${item.nombre}`}
              titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
               onPress={() => this.selectItem(item.nombre,item.user)}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
               leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
               linearGradientProps={{
                colors: ['#ADCFD3', '#BAD3D6'],
                start: [1.5, 0],
                end: [0.1, 0],
              }}
              subtitleStyle={{ color: '#104F55' }}
              subtitle={`${item.pseudonimo}`}
               ViewComponent={LinearGradient}

            />
        )}
          keyExtractor={item => item.user} 
                  
        />
        
            
        
        </ScrollView >
        </View>
        
        <View style={styles.container}>{this.show1()}</View>
      
       <View style={styles.container}>{this.show2()}</View>
       <View>
            {this.ShowSendAlert()}
        </View>
        </View>
      </SafeAreaView>
                </View>
      
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
    },
});