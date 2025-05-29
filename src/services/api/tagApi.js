import axiosClient from './axiosClient'
const tagApi = {
    // lấy tất cả tag trong device có id deviceId
    getAll: (eonNodeId, deviceId) => {
        const url = `EonNodes/${eonNodeId}/devices/${deviceId}/tags`
        return axiosClient.get(url)
    },
    //thêm tag vào device có id deviceId
    postTag: (data, eonNodeId, deviceId) => {
        const url = `EonNodes/${eonNodeId}/devices/${deviceId}/tags`
        return axiosClient.post(url, data)
    },
    //lấy data của tag có id tagId
    getTagData: (eonNodeId, deviceId, tagId) => {
        const url = `EonNodes/${eonNodeId}/devices/${deviceId}/tags/${tagId}`
        return axiosClient.get(url)
    },
    deleteTag: (eonNodeId, deviceId, tagId) => {
        const url = `EonNodes/${eonNodeId}/devices/${deviceId}/tags/${tagId}`
        return axiosClient.delete(url)
    },
}
export default tagApi
