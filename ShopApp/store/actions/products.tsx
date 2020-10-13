import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODCUT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const fetchProducts = () => {
    return async dispatch => {
        // execute any async code you want!

        try {
            const response = await fetch('https://rn-complete-guide-523a9.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();


            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imgUrl,
                    resData[key].description,
                    resData[key].price,
                ))
            }
            dispatch({
                type: SET_PRODUCTS,
                products:loadedProducts
            });
        } catch (e) {
            throw e;
        }
    };
};
export const deleteProduct = productId => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-complete-guide-523a9.firebaseio.com/products/${productId}.json`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }


            dispatch({
                type: DELETE_PRODUCT,
                pid: productId
            });

        } catch (e) {
            throw e;
        }

    };
};

export const createProduct = (title, description, imgUrl, price) => {
    return async dispatch => {
        // execute any async code you want!
        try {
            const response = await fetch('https://rn-complete-guide-523a9.firebaseio.com/products.json', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl,
                    price
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name, //server-side generated id
                    title,
                    description,
                    imgUrl,
                    price
                }
            });
        } catch (err) {

        }

    };
};


export const updateProduct = (id, title, description, imgUrl) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-complete-guide-523a9.firebaseio.com/products/${id}.json`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: {
                    title,
                    description,
                    imgUrl
                }
            });

        } catch (e) {
            throw e;
        }

    };


};
