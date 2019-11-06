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
import SearchBar from "react-native-dynamic-search-bar";
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../CustomComponents/CustomButtons";
import {Alerta} from './../CustomComponents/customalert';
import {Alerta2B} from './../CustomComponents/customalert2B'
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
      checked: false,
      nines_seleccionados: [],
      show_siguiente: false,
      seleccion_seisena: false,
      nombre_seisena:'',
      mostrarnines: []
      
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
    {{this.entregar_seisenas()}}
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
        responseData.data = responseData.data.map(item => {item.isSelect = false;
           return item})
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
        this.buscador("")
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
                    usuarios: this.state.nines_seleccionados,
 
                    id_seisena:this.state.id_seisena,

                    nombre_seisena: this.state.nombre_seisena
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

//Buscador

buscador(texto){
  a=[]
  for (i = 0; i < this.state.data_nines.length; i++) {
    console.log('DSGGFDDGFGDF')
    console.log(texto)
    console.log(this.state.data_nines[i]['nombre'])
    if(this.state.data_nines[i]['nombre'].toLowerCase().startsWith(texto.toLowerCase())){
      console.log(this.state.data_nines[i]['nombre'])
      
      a.push(this.state.data_nines[i])
    }
  }
  console.log(this.state.mostrarnines)
  this.setState({mostrarnines: a, text: texto})
  console.log(this.state.mostrarnines)
}


//Marcar seisena.
seleccionar_seisena(item){
  if(!this.state.seisena_seleccionada){
      this.setState({
          seisena_seleccionada:true,
          boton_cancelar_seisena:'clear',
          data_seisenas: [item],
          id_seisena:item.id_seisena,
          nombre_seisena:item.nombre_seisena
      })
  }
  else{
      {this.entregar_seisenas()}
      this.setState({
          seisena_seleccionada:false,
          boton_cancelar_seisena:null,
          id_seisena:null,
          nombre_seisena: '',
          seleccion_seisena: false,
          show_siguiente:true
      })
  }
}


boton_asignar(){
if(this.state.seisena_seleccionada){
  return(
    <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', marginTop:15}}>
                                <CustomButton
                                    onPress = {()=> this.cambiar_nine_seisena()}
                                    title = "Asignar"
                                    name = 'long-primary-button'
       
                                />
                                </View>)
}
}




// Muestra seisenas disponibles para cambiar nines.
seisenas_disponibles(){
  if(this.state.seleccion_seisena){
      return(
      <View>
      <Text style={{marginLeft:15,fontSize: 16, marginBottom:15}}>Personas seleccionadas:</Text>
      <FlatList
        data = {this.state.nines_seleccionados}
        extraData={this.state.checked}
        renderItem={({ item }) => (
            <ListItem
              //key={item.isSelect}
              containerStyle = { {width: '93%', alignSelf: 'center',borderRadius:10,marginTop:2}}
              title={`${item.nombre}`}
              titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
              leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
              subtitleStyle={{ color: '#104F55' }}
              subtitle={`${item.seisena1}`}
            />
        )}
          keyExtractor={item => item.user}           
        />
      <Text style={{alignSelf: 'flex-start', marginLeft:15,fontSize: 16, marginBottom:15, marginTop:15}}>Seleccione seisena de asignación:</Text>
      <ScrollView>
          <FlatList
          data = {this.state.data_seisenas}
          renderItem={({ item }) => (
              <ListItem
                title={`${item.nombre_seisena}`}
                titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
                 onPress={() => this.seleccionar_seisena(item)}
                 rightIcon={{name : this.state.boton_cancelar_seisena}}
                 Component={TouchableScale}
                friction={90} //
                tension={100} // 
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['#f2e6ff', '#F9F4FF'],
                  start: [1.5, 0],
                  end: [0.1, 0],
                }}
                ViewComponent={LinearGradient}
                containerStyle = {{width: '93%',borderRadius:10,marginTop:2, marginLeft:15}}
              />
            )}
            keyExtractor={item => item.id_seisena}         
          />
          </ScrollView>
      </View>
  );
  }
}






