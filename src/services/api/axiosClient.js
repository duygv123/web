import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://magicmirroriotserverapi20250225204957.azurewebsites.net/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 400,
})

axiosClient.interceptors.response.use(
    async (response) => {
        if (response && response.data) {
            return response.data
        }
    },
    async (error) => {
        const errorData = error.response?.data || ''

        return Promise.reject(new Error(errorData))
    },
)

export default axiosClient
