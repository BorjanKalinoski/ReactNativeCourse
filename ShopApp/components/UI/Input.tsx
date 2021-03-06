import React, {useEffect, useReducer} from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action) => {
    switch (action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }

};
const Input = props => {
    const {label, initialValue, id, isValid, onInputChange} = props;

    // @ts-ignore
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue ? initialValue : '',
        isValid,
        touched: false
    });


    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR
        });
    }

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && (+text < props.min || isNaN(+text))) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid
        });
    };

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [id, inputState, onInputChange]);

    return <View style={styles.formControl}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            {...props}
            style={styles.input}
            onChangeText={textChangeHandler}
            value={inputState.value}
            onBlur={lostFocusHandler}
        />
        {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.error}</Text>
        </View>}
    </View>;
};

const styles = StyleSheet.create({
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
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});


export default Input;
