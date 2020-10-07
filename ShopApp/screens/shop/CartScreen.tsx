import React from "react";

import {Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector,useDispatch} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = props => {
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return <View style={styles.screen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
            <Button
                title="Order Now"
                color={Colors.accent}
                onPress={() => {
                    dispatch(ordersActions.addOrder(cartItems, totalAmount));
                }}
                disabled={!cartItems.length}
            />
        </View>
        <FlatList
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData =>
                <CartItem
                    {...itemData.item}
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }}
                />
            }
        />
    </View>;
};
const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    }
});


export default CartScreen;