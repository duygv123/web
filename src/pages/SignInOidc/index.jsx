import { useEffect } from 'react'
import { useAuth } from 'oidc-react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoginState } from '@/store/slices/authSlice'
import LoadingAnimation from '@/components/LoadingAnimation'

function SignInOidc() {
    const dispatch = useDispatch()
    const { userData } = useAuth()
    useEffect(() => {
        dispatch(setLoginState(true))
    }, [dispatch])

    useEffect(() => {
        if (userData) {
            sessionStorage.setItem('access_token', userData.access_token)
        }
    }, [userData])

    return userData ? <Navigate to="/" /> : <LoadingAnimation label="Đăng nhập thành công. Chuyển hướng về trang chủ" />
}

export default SignInOidc
