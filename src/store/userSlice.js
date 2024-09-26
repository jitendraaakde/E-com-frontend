import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        loginUser: (state, action) => {
            state = action.payload
        }
    },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
