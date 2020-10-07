import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Platform} from "react-native";
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

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
    defaultNavigationOptions
});

const OrdersNavigator = createStackNavigator({
        Orders: OrdersScreen
    },
    {
        defaultNavigationOptions
    }
);


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);