import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            console.log("state and action", state.user, action)
        },
    },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
