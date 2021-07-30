import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isInitialized: false,
    message: ''   
}

const adminSlice = createSlice({
    name: 'User authentication data',
    initialState: initState,
    reducers: {
        userLogin(state, action) {
            state.message = action.payload

            if(action.payload === 'Login granted') {
                state.isInitialized = true
            } else {
                state.isInitialized = false
            }

        },
        userLogout(state, action) {
            state.isInitialized = false
            state.message = ''
        }
    }
})

export const adminActions = adminSlice.actions

export default adminSlice