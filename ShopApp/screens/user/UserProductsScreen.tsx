import React from "react";
import {Alert, Button, FlatList, Platform, StyleSheet} from "react-native";


import ProductItem from "../../components/shop/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text:'No', style: 'default'},
            {text:'Yes', style: 'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id));

                }}
        ]);
    };
    const dispatch = useDispatch();
    return <FlatList
        keyExtractor={item => item.id}
        data={userProducts}
        renderItem={itemData => <ProductItem
            onSelect={() => {
            }}
            title={itemData.item.title}
            price={itemData.item.price}
            imgUrl={itemData.item.imgUrl}
        >

            <Button color={Colors.primary} title="Edit" onPress={() => {
                editProductHandler(itemData.item.id);
            }}/>
            <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)}/>
        </ProductItem>}
    />;
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {
                navData.navigation.navigate("EditProduct");
            }}/>
        </HeaderButtons>,
    }
};

const styles = StyleSheet.create({

});


export default UserProductsScreen;