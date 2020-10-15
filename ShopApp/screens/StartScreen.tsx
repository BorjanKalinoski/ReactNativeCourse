import React, {useEffect} from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";
import * as authActions from '../store/actions/auth';

const StartScreen = props => {
    const dispatch = useDispatch();
    // const jsonValue =  AsyncStorage.clear();
    // console.log('start screen!');
    useEffect(() => {
        const tryLogin = async () => {
            const jsonValue = await AsyncStorage.getItem('userData')
            const userData = jsonValue !== null ? JSON.parse(jsonValue) : null;
            console.log('Got user data:',userData);
            if (!userData) { // not logged in
                props.navigation.navigate('Auth');
                return;
            }
            const {token, userId, expirationDate} = userData;

            const newDate = new Date();

            if (expirationDate.getTime() <= newDate.getTime() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
            const expirationTime = expirationDate.getTime() - newDate.getTime();
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };
        tryLogin();
    }, [dispatch]);
    return <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary}/>
    </View>;
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartScreen;
