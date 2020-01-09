import React, { Component } from "react";
import { StyleSheet, Text,} from "react-native";
import { Icon,Body, Right, Card, CardItem, Left} from 'native-base'
import { withNavigation } from 'react-navigation';

class HomeCard extends Component{

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

            <Card>
                <CardItem header bordered button onPress={() => {this.setState({expanded: !this.state.expanded})}}>
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
                <CardItem bordered>
                    <Body>
                        <Text>{this.props.actividad["Resumen"]}</Text>
                    </Body>
                </CardItem> : null
                }
                
                <CardItem footer bordered button onPress ={ ()=> {this.props.navegacion.navigate('DetalleActividad', {data : this.props.actividad})}}>
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

   
}export default HomeCard;

const styles = StyleSheet.create({

    AccordeonIcon: {
        fontSize: 22,
        alignItems: 'center',   
    }
});
