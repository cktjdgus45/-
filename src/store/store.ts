import { configureStore } from '@reduxjs/toolkit'
import { coordsSlice } from './features/coords.ts';
import { addressSlice } from './features/address.ts';
import { latlngSlice } from './features/latlng.ts';

export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({
    reducer: {
        coords: coordsSlice.reducer,
        address: addressSlice.reducer,
        latlng: latlngSlice.reducer,
        // other middleware and options can be added here
    }
})
export default store;