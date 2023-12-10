import { createSlice } from '@reduxjs/toolkit';

export const latlngSlice = createSlice({
    name: 'coords',
    initialState: {
        lat: 0,
        lng: 0
    },
    reducers: {
        setCoord: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
})

export const { setCoord } = latlngSlice.actions;

export default latlngSlice.reducer;
