import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {combineReducers} from "redux"; 
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
   } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartSlice from './cartSlice'
import authSlice from './authSlice'
import promoSlice from './promo'
import adminSlice from './adminSlice'

const reducers = combineReducers({
    cart: cartSlice.reducer,
    user: authSlice.reducer,
    promo: promoSlice.reducer,
    admin: adminSlice.reducer
})

const persistConfig = {
    key: 'root',
    blacklist: ['cart', 'promo'],
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export default store