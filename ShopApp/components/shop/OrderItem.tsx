import React, {useState} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    const {totalAmount, date, items} = props;

    return <Card style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetails ? 'Hide Details' : "Show Details"} onPress={() => {
            setShowDetails(prevState => !prevState);
        }}/>
        {showDetails && <View style={styles.detailItems}>
            {items.map(cartItem => <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    sum={cartItem.sum}
                    productTitle={cartItem.productTitle}
                />
            )}
        </View>}
    </Card>;
};


const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;