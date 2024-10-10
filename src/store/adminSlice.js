import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {},
    reducers: {
        editProduct: (state, action) => {
            state = action.payload;
        },
    },
});

export const { editProduct } = adminSlice.actions;
export default adminSlice.reducer;
