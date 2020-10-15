import React, {useCallback, useEffect, useReducer, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from "react-redux";
import * as authActions from '../../store/actions/auth';

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


const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        isFormValid: false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{text: 'Okay'}])
        }
    }, [error]);

    const dispatch = useDispatch();
    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (e) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback((id,  inputValue, isValid) => {
        dispatchFormState({
            type: FORM_UPDATE,
            value: inputValue,
            isValid,
            input: id
        });
    }, [dispatchFormState]);

    return <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
        style={styles.screen}
    >
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize="none"
                        error='Please enter a valid email address'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={5}

                        autoCapitalize="none"
                        error='Please enter a valid password'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading
                            ? <ActivityIndicator size='small' color={Colors.primary}/>
                            : <Button
                                title={isSignUp ? 'Sign Up' : 'Login'}
                                color={Colors.primary}
                                onPress={authHandler}
                            />
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} color={Colors.accent}
                                onPress={() => {
                                    setIsSignUp(prevState => !prevState);
                                }}
                        />
                    </View>
                </ScrollView>
            </Card>
        </LinearGradient>
    </KeyboardAvoidingView>;
};

AuthScreen.navigationOptions={
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 10
    }
});


export default AuthScreen;
