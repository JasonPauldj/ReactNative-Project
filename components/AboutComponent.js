import React from "react";
import { View, Text, FlatList } from "react-native";
import { Card, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent'

const mapStatetoProps = state => {
    return {
        leaders: state.leaders
    }
}


function renderItem(props) {
    return (
        <View>
            <ListItem key={props.item.id} bottomDivider>
                <Avatar source={{ uri: baseUrl + props.item.image }} rounded size='medium' />
                <ListItem.Content>
                    <ListItem.Title>
                        {props.item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {props.item.description}
                    </ListItem.Subtitle>
                </ListItem.Content>

            </ListItem>
        </View>
    )
}


function AboutUs(props) {
    if (props.leaders.isLoading) {
        return (<ScrollView>
            <Card>  <Card.Title>
                Corporate Leadership
            </Card.Title><Loading /></Card></ScrollView>)
    }
    else if (props.leaders.errMess)
    {
        <ScrollView>
            <Card><Card.Title>
                Corporate Leadership
            </Card.Title><Text>{props.leaders.errMess}</Text></Card></ScrollView>
    }
    else {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>
                        Our History
            </Card.Title>
                    <View>
                        <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                </Text>
                        <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
                    </View>
                </Card>
                <Card>
                    <Card.Title>
                        Corporate Leadership
            </Card.Title>
                    <Card.Divider>
                    </Card.Divider>
                    <View>
                        <FlatList data={props.leaders.leaders} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
                    </View>
                </Card>
            </ScrollView>
        )
    }
}

export default connect(mapStatetoProps)(AboutUs);