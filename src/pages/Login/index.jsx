import { useEffect } from 'react'
import { useAuth } from 'oidc-react'
import LoadingAnimation from '@/components/LoadingAnimation'

function Login() {
    const { signIn } = useAuth()

    useEffect(() => {
        signIn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <LoadingAnimation label="Thực hiện đăng nhập" />
}

export default Login
