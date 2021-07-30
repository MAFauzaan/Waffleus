import { createSlice } from "@reduxjs/toolkit";

const initState = {
    user: {},
    isInitialized: false   
}

const authSlice = createSlice({
    name: 'User authentication data',
    initialState: initState,
    reducers: {
        userLogin(state, action) {
            state.user = action.payload

            if(action.payload === 'No User Exists') {
                state.isInitialized = false
            } else {
                state.isInitialized = true
            }

        },
        userLogout(state, action) {
            state.isInitialized = false
            state.user = null
        }
    }
})

export const authActions = authSlice.actions

export default authSlice