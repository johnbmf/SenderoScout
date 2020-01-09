import React, { Component } from "react";
import { StyleSheet, Text,} from "react-native";
import { Icon,Body, Right, Card, CardItem, Left} from 'native-base'
import { withNavigation } from 'react-navigation';
import { LinearGradient } from 'expo';
class ActivityCard extends Component{

    constructor(props){
        super(props);
        this.state = {
            expanded: false,
            actividad: props.actividad,
            navegacion: props.navegacion
        }
    }


    render(){
        return(

            <Card style = {{width: '98%',borderWidth:2, borderRadius:10,marginTop:2,borderColor : '#e4ccff', backgroundColor: '#F9F4FF'}}> 
                <CardItem style = {{backgroundColor: '#F9F4FF'}} header bordered button onPress={() => {this.setState({expanded: !this.state.expanded})}}>
                <Left>
                    <Text>{this.props.actividad["Nombre"]}</Text>
                </Left>
                <Right >
                    <Icon
                    type = 'Feather'
                    name = {this.state.expanded?  'chevron-up': 'chevron-down' }
                    //style = {styles.AccordeonIcon}
                    />
                </Right>
                </CardItem>

                {this.state.expanded? 
                <CardItem style = {{backgroundColor: '#F9F4FF'}} bordered>
                    <Body>
                        <Text>{this.props.actividad["Resumen"]}</Text>
                    </Body>
                </CardItem> : null
                }
                
                <CardItem style = {{backgroundColor: '#F9F4FF'}} footer bordered button onPress ={ ()=> {this.props.navegacion.navigate('DetalleActividad', {data : this.props.actividad})}}>
                    <Left>
                        <Text>Ver Detalles</Text>
                    </Left>
                    <Right>
                        <Icon
                        type = 'Feather'
                        name = 'chevron-right'
                        //style = {styles.AccordeonIcon}
                        />
                    </Right>
                </CardItem>
          </Card>

        )
    }

   
}export default ActivityCard;

const styles = StyleSheet.create({

    AccordeonIcon: {
        fontSize: 22,
        alignItems: 'center',   
    }
});
