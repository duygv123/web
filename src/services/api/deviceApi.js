import axiosClient from './axiosClient'
const deviceApi = {
    // lấy tất cả device trong node có id eonNodeId
    getAll: (eonNodeId) => {
        const url = `EonNodes/${eonNodeId}/devices`
        return axiosClient.get(url)
    },
    //thêm device vào node có id eonNodeId
    postDevice: (data, eonNodeId) => {
        const url = `EonNodes/${eonNodeId}/devices`
        return axiosClient.post(url, data)
    },
    deleteDevice: (eonNodeId, deviceId) => {
        const url = `EonNodes/${eonNodeId}/devices/${deviceId}`
        return axiosClient.delete(url)
    },
}
export default deviceApi
