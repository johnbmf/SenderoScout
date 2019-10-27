import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
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
import { List, ListItem, Button} from "react-native-elements";
import {Alerta2Botones} from './../CustomComponents/customalert copy'
import {Alerta} from './../CustomComponents/customalert'

const { width } = Dimensions.get("window");

class gestionar_seisena extends Component {
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
      cancel:null,
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
      press: true,
      mostrarSearchBar: true,
      cancel1: null,
      estadoAlerta: false,
      tituloAlerta: "Cuidado",
      mensajeAlerta: "Al cambiar de unidad, no podras revertir este cambio.",
      typeAlerta: 'Warning',
      estadoAlerta2Botones: false,
      
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
    {{this.makeRemoteRequest("")}}
    
  };

          
  handleClose = () => {

    this.setState({ SendAlertState: false });
    this.setState({isLoading : false})

}

LoadingState(){
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
    this.setState({ loading: true,text:text});
    if(text==""){ //si es vacio, se esta aprentando cancelar busqueda por lo que vuelve a no mostrar informacion en los otros item.
      this.setState({ show1: false,show2:false});
    }
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
    if(text==""){ //si es vacio, se esta aprentando cancelar busqueda por lo que vuelve a no mostrar el boton cambiar.
      this.setState({show2:false});
    }
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
 
                    grupo_u:this.state.userToken.grupo 
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
          isLoading:false,
          typeAlerta: 'Succsess',
          estadoAlerta: true,
          tituloAlerta : "Éxito",
          mensajeAlerta : "La unidad fue cambiada correctamente"
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
    
    



toggleAlert(){
  this.setState({
      estadoAlerta : !this.state.estadoAlerta
  })
}

toggleAlert2Botones(){
  console.log("DASFGDGFDDGFDGF")
  this.setState({
      estadoAlerta2Botones : !this.state.estadoAlerta2Botones
  })
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
                            <Text numberOfLines={1} style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}>Gestionar Seisena</Text>
                        </Body>
                        <Right></Right>
                    </Header >                    
                </View>
                    <View style={{width: '100%', height: '5%', alignItems:'center'}} > 
                      
                </View>
                <ScrollView >
                <SafeAreaView style={{ flex: 1}}>
                
        
        <View style={styles.container}>
        
        
        
        <View style={{ flex: 1 }}>
        <ScrollView > 
                
        
        
            
        
        </ScrollView >
        </View>
        
       
      

        </View>
      </SafeAreaView>
      
      </ScrollView>
      

            <Alerta2Botones visible = {this.state.estadoAlerta2Botones} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} aceptar = {() => this.makeRemoteRequest3(this.state.usuario,this.state.ide)} rechazar = {() => {this.toggleAlert2Botones()}}
                    />
                    
            <Alerta visible = {this.state.estadoAlerta} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} rechazar = {() => {this.toggleAlert()}}
                    />
                </View>
      
    );
    }
}
export default gestionar_seisena;

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