import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        shippingAdd: {},
        orderProduct: {},
        ordersData: {}
    },
    reducers: {
        initialOrder: (state, action) => {

        },
        addShippingAddress: (state, action) => {
            state.shippingAdd = action.payload
        },
        orderResponse: (state, action) => {
            state.ordersData = action.payload
        }
    },
});

export const { addShippingAddress, orderResponse } = orderSlice.actions;
export default orderSlice.reducer;
