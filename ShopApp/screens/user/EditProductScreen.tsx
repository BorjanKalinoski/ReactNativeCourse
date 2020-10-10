import React, {useCallback, useEffect, useReducer, useState} from "react";
import {View, Text, TextInput, ScrollView, StyleSheet, Platform, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useDispatch, useSelector} from "react-redux";
import * as productsActions from '../../store/actions/products';

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
    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));



    const [isTitleValid, setIsTitleValid] = useState(false);

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


    const textChangeHandler = (input, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }

        dispatchFormState({
            type: FORM_UPDATE,
            value: text,
            isValid,
            input
        });
    };


    const submitHandler = useCallback(() => {
        if (!formState.isFormValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                {text: 'Okay'}
            ]);
            return;
        }
        const {title, description, imgUrl, price} = formState.inputValues;
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, description, imgUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imgUrl, +price));
        }
        props.navigation.goBack();

    }, [formState, productId, isTitleValid]);


    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    return <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={textChangeHandler.bind(this, 'title')}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    value={formState.inputValues.title}
                />
                {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={textChangeHandler.bind(this, 'imgUrl')}
                    value={formState.inputValues.imgUrl}
                />
            </View>
            {editedProduct
                ? null
                : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        keyboardType="decimal-pad"
                        value={formState.inputValues.price}

                    />
                </View>
            }
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={textChangeHandler.bind(this, 'description')}
                    value={formState.inputValues.description}
                />
            </View>
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

    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});



export default EditProductScreen;