//Muestra boton de avanzar
avanzar_seisena(){
  if(this.state.show_siguiente){
    return(
<View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', marginTop:15}}>
                            <CustomButton
                                onPress = {()=> this.setState({seleccion_seisena:true, show_siguiente:false})}
                                title = "Siguiente"
                                name = 'long-primary-button'
   
                            />
                            </View>)
  }
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


arrayRemove(arr, value) {

  return arr.filter(function(ele){
      return ele != value;
  });

}


se_encuentra(item){
    return new Promise((resolve) => {

      index = this.state.data_nines.findIndex(i => i ==item)
      for (i = 0; i < this.state.nines_seleccionados.length; i++) {
        if(item == this.state.nines_seleccionados[i]){
          //this.state.data_nines[index].isSelect = true;
          resolve([true,index])
        }
      }
      //this.state.data_nines[index].isSelect = false;
      resolve([false,index])
  })  
}


d_marcar(i,flag,item){
  return new Promise((resolve) => {
  if(flag){
      del = this.arrayRemove(this.state.nines_seleccionados, item)
      this.state.data_nines[i].isSelect = false;
      this.setState({
        nines_seleccionados: del,
        checked: !this.state.checked
      })
  }
  resolve(flag)
})  
}

m_marcar(i,flag,item){
  return new Promise((resolve) => {
  if(!flag){
    this.state.data_nines[i].isSelect = true;
    this.state.nines_seleccionados.push(item)
    this.setState({
        nines_seleccionados: this.state.nines_seleccionados,
        checked: !this.state.checked
    })
  }
  resolve(flag)
 })
}

marcar(flag,i,item){
  this.d_marcar(i,flag,item).then(result => {this.m_marcar(i,result,item)})
  }




selectItem(item){
    this.se_encuentra(item).then(result=>{this.marcar(result[0],result[1],item)}).then(this.setState({show_siguiente:true}))
}



se_encuentra_en_busqueda(){
  if(this.state.userToken.unidad1!=0 && !this.state.seleccion_seisena){

    if(this.state.data_nines!=undefined){
      return(
        <FlatList
        data = {this.state.mostrarnines}
        extraData={this.state.checked}
        renderItem={({ item }) => (
            <ListItem
              //key={item.isSelect}
              onPress={() => this.selectItem(item)}
              rightIcon={item.isSelect?{name : 'clear'}:{name:null}}
              containerStyle = { {width: '93%', alignSelf: 'center',borderRadius:10,marginTop:2}}
              title={`${item.nombre}`}
              titleStyle={{ color: '#104F55', fontWeight: 'bold' }}
              Component={TouchableScale}
              friction={90} //
              tension={100} // 
              activeScale={0.95} //
              leftAvatar={{ rounded: true, source: require('../assets/perfil.png') }}
              linearGradientProps={item.isSelect ?{colors: ['#cc99ff', '#d9b3ff'],
              start: [1.5, 0],
              end: [0.1, 0]}:{
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
    else if(this.state.seleccion_seisena){
      return(
        <Text style={{marginLeft:15,fontSize: 16, marginTop:5}}>No se encuentran personas con ese nombre.</Text>
      )
    }

  }
}



//En el caso de tener unidad, muestra buscador.
seleccion_nine(){
  if(this.state.userToken.unidad1 != 0 && !this.state.seleccion_seisena){
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
                  this.buscador(text);
                }}
                value={this.state.text} 
                onPressCancel={() => {
                  this.buscador("");
                }}

                textInputValue={this.state.text}

              />
  <View style={{ flexDirection: 'row'}}>
    </View>
  </View>)
      }
      else{
    return (<View>
    <Text style={{marginLeft:15,fontSize: 16, marginBottom:15}}>Seleccione niño o niña que desea cambiar de unidad:</Text>
    </View>);
    }
  }
  else if(!this.state.seleccion_seisena){
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
        {this.avanzar_seisena()}
        {this.seisenas_disponibles()}    
        {this.boton_asignar()}  
        </ScrollView >
        </View>
        
        <View style={{ flex: 1 }}>
        <ScrollView > 
                
        
        
            
        
        </ScrollView >
        </View>
        
       
      

        </View>
      </SafeAreaView>
      
      </ScrollView>
                    
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