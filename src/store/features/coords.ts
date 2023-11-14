import { createSlice } from '@reduxjs/toolkit';

export const coordsSlice = createSlice({
    name: 'coords',
    initialState: {
        nx: 0,
        ny: 0
    },
    reducers: {
        setXY: (state, action) => {
            state.nx = action.payload.nx;
            state.ny = action.payload.ny;
        },
    }
})

export const { setXY } = coordsSlice.actions;

export default coordsSlice.reducer;
