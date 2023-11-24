import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        name: '',
    },
    reducers: {
        setAddress: (state, action) => {
            state.name = action.payload.name
        }
    }
})

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;