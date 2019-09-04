import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from "react-native";
import { Header,Left,Right,Icon} from 'native-base'
import { NavigationEvents } from 'react-navigation';
import MenuItem from './../components/menuitems'
class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Inicio',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style = {{fontSize:24,color:tintColor}} />
        )
    }
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []

        }
    }
    componentDidMount(){        
        fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "unidad":1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                //console.log((typeof(responseJson[0].fecha_expiracion)));
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                })
            }else{
                this.setState({
                    isLoading: false,
                    dataSource: []
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    getPendientes(){
        fetch('http://www.mitra.cl/SS/get_misiones_pendientes.php',{
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content/Type': 'application/json',
                
            },
            body:JSON.stringify({
                "unidad":1
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            if(responseJson != null){
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                })
            }else{
                this.setState({
                    isLoading: false,
                    dataSource: []
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    mostrar_mensaje = () => {
        
        if ((this.state.dataSource.length)>0){
            console.log(this.state.dataSource.length);
            return true;
        }else{
            return false;
        }
    }
    fechas = () =>{
        console.log("hola");
        
        date2 = new Date('2019-09-04');
        //date2.setDate(date2 + 2);
        console.log(date2);
        
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header style={{height:80,backgroundColor:'#81C14B',font:'Roboto'}}>
                    <Left style = {{flex:1, flexDirection:'row'}}>
                        <Icon name="menu" style = {{paddingTop:20}} onPress = {()=> this.props.navigation.openDrawer()}/>
                        <Text style= {styles.banner} onPress = {()=> this.props.navigation.openDrawer()}> Sendero Scout</Text>
                    </Left>
                </Header >
                <View style = {styles.menuContainer } >
                    <MenuItem itemImage = {require('./../assets/chart1.png')} />
                    <MenuItem itemImage = {require('./../assets/chart2.png')} />
                    <MenuItem itemImage = {require('./../assets/chart4.png')} />
                    <MenuItem itemImage = {require('./../assets/chart6.png')} />
                </View>
                <View style = {{flexDirection:'row', alignItems:'center', height:60, paddingBottom:50}}>
                    <NavigationEvents onWillFocus={() => this.getPendientes()}/> 
                    <TouchableOpacity
                    onPress = {()=> this.props.navigation.navigate('Pendientes')}
                    style = {{margin:10, flex:1, height:60, backgroundColor: '#104F55', justifyContent:'center'}}>
                        <Text style = {{color: 'white', textAlign:'center', fontSize:18}}>Tienes {this.state.dataSource.length} misiones sin evaluar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'  //'#F4F0BB'
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
    menuContainer : {
        height : '70%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop:20
    },
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
        color:'white',
        paddingLeft:50, 
        fontSize:28,
        paddingTop:20,
        fontFamily:'Roboto'
    }
});
