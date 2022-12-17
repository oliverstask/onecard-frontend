import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
    value: AuthTokens
}
export type AuthTokens = {
    token: string,
    userId: string
}
const initialState: AuthState = {
    value: {
        token: '',
        userId: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeUserAuthInfos: (state, action: PayloadAction<AuthTokens>) => {
            state.value = action.payload
        },
        logout : (state) => {
            state.value = {
                token: '',
                userId: ''
            }
        }

    }
})

export const { storeUserAuthInfos, logout } = authSlice.actions
export default authSlice.reducer