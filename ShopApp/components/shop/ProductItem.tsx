import React from "react";
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props => {
    const {imgUrl, title, price, onAddToCart, onViewDetail} = props;

    let TouchableCmp: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return <View style={styles.touchable}>
        <TouchableCmp onPress={onViewDetail} useForeground>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: imgUrl}}
                    />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttons}>
                    <Button color={Colors.primary} title="View Details" onPress={onViewDetail}/>
                    <Button color={Colors.primary} title="To Cart" onPress={onAddToCart}/>
                </View>
            </View>
        </TouchableCmp>
    </View>;

};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
        height: '100%',
        width: '100%'
    },
    touchable: {
        height: 300,
        margin: 20,

    },

    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: "hidden",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20
    }
});


export default ProductItem;