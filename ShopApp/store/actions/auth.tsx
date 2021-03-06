import AsyncStorage from '@react-native-community/async-storage';
import {LogBox} from "react-native";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const authenticate = (userId, token, expiryTimeMs) => {
    return dispatch => {
        dispatch(setLogoutTimer(+expiryTimeMs));
        dispatch({type: AUTHENTICATE, userId, token});

    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBIutypnYrDpPbDtDWZyhsyybIWTaVjUg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid';
            }
            throw new Error(message);
        }
        const resData = await response.json();

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        storeData(resData.idToken, resData.localId, expDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBIutypnYrDpPbDtDWZyhsyybIWTaVjUg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid';
            }
            throw new Error(message);
        }
        const resData = await response.json();

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        storeData(resData.idToken, resData.localId, expDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT}
};


const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};


const setLogoutTimer = expirationTimeMs => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTimeMs);
    }
};


const storeData = async (token, userId, expirationDate) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify({
            token,
            userId,
            expirationDate: expirationDate
        }));
    } catch (e) {
        console.log('should not happen');
        console.log(e)
    }
};

