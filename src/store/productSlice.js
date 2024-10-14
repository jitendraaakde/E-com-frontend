import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        productList: [],
    },
    reducers: {
        initialFetch: (state, action) => {
            state.productList = action.payload;
        },
    },
});

export const { initialFetch } = productSlice.actions;
export default productSlice.reducer;
