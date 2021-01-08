import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactUs from "./ContactComponent";
import AboutUs from "./AboutComponent";
import Dishdetail from './DishdetailComponent';
import Reservation  from "./ReservationComponent";
import Favorites from "./FavoritesComponent";
import { DISHES } from '../shared/dishes';
import { View, Image, Text } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchDishes,fetchComments,fetchLeaders,fetchPromos} from '../redux/ActionCreators'

const MenuNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStatetoProps = state => {
    return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
}};



const mapDispatchtoProps = dispatch => ({
    fetchDishes : () => dispatch(fetchDishes()),
    fetchComments : () => dispatch(fetchComments()),
    fetchLeaders : () => dispatch(fetchLeaders()),
    fetchPromos : () => dispatch(fetchPromos())
})

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView>
            <View style={{ flexDirection: "row", flex: 3, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={{ height: 80, width: 80 }} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text >Restaurant</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

class MenuNavigation extends Component {
    render() {
        return (

            <MenuNavigator.Navigator >
                <MenuNavigator.Screen name="Menu" component={Menu} />
                <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={(props) => ({
                    headerLeft: () => (<Icon name='menu' color='black' size={24} onPress={() => props.navigation.toggleDrawer()} />)

                })} />
            </MenuNavigator.Navigator>

        )
    }
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    componentDidMount()
    {
        console.log("in component did mount");
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 30 }} >
                {  /* <Menu dishes={this.state.dishes} onPress={(dishId)=>this.onDishSelect(dishId)} /> 
            <DishDetail dish = {this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} />*/}
                <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} drawerContentOptions={{ itemStyle: { backgroundColor: 'white' } }}>
                    <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => (<Icon name='home' type='font-awesome-5' size={24} />) }} />
                    <Drawer.Screen name="Menu" component={MenuNavigation} />
                    <Drawer.Screen name="Contact Us" component={ContactUs} />
                    <Drawer.Screen name="About Us" component={AboutUs} />
                    <Drawer.Screen name="Reservation" component={Reservation} />
                    <Drawer.Screen name="My favorites" component={Favorites} />
                </Drawer.Navigator>


            </View>
        );
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Main);