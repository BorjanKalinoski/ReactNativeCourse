import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://rn-complete-guide-523a9.firebaseio.com/orders/${userId}.json`);

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
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        try {
            const date = new Date();
            const response = await fetch(`https://rn-complete-guide-523a9.firebaseio.com/orders/${userId}.json?auth=${token}`, {
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
