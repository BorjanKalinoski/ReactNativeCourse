import React from "react";
import {View, Text, Image, StyleSheet,  TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import Card from "../UI/Card";

const ProductItem = props => {
    const {imgUrl, title, price, onAddToCart, onSelect} = props;
    let TouchableCmp: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
            <Card style={styles.product}>
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
                    {props.children}
                </View>
            </Card>
        </TouchableCmp>
    </View>;
};

const styles = StyleSheet.create({
    product: {
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
        height: '18%',
        paddingHorizontal: 20
    }
});

export default ProductItem;
