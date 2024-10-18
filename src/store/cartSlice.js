import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        alreadyInCart: false
    },
    reducers: {
        SliceAddToCart: (state, action) => {
            state.items = action.payload.items
            state.totalItems = action.payload.totalItems
        },
        checkAlreadyInCart: (state, action) => {
            state.alreadyInCart = state.items.some((item) => item.productId === action.payload._id);
        },
    },
});

export const { SliceAddToCart, removeFromCart, checkAlreadyInCart } = cartSlice.actions;
export default cartSlice.reducer;
