import {CREATE_PRODUCT, SET_PRODUCTS} from "./products";
import Product from "../../models/Product";
import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-complete-guide-523a9.firebaseio.com/orders/u1.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();


            const orders = [];
            for (const key in resData) {
                orders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            dispatch({
                type: SET_ORDERS,
                orders
            });
        } catch (e) {
            throw e;
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        try {
            const date = new Date();
            const response = await fetch('https://rn-complete-guide-523a9.firebaseio.com/orders/u1.json', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: resData.name,
                    items: cartItems,
                    totalAmount: totalAmount,
                    date
                }
            });
        } catch (err) {

        }
    }
};
