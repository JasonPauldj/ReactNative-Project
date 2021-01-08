import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite} from '../redux/ActionCreators';


const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchtoProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})


class Favorites extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { navigate } = this.props.navigation;
        const rightButton =[
            {
                text:'Delete',
                type : 'delete',
                onPress : ()=>{
                        Alert.alert(
                            "Delete Favorite",
                            "Are you sure you want to delete the dish " + item.name + " as your favorite?",
                            [
                                {
                                    text : "Cancel",
                                    onPress : ()=>console.log('not deleted')
                                },
                                {
                                    text : "OK",
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            {cancelable:false}
                        )
                
                    
                    
                    }
            }
        ]
        const renderMenuItem = ({ item, index }) => {
            return (
                <Swipeout right={rightButton} autoClose >
                <ListItem bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                <Avatar source={{uri : baseUrl + item.image}} />
                <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
                </Swipeout>
            )
        }

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            )
        }

        else if (this.props.dishes.errMess) {
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
                <FlatList data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some(el => el === dish.id))} renderItem={renderMenuItem} keyExtractor={item => item.id.toString() }/>
            )
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Favorites);