import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'addUser',
    initialState: {
        userData: {
            id: '',
            fcmtoken: '',
        },
    },
    reducers: {
        addUser: (state, action) => {
            state.userData  = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;
export const {addUser} = userSlice.actions;

export const userSelector = (state: any) => state.userReducer.userData;