import {ADD_ORDER} from "../actions/orders";
import Order from "../../models/Order";

const initalState = {
    orders: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.totalAmount,
                new Date()
            );
            return {
                ...state,
                orders: [...state.orders, newOrder]
            };
    }

    return state;
};