import React from "react";
import {View, Text, StyleSheet, FlatList, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders);

    return <FlatList
        data={orders}
        renderItem={(itemData) => <OrderItem items={itemData.item.items} totalAmount={itemData.item.totalAmount} date={itemData.item.getDate}/>}
    />;
};

OrdersScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Your Orders',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>)
    }


};

const styles = StyleSheet.create({});


export default OrdersScreen;