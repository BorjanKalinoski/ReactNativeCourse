import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from '../../models/CartItem';
import {act} from "react-dom/test-utils";

const initialState = {
    items: {}, //id:{title,quantity}
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            let updatedOrNewCartItem;
            if (state.items[addedProduct.id]) { // IF we already have this shit in the cart
                updatedOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity + 1,
                    addedProduct.price,
                    addedProduct.title,
                    state.items[addedProduct.id].sum + addedProduct.price
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, addedProduct.price, addedProduct.title, addedProduct.price);
            }

            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + addedProduct.price
            };

        case REMOVE_FROM_CART:
            const cartItem = state.items[action.pid];
            const qty = cartItem.quantity;
            let updatedCartItems;
            if (qty > 1) {
                const updatedCartItem = new CartItem(
                    cartItem.quantity - 1,
                    cartItem.productPrice,
                    cartItem.productTitle,
                    cartItem.sum - cartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - cartItem.productPrice
            };

        default:
            return state;
    }
};