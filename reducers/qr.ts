import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QrState = {
    value: QrObject[]
}
export type QrObject = {
    _id: string,
    userId: string,
    infos: string[],
    isFav: boolean,
    qrName: string,
    numScans: number
}
const initialState: QrState = {
    value: []
}

export const qrSlice = createSlice({
    name: 'qr',
    initialState,
    reducers: {
        getAllQrs: (state, action: PayloadAction<QrObject[]>) => {
            state.value = action.payload
            console.log(state.value)
        },
        deleteQr: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(e=> e._id !== action.payload)
            console.log('payload----', action.payload)
        },
        addQr: (state, action: PayloadAction<QrObject>)=> {
            state.value.push(action.payload)
        }, 
        changeFav:(state, action: PayloadAction<string>)=>{
            state.value.map((e)=>{
                if (e._id === action.payload){
                    e.isFav = !e.isFav
                } else {
                    e.isFav = false
                }
            } );
            
            
        }
        
     }

    })

export const { getAllQrs, deleteQr, addQr, changeFav } = qrSlice.actions
export default qrSlice.reducer