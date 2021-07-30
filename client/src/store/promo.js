import { createSlice } from '@reduxjs/toolkit'

const initState = {
    promos: []
}

const promoSlice = createSlice({
    name: 'getPromo',
    initialState: initState,
    reducers:{
        getPromoData(state, action){
            const newPromo = action.payload


        }
    }
})

export const promoActions = promoSlice.actions

export default promoSlice