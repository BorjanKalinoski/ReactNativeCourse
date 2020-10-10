import PRODUCTS from "../../data/dummy-data";
import {CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from "../actions/products";
import Product from "../../models/Product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(new Date().toString(), 'u1', action.productData.title, action.productData.imgUrl,
                action.productData.description,
                action.productData.price);
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct],
            }
        case UPDATE_PRODUCT:
            const userIndex = state.userProducts.findIndex(product => product.id === action.pid);
            const updatedProduct = new Product(action.pid, state.userProducts[userIndex].ownerId, action.productData.title, action.productData.img, action.productData.desc, state.userProducts[userIndex].price);
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[userIndex] = updatedProduct;

            const availIndex = state.availableProducts.findIndex(product => product.id === action.pid);
            const updatedAvailProducts = [...state.availableProducts];
            updatedAvailProducts[availIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailProducts,
                userProducts: updatedUserProducts

            };

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            };
    }
    return state;
};