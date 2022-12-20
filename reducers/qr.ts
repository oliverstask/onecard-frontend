import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QrState = {
    fav: boolean
}
const initialState = {
    fav: false
}

export const qrSlice = createSlice({
    name: 'qr',
    initialState,
    reducers: {
        storeFavInfos: (state, action: PayloadAction<boolean>) => {
            state.fav = action.payload
        },
        
        }

    })

export const { storeFavInfos } = qrSlice.actions
export default qrSlice.reducer