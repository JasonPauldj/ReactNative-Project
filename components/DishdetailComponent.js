import React, { Component } from 'react';
import { View, Text, Image, Modal, TextInput, ScrollView,Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite,postComment } from '../redux/ActionCreators';

const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchtoProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <>
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Image source={{ uri: baseUrl + dish.image }} style={{ height: 250, width: 250, resizeMode: 'cover' }} />
                    <Text style={{ margin: 10 }}> {dish.description} </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon raised reverse type='font-awesome' color='#f50' onPress={() => props.favourite ? console.log('Already a fvaourite') : props.onFavoritePress()}
                            name={props.favourite ? 'heart' : 'heart-o'} />
                        <Icon raised reverse type='font-awesome' color='#8B008B' onPress={() => props.onCommentPress()}
                            name={'pencil'} />
                    </View>
                </Card>
            </>
        );
    }

    else
        return (<View><Text></Text></View>);
}

function RenderCommentItem({ item, index }) {
    return (
        <View key={index}>
            <Text>{item.comment}</Text>
            <Text>{item.rating}</Text>
            <Text>{item.author}</Text>
        </View>
    )
}

function RenderComments(props) {
    comments = props.comments;
    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList data={comments} renderItem={RenderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
    )
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name : '',
            comment : '',
            rating:0
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavourite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleComment(dishId)
    {
        var rating = this.state.rating;
        var author = this.state.name;
        var comment = this.state.comment;
        this.props.postComment(dishId,rating,author,comment);
        this.toggleModal();
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favourite={this.props.favorites.some(el => el === dishId)}
                    onFavoritePress={() => this.markFavourite(dishId)}
                    onCommentPress={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comments) => comments.dishId === dishId)} />
                <Modal animationType="slide" visible={this.state.showModal} transparent={false} onRequestClose={()=>this.toggleModal()}>
                    <View>
                        <Rating type="star" showRating={true} startingValue={0} onFinishRating={(value)=> this.setState({rating:value})} ></Rating>
                        <Input onChangeText={(value) => this.setState({
                            name : value
                        })}  label="Enter Name" leftIcon={<Icon type="font-awesome" name="male"></Icon>} ></Input>
                        <Input onChangeText={(value) => this.setState({
                            comment : value
                        })} label="Enter Comment" leftIcon={<Icon type="font-awesome" name="comments"></Icon>}></Input>

                        <Button title="Submit" color="#8B008B"  onPress={()=> this.handleComment(dishId)} />
                        <Button title="Close" color="#808080" onPress={()=> this.toggleModal()} />
                    </View>

                </Modal>
            </ScrollView>


        );
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(DishDetail);