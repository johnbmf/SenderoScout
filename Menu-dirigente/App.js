import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ScrollView,Dimensions,Image, Button } from 'react-native';
import {createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import { Header,Left,Right,Icon} from 'native-base'
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
import DetalleActividadScreen from './screens/detalle_actividad'
import AutenticarScreen from './screens/autenticacion'
import LoginScreen from './screens/login'
import CrearCuentaScreen from './screens/crear_cuenta'
import InvitarDirigenteScreen from './screens/invitar_dirigente'
import CrearUnidadScreen from './screens/crear_unidad'
import CambiarUnidadScreen from './screens/cambiar_unidad'
import UnidadScreen from './screens/unidad'
import CerrarSesionScreen from './screens/cerrar_sesion'
import CambiarPseudonimo from './screens/cambiar_pseudonimo'



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
);
const RecomendacionesStack = createStackNavigator({
  Recomendaciones:RecomendacionesScreen,
  DetalleActividad: DetalleActividadScreen,
  }, {
    navigationOptions : {
        drawerLabel: 'Recomendaciones',
        drawerIcon: ({tintColor}) => (
          <Icon name='list' type = 'Entypo' style = {{fontSize:24, color:tintColor}} />
        ),
        header: null

    }
  },{
    defaultNavigationOptions:{
      header: null
    }
  },
    {
      initialRouteName: 'Recomendaciones'
    }
);
const StackNavigator = createStackNavigator({
  Pendientes: PendientesScreen,
  Evaluacion: EvaluacionScreen,
  }, {
    navigationOptions : {
        drawerLabel: 'Cacerías',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        ),
        header: null

    }
  },{
    defaultNavigationOptions:{
      header: null
    }
  },
    {
      initialRouteName: 'Pendientes'
    }
);
const CrearUnidadStack = createStackNavigator({
  UnidadSwitch: UnidadScreen,
  CrearUnidad : CrearUnidadScreen,
  CambiarUnidad : CambiarUnidadScreen
  },{
    navigationOptions : {
        drawerLabel: 'Gestion unidad',
        drawerIcon: ({tintColor}) => (
            <Icon name='star' style = {{fontSize:24,color:tintColor}} />
        ),
        header: null

    },
    defaultNavigationOptions:{
      header: null
    }},
    {
      initialRouteName: 'Unidad'
    }
  );
const AppDrawerNavigator = createDrawerNavigator({
  Home:HomeScreen,
  MiManada:MiManadaScreen,
  CrearMision:CrearMisionScreen,
  Pendientes: StackNavigator,
  EvalAptitudes: EvalAptitudesScreen,
  Recomendaciones:RecomendacionesStack,
  Estadisticas:EstadisticasScreen,
  AgregarUsuarios:AgregarUsuariosScreen,
  InvitarDirigente : InvitarDirigenteScreen,
  Unidad:CrearUnidadStack,
  CambioPseudos: CambiarPseudonimo,
  Settings:SettingsScreen,
  CerrarSesion:CerrarSesionScreen
  
},{
  contentComponent: CustomDrawerComponent,
  contentOptions:{
    activeTintColor:'orange',
    inactiveTintColor:'black'
  },
  lazy : true,

  //drawerWidth: 200
}
)

const RegisterStack = createStackNavigator({
  Login : LoginScreen,
  CrearCuenta: CrearCuentaScreen
}, {
  defaultNavigationOptions:{
    header: null
  }}
);

const LoginNavigator = createSwitchNavigator({
  Autenticar: AutenticarScreen,
  Logear:RegisterStack,
  Home: AppDrawerNavigator
  }, {
    defaultNavigationOptions:{
      header: null
    }},
    {
      initialRouteName: 'Autenticar'
    }
);

const Apps = createAppContainer(LoginNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
