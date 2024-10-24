import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'orders',
    initialState: {
        shippingAdd: {},
        orderProduct: {}
    },
    reducers: {
        initialOrder: (state, action) => {

        },
    },
});

export const { editProduct } = adminSlice.actions;
export default adminSlice.reducer;
