import { configureStore } from '@reduxjs/toolkit'
import coordsReducer from './features/coords.ts';
import addressReducer from './features/address.ts';
import latlngReducer from './features/latlng.ts';
import postReducer from './features/post.ts';

export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({
    reducer: {
        coords: coordsReducer,
        address: addressReducer,
        latlng: latlngReducer,
        post: postReducer,
    }
})
export default store;