import React, {useCallback, useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, Platform, ActivityIndicator} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from '../../store/actions/orders';
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        await dispatch(ordersActions.fetchOrders());
        setIsLoading(false);
    }, [setIsLoading, dispatch]);


    useEffect(() => {
        fetchOrders();
    }, [dispatch, fetchOrders]);

    useEffect(() => {
        const ordersSub = props.navigation.addListener('willFocus', fetchOrders);

        return () => {
            ordersSub.remove();
        }
    }, [fetchOrders]);


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>;
    }

    return <FlatList
        data={orders}
        renderItem={(itemData) => <OrderItem items={itemData.item.items} totalAmount={itemData.item.totalAmount}
                                             date={itemData.item.getDate}/>}
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default OrdersScreen;
