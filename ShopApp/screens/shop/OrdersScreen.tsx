import React from "react";
import {View, Text, StyleSheet, FlatList, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders);

    return <FlatList
        data={orders}
        renderItem={(itemData) => {
            return <Text>{itemData.item.totalAmount}</Text>;
        }}
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



};

const styles = StyleSheet.create({});


export default OrdersScreen;