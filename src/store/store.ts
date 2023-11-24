import { configureStore } from '@reduxjs/toolkit'
import { coordsSlice } from './features/coords.ts';
import {addressSlice} from './features/address.ts';

export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({
    reducer: {
        coords: coordsSlice.reducer,
        address: addressSlice.reducer
        // other middleware and options can be added here
    }
})
export default store;