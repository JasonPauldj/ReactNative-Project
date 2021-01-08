import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import {connect} from  'react-redux';
import {Loading} from './LoadingComponent';

const mapStatetoProps = state => {
    return {
        dishes : state.dishes
    }
}

class Menu extends Component {
   

    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                />
            )
        }
        if(this.props.dishes.isLoading)
        {
            return(
                <Loading/>
            )
        }
        else if(this.props.dishes.errMess)
        {
            return (
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            )
        }
        else {
        return (
            
            <>
                <FlatList data={this.props.dishes.dishes} renderItem={renderMenuItem} keyExtractor={item => item.id.toString()} />
            </>
        );
        }
    }
}

export default connect(mapStatetoProps)(Menu);