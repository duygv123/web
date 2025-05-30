import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './components/GlobalStyle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from 'oidc-react'
import config from './ultils/config'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/store'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider {...config}>
                <Provider store={store}>
                    <GlobalStyle>
                        <ToastContainer className="toastContainer" />
                        <App />
                    </GlobalStyle>
                </Provider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
