export const DELETE_PRODUCT = 'DELETE_PRODCUT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    };
};

export const createProduct = (title, description, imgUrl, price) => {
    return {
        type: CREATE_PRODUCT,
        productData: {
            title,
            description,
            imgUrl,
            price
        }
    };
};

export const updateProduct = (id, title, description, imgUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title,
            description,
            imgUrl
        }
    };
};