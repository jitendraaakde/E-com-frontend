import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        productList: [],
        filters: {}
    },
    reducers: {
        initialFetch: (state, action) => {
            state.productList = action.payload;
        },
        getFilterProducts: (state, action) => {
            console.log('filter product called', state, action)
            state.filters = action.payload
        }
    },
});

export const { initialFetch, getFilterProducts } = productSlice.actions;
export default productSlice.reducer;
