import { createSlice } from '@reduxjs/toolkit';


const removeFromCart = () => {

}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
    },
    reducers: {
        SliceAddToCart: (state, action) => {
            state.items = action.payload.cart
            state.totalItems = action.payload.count
        },
        addProduct: (state, action) => {
            state.totalItems;
        }
    },
});

export const { SliceAddToCart, addProduct } = cartSlice.actions;
export default cartSlice.reducer;
