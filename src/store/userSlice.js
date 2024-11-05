import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        auth: false
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            state.auth = true
        },
    },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
