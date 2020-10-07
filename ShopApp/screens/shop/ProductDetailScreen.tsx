import React from "react";
import {ScrollView, View, Text, Image, Button, StyleSheet} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');

    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    const dispatch = useDispatch();

    return (<ScrollView>
        <Image style={styles.image} source={{uri: product?.imgUrl}}/>
        <View style={styles.buttons}>
            <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                dispatch(cartActions.addToCart(product))
            }}/>
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
    </ScrollView>);
};

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
};
const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'

    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal:20,
        fontFamily: 'open-sans'
    }
});
export default ProductDetailScreen;