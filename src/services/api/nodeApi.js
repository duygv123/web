import axiosClient from './axiosClient'
const nodeApi = {
    getAll: () => {
        const url = `EonNodes`
        return axiosClient.get(url)
    },
    postNode: (data) => {
        const url = 'EonNodes'
        return axiosClient.post(url, data)
    },
    deleteNode: (eonNodeId) => {
        const url = `EonNodes/${eonNodeId}`
        return axiosClient.delete(url)
    },
}
export default nodeApi 
