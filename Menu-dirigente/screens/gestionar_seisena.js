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
import {Alerta} from './../CustomComponents/customalert'
import SearchBar from "react-native-dynamic-search-bar";
import CheckBox from '@react-native-community/checkbox';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo';

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
      cancel:null,
      data_nines: [],
      data_seisenas: [] ,
      error: null,
      nombre_n: '',
      id_seisena: null,
      usuario:'',
      isLoading: true,
      userToken: "",
      mostrarSearchBar: true,
      boton_cancelar_buscador: null,
      boton_cancelar_seisena:null,
      estadoAlerta: false,
      tituloAlerta: "Éxito",
      mensajeAlerta: "Cambio de seisena realizado con éxito",
      typeAlerta: 'Warning',
      filter: 1,
      loading:false,
      checked: true
      
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
    {{this.busqueda(this.state.filter,"")}}
    
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


  busqueda(filtro, text) {
    this.setState({ loading: true,text:text});
    if(text==""){ //si es vacio, se esta aprentando cancelar busqueda por lo que vuelve a no mostrar informacion en los otros item.
      this.setState({ show1: false,show2:false});
    }
    fetch('http://www.mitra.cl/SS/filter_n_seisenas.php',
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
 
                    id_unidad:this.state.userToken.unidad1,

                    filter: filtro
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        this.setState({
          data_nines: responseData.data,
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
  
  entregar_seisenas() {
    this.setState({isLoading: true});
    fetch('http://www.mitra.cl/SS/get_nombres_seisenas.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    id_seisena: null,
 
                    id_unidad:this.state.userToken.unidad1
                })
 
            })
      .then(res => res.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          data_seisenas: responseData.data,
          message2: responseData.message,
          error: null,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

    
  cambiar_nine_seisena() {
    this.setState({ isLoading: true});
    fetch('http://www.mitra.cl/SS/change_n_seisena.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    usuario: this.state.usuario,
 
                    id_seisena:this.state.id_seisena,
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

 
  handleOpen = () => {

    this.setState({ 
        SendAlertState: true,
        isLoading : false 
    }, () => {
        console.log(this.state.SendAlertType);
    });
  }
    


toggleAlert(){
  this.setState({
      estadoAlerta : !this.state.estadoAlerta
  })
}

//Muestra cargando en buscador.
charge(){
  if(this.state.loading){
    return(
    <View><ActivityIndicator size="small" color="#81C14B" /></View>);
  }
  else{
    return(null)
  }
}



se_encuentra_en_busqueda(){

  if(this.state.userToken.unidad1!=0){
    if(this.state.data_nines!=undefined){
      return(
        <FlatList
        data = {this.state.data_nines}

        renderItem={({ item }) => (

            <ListItem
              rightIcon={{name : this.state.cancel1}}
              containerStyle = { {width: '93%', alignSelf: 'center',borderRadius:10,marginTop:2}}
              title={`${item.nombre}`}
              titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
              //onPress={() => this.selectItem(item)}
              Component={TouchableScale}
              friction={90} //
              tension={100} // 
              activeScale={0.95} //
              leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
              linearGradientProps={{
                colors: ['#f2e6ff', '#F9F4FF'],
                start: [1.5, 0],
                end: [0.1, 0],
              }}
              subtitleStyle={{ color: '#104F55' }}
              subtitle={`${item.seisena1}`}
              ViewComponent={LinearGradient}

            />
        )}
          keyExtractor={item => item.user} 
                  
        />
      )
    }
    else{
      return(
        <Text style={{marginLeft:15,fontSize: 16, marginTop:5}}>No se encuentran personas con ese nombre.</Text>
      )
    }
  }
}



//En el caso de tener unidad, muestra buscador.
seleccion_nine(){
  if(this.state.userToken.unidad1 != 0){
    if(this.state.mostrarSearchBar){
      return(
        <View>
        <Text style={{marginLeft:15,fontSize: 16, marginBottom:15}}>Seleccione niño o niña que desea cambiar o asignar a una seisena:</Text>
  <SearchBar 
              onPressToFocus
              autoFocus={false}
              fontColor="#ffffff"
              fontSize={16}
              iconColor="#ffffff"
              shadowColor={null}
              cancelIconComponent={this.charge()}
              cancelIconColor="#ffffff"
              backgroundColor="#8B4BC1"
              placeholder="Ingresa nombre del niño o niña..."
              onChangeText={text => {
                this.busqueda(this.state.filter,text);
              }}
              value={this.state.text} 
              onPressCancel={() => {
                this.busqueda(this.state.filter,"");
              }}

              textInputValue={this.state.text}

            />
<View style={{ flexDirection: 'row'}}>
<CheckBox
    value={this.state.checked}
    onChange={() => this.setState({ checked: !this.state.checked })}
    tintColors={ {true: "#8B4BC1", false: "#8B4BC1" }}
  />
    <Text style={{marginTop: 5}}> Sin seisena</Text>
  <CheckBox
    value={this.state.checked}
    onChange={() => this.setState({ checked: !this.state.checked })}
    tintColors={ {true: "#8B4BC1", false: "#8B4BC1" }}
  />
    <Text style={{marginTop: 5}}> Seisena asignada</Text>
  </View>
</View>)
    }
    else{
  return (<View>
  <Text style={{marginLeft:15,fontSize: 16, marginBottom:15}}>Seleccione niño o niña que desea cambiar de unidad:</Text>
  </View>);
  }
  }
  else{
    return(
      <View>
  <View style = {{flexDirection : 'row', width:'90%', height:'40%', alignItems:'center',alignSelf:'center'}}>
  <Text style ={{color:'#d7576b',fontFamily:'Roboto',fontSize:30, textAlign: 'center',marginTop:15,marginBottom:15}}>No formas parte de una unidad, crea una o unete a la de otro dirigente.</Text>
  </View>
  <View style = {styles.container}>
  <View style = {{ width:'90%', height:'40%', alignItems:'center',alignSelf:'center',marginTop:15}}>
                          <CustomButton
                              onPress = {()=> this.props.navigation.navigate('CrearUnidad')}
                              title = "Crear nueva unidad"
                              name = 'long-secondary-button'
                  
                          />
  
  <CustomButton
                          onPress = {()=> this.props.navigation.navigate('Unidad')}
                          title = "Volver"
                          name = 'long-primary-button'

                      />
  </View>
  </View>
</View>);
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
        {this.seleccion_nine()}
        <View style={{ flex: 1 }}>
        <ScrollView > 
                
        {this.se_encuentra_en_busqueda()}
        
            
        
        </ScrollView >
        </View>
        
        <View style={{ flex: 1 }}>
        <ScrollView > 
                
        
        
            
        
        </ScrollView >
        </View>
        
       
      

        </View>
      </SafeAreaView>
      
      </ScrollView>
      

            <Alerta visible = {this.state.estadoAlerta} type = {this.state.typeAlerta} titulo = {this.state.tituloAlerta} contenido = {this.state.mensajeAlerta} aceptar = {() => this.cambiar_nine_seisena()} rechazar = {() => {this.toggleAlert()}}
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