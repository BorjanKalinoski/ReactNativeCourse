import React, {useCallback, useEffect, useReducer, useState} from "react";
import {View, ScrollView, StyleSheet, Platform, Alert, ActivityIndicator, Text, Button} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useDispatch, useSelector} from "react-redux";
import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const FORM_UPDATE = 'UPDATE';
const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            };
            let isFormValid = true;
            for (const key in updatedValidities) {
                isFormValid = isFormValid && updatedValidities[key];
            }

            return {
                isFormValid,
                inputValues: updatedValues,
                inputValidities: updatedValidities
            };
        default:
            return state;
    }
};

const EditProductScreen = props => {
    const [isLoading,setIsLoading]=useState(false);
    const [error, setError] = useState();

    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imgUrl: editedProduct ? editedProduct.imgUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imgUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        isFormValid: editedProduct ? true : false,
    });


    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{
                text: 'Okay'

            }]);
        }
    }, [error]);

    const inputChangeHandler = useCallback((id,  inputValue, isValid) => {
        dispatchFormState({
            type: FORM_UPDATE,
            value: inputValue,
            isValid,
            input: id
        });
    }, [dispatchFormState]);


    const submitHandler = useCallback(async () => {
        if (!formState.isFormValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                {text: 'Okay'}
            ]);
            return;
        }
        const {title, description, imgUrl, price} = formState.inputValues;
        setIsLoading(true);
        setError(null);
        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(productId, title, description, imgUrl));
            } else {
                await dispatch(productsActions.createProduct(title, description, imgUrl, +price));
            }
            props.navigation.goBack();
        }catch (e) {
            setError(e.message);
        }
        setIsLoading(false);

    }, [formState, productId]);


    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>;
    }

    return <ScrollView>
        <View style={styles.form}>
            <Input
                id="title"
                label="title"
                error="Please enter a valid title!"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue={editedProduct ? editedProduct.title : ''}
                isValid={!!editedProduct}
                required
            />
            <Input
                id="imgUrl"
                label="Image URL"
                error="Please enter a valid image url!"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue={editedProduct ? editedProduct.imgUrl : ''}
                isValid={!!editedProduct}
                required
            />
            {editedProduct
                ? null
                : <Input
                    id="price"
                    label="Price"
                    error="Please enter a valid price!"
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                />
            }
            <Input
                id="description"
                label="Description"
                error="Please enter a valid description!"
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={3}
                initialValue={editedProduct ? editedProduct.description : ''}
                isValid={!!editedProduct}
                onInputChange={inputChangeHandler}
                required
                minLength={5}

            />
        </View>
    </ScrollView>;
};



EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn}
            />
        </HeaderButtons>,
    }
};
const styles = StyleSheet.create({
    form: {
        margin: 20,
        flex: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProductScreen;
