import { createSlice } from '@reduxjs/toolkit'
import { authStorageService } from '@/services/browserStorage'

const initialState = {
    isLogin: authStorageService.loginState.get() || false,
    username: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginState: (state, action) => {
            authStorageService.loginState.set(action.payload)
            return {
                ...state,
                isLogin: action.payload,
            }
        },
    },
})

export default authSlice.reducer
export const { setLoginState } = authSlice.actions
