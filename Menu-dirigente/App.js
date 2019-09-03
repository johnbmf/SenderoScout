import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ScrollView,Dimensions,Image } from 'react-native';
import {createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import EvaluacionScreen from './screens/evaluacion'
import CrearMisionScreen from './screens/crear_mision'
import RecomendacionesScreen from './screens/recomendiaciones'
import EstadisticasScreen from './screens/estadisticas'
import AgregarUsuariosScreen from './screens/agregar_usuarios'
import MiManadaScreen from './screens/mi_manada'
import PendientesScreen from './screens/misiones_pendietes'
import EvalAptitudesScreen from './screens/evaluacion_aptitudes'

//const {width} = Dimensions.get('window')
export default class App extends React.Component {
  render() {
    return (
      <Apps/>
    );
  }
}
const CustomDrawerComponent = (props)=>(
  
  <SafeAreaView style = {{flex : 1}}>
    <View style = {{height:150,backgroundColor:'#81C14B',font:'Roboto', alignItems:'flex-start',justifyContent:'flex-start'}}>
      <Image source = {require('./assets/perfil.png')} style={{height:120, width:120, borderRadius:60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)
const StackNavigator = createStackNavigator({
  Home: HomeScreen,
  Pendientes: PendientesScreen,
  Evaluacion: EvaluacionScreen
  }, {
    defaultNavigationOptions:{
      header: null
    }
  }
); 
const AppDrawerNavigator = createDrawerNavigator({
  Home:StackNavigator,
  MiManada:MiManadaScreen,
  CrearMision:CrearMisionScreen,
  Pendientes: PendientesScreen,
  Evaluacion: EvaluacionScreen,
  EvalAptitudes: EvalAptitudesScreen,
  Recomendaciones:RecomendacionesScreen,
  Estadisticas:EstadisticasScreen,
  AgregarUsuarios:AgregarUsuariosScreen,
  Settings:SettingsScreen,
},{
  contentComponent: CustomDrawerComponent,
  contentOptions:{
    activeTintColor:'orange',
    inactiveTintColor:'black'
  }
  //drawerWidth: 200
}
)
const Apps = createAppContainer(AppDrawerNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
