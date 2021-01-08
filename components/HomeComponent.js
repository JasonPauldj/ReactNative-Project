import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

function RenderItem(props) {
    if (props.isLoading) {
        return (
            <Loading />
        )
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    else {
        item = props.item;
        if (item != null) {
            return (
                <Card >
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Card.Image source={{ uri: baseUrl + item.image }} />
                    <View style={{ marginTop: 0, alignItems: "center" }}>
                        {item.designation != null ? <Text>{item.designation}</Text> : <View></View>}

                        <Text
                            style={{ margin: 10 }}>
                            {item.description}</Text>
                    </View>
                </Card>
            )
        }
        else {
            return (<View></View>)
        }
    }
}

class Home extends Component {

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess} />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} isLoading={this.props.promotions.isLoading} errMess={this.props.promotions.errMess} />
            </ScrollView>
        )
    }
}

export default connect(mapStatetoProps)(Home);