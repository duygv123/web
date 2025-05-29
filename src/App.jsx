import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// Layout và Pages
import Layout from './pages/Layout/Layout'
import ConnnectPageDetail from './pages/ConnnectPageDetail/ConnnectPageDetail'
import MainPage from './pages/MainPage/MainPage'
import NodeDetailPage from './pages/NodeDetailPage/NodeDetailPage'
import DeviceDetailPage from './pages/DeviceDetailPage/DeviceDetailPage'
import TagDetailPage from './pages/TagDetailPage/TagDetailPage'
import Login from './pages/Login'
import SignInOidc from './pages/SignInOidc'

// Dashboard pages
import DashboardUnitNode from '@/pages/DashboardUnitNode/DashboardUnitNode'
import DashboardUnit from '@/pages/DashboardUnit/DashboardUnit'
import DashboardHome from '@/pages/DashboardHome/DashboardHome' // <-- thêm dòng này


function App() {
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.auth.isLogin)

    // (Tùy chọn) Điều hướng về login nếu chưa đăng nhập
    // useEffect(() => {
    //     if (!isLogin) {
    //         navigate('/login')
    //     }
    // }, [navigate, isLogin])

    return (
        <Routes>
            {/* Trang không dùng Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signin-oidc" element={<SignInOidc />} />

            {/* Các trang có giao diện chính */}
            <Route
                path="/"
                element={
                    <Layout>
                        <MainPage />
                    </Layout>
                }
            />
            <Route
                path="/connect"
                element={
                    <Layout>
                        <ConnnectPageDetail />
                    </Layout>
                }
            />
            <Route
                path="/nodes/:eonNodeId"
                element={
                    <Layout>
                        <NodeDetailPage />
                    </Layout>
                }
            />
            <Route
                path="/nodes/:eonNodeId/devices/:deviceId"
                element={
                    <Layout>
                        <DeviceDetailPage />
                    </Layout>
                }
            />
            <Route
                path="/nodes/:eonNodeId/devices/:deviceId/tags/:tagId"
                element={
                    <Layout>
                        <TagDetailPage />
                    </Layout>
                }
            />

            {/* Dashboard: Hiển thị danh sách node và chi tiết node */}
            <Route
                path="/dashboard"
                element={
                <Layout>
                    <DashboardHome />
                </Layout>
            }
/>
            <Route
                path="/dashboard/:eonNodeId"
                 element={
             <Layout>
                <DashboardUnit />
            </Layout>
        }       
/>
            {/* Mặc định chuyển về trang chính */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default App
