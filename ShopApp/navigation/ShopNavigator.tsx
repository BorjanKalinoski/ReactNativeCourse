import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Button, Platform, SafeAreaView, View} from "react-native";
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartScreen from "../screens/StartScreen";
import {useDispatch} from "react-redux";
import * as authActions from '../store/actions/auth';
const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};
const ProductsNavigator = createStackNavigator({
    // @ts-ignore
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (<Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />)

    }
});

const AdminNavigator = createStackNavigator({
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    },
    {
        defaultNavigationOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (<Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />)

        }
    }
);

const OrdersNavigator = createStackNavigator({
        Orders: OrdersScreen
    },
    {
        defaultNavigationOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (<Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />)

        }
    }
);

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return <View style={{flex: 1, paddingTop: 20}}>
            <SafeAreaView>
                <DrawerItems {...props}/>
                <Button title="Logout" color={Colors.primary} onPress={() => {
                    dispatch(authActions.logout());
                }}
                />
            </SafeAreaView>
        </View>;
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen,
},{
    defaultNavigationOptions
});

const MainNavigator = createSwitchNavigator({
    Start: StartScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});




export default createAppContainer(MainNavigator);
