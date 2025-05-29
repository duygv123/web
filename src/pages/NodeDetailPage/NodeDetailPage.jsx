// import TableComponent from '@/components/TableComponent/TableComponent'
// import CreateEditModal from '@/components/CreateEditModal/CreateEditModal'
// import Header from '@/components/Header/Header'
// import DeleteModal from '@/components/DeleteModal/DeleteModal'

// import classNames from 'classnames/bind'
// import { useEffect, useState, useCallback } from 'react'
// import style from './NodeDetailPage.module.scss'
// import deviceApi from '@/services/api/deviceApi'
// import { useParams, useLocation, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { toastConfig } from '@/ultils/toastConfig'

// const headerTitle = ['Device id', 'Device name', 'Prototype', 'Prototype Id']

// function NodeDetailPage() {
//     const cx = classNames.bind(style)
//     const location = useLocation()
//     const navigate = useNavigate()
//     const { eonNodeId } = useParams()
//     console.log(eonNodeId)
//     const [deviceList, setDeviceList] = useState([])
//     const [modalIsOpen, setModalIsOpen] = useState(false)
//     const [modalDelete, setModalDelete] = useState(false)
//     const [chosingMachineId, setChosingMachineId] = useState('')
//     const [loadingCreateModal, setLoadingCreateModal] = useState(false)
//     const [loadingDeleteModal, setLoadingDeleteModal] = useState(false)

//     // fallback nếu không có location.state
//     const data = location?.state?.data
//     useEffect(() => {
//         if (!data || !eonNodeId) {
//             toast.error('Thiếu thông tin node', toastConfig)
//             navigate('/connect') // hoặc route về trang phù hợp
//             return
//         }
//         callDeviceApi()
//     }, [eonNodeId])

//     const callDeviceApi = useCallback(() => {
//         deviceApi.getAll(eonNodeId).then((data) => {
//             setDeviceList(data)
//         })
//     }, [eonNodeId])

//     const handleDelete = useCallback((id) => {
//         setLoadingDeleteModal(true)
//         deviceApi
//             .deleteDevice(eonNodeId, id)
//             .then(() => {
//                 toast.success('Xóa device thành công', toastConfig)
//                 setLoadingDeleteModal(false)
//                 setModalDelete(false)
//                 callDeviceApi()
//             })
//             .catch((error) => {
//                 console.error(error)
//                 toast.error('Xóa device không thành công', toastConfig)
//                 setLoadingDeleteModal(false)
//                 setModalDelete(false)
//             })
//     }, [callDeviceApi, eonNodeId])

//     const handleOpenDeleteModal = useCallback((id) => {
//         setChosingMachineId(id)
//         setModalDelete(true)
//     }, [])

//     const handleCreateDevice = useCallback((formData) => {
//         setLoadingCreateModal(true)

//         deviceApi
//             .postDevice(formData, eonNodeId)
//             .then(() => {
//                 toast.success('Thêm device mới thành công', toastConfig)
//                 setLoadingCreateModal(false)
//                 setModalIsOpen(false)
//                 callDeviceApi()
//             })
//             .catch((error) => {
//                 console.error(error)
//                 toast.error('Thêm device mới không thành công', toastConfig)
//                 setLoadingCreateModal(false)
//                 setModalIsOpen(false)
//             })
//     }, [callDeviceApi, eonNodeId])

//     return (
//         <div className={cx('wraper')}>
//             <Header
//                 title={`Node name: ${data?.eonNodeName || 'Unknown'}`}
//                 buttonTittle="Tạo device mới"
//                 handleClickButton={setModalIsOpen}
//                 handleClickButtonProp={true}
//             />
//             <div className={cx('content')}>
//                 <CreateEditModal
//                     modalIsOpen={modalIsOpen}
//                     setModalIsOpen={setModalIsOpen}
//                     handleCreateFucntion={handleCreateDevice}
//                     formInitialValues={{
//                         deviceName: '',
//                         deviceId: '',
//                         devicePrototype: '',
//                         prototypeId: '',
//                     }}
//                     headerTitle="Tạo device mới"
//                     modalType={2}
//                     loading={loadingCreateModal}
//                     loadingText="Đang tạo device..."
//                 />
//                 <DeleteModal
//                     modalIsOpen={modalDelete}
//                     setModalIsOpen={setModalDelete}
//                     headerTitle="Xác nhận xóa device"
//                     deleteType={2}
//                     confirmString={chosingMachineId}
//                     handleDeletetFunction={handleDelete}
//                     deleteId={chosingMachineId}
//                     loading={loadingDeleteModal}
//                     loadingText="Đang xóa device..."
//                 />
//                 <TableComponent
//                     deletefunction={handleOpenDeleteModal}
//                     headerTitle={headerTitle}
//                     data={deviceList}
//                     type="device"
//                     eonNodeIdProp={eonNodeId}
//                 />
//             </div>
//         </div>
//     )
// }

// export default NodeDetailPage



import TableComponent from '@/components/TableComponent/TableComponent'
import CreateEditModal from '@/components/CreateEditModal/CreateEditModal'
import Header from '@/components/Header/Header'
import DeleteModal from '@/components/DeleteModal/DeleteModal'

import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import style from './NodeDetailPage.module.scss'
import deviceApi from '@/services/api/deviceApi'
import { useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastConfig } from '@/ultils/toastConfig'
const headerTitle = ['Device id', 'Device name', 'Prototype', 'Prototype Id']
function NodeDetailPage() {
    let cx = classNames.bind(style)
    const location = useLocation()

    const { data } = location.state
    const { eonNodeId } = useParams()
    console.log(eonNodeId)
    const [deviceList, setDeviceList] = useState([])

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState(false) // state cho trạng thái mở đóng của delete modal

    const [chosingMachineId, setChosingMachineId] = useState('') // lưu id truyền vào delete modal

    const [loadingCreateModal, setLoadingCreateModal] = useState(false) // trạng thái loading của modal create
    const [loadingDeleteModal, setLoadingDeleteModal] = useState(false) // trạng thái loading của modal create

    // hàm xóa device
    const handleDelete = (id) => {
        console.log(`Xóa device có id:${id}`)
        setLoadingDeleteModal(true)
        deviceApi
            .deleteDevice(eonNodeId, id)
            .then((response) => {
                console.log(response)
                toast.success('Xóa device thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
                callDeviceApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Xóa device không thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
            })
    }
    const callDeviceApi = () => {
        deviceApi.getAll(eonNodeId).then((data) => {
            setDeviceList(data)
        })
    }
    const handleOpenDeleteModal = (id) => {
        setChosingMachineId(id)
        setModalDelete(true)
    }
    const handleCreateDevice = (data) => {
        setLoadingCreateModal(true)
        
        deviceApi
            .postDevice(data, eonNodeId)
            .then((response) => {
                console.log(response)
                toast.success('Thêm device mới thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
                callDeviceApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Thêm device mới không thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
            })
    }

    useEffect(() => {
        callDeviceApi()
    }, [])

    return (
        <>
            <div className={cx('wraper')}>
                <Header
                    title={`Node name: ${data.eonNodeName}`}
                    buttonTittle="Tạo device mới"
                    handleClickButton={setModalIsOpen}
                    handleClickButtonProp={true}
                />

                <div className={cx('content')}>
                    <CreateEditModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        handleCreateFucntion={handleCreateDevice}
                        formInitialValues={{
                            deviceId: '', // ID của thiết bị
                            deviceName: '', // Tên của thiết bị
                            deviceAddress: '', // Địa chỉ của thiết bị
                            protocolId: '', // ID giao thức
                            deviceProtocol: '', // Giao thức của thiết bị
                        }}
                        headerTitle="Tạo device mới"
                        modalType={2}
                        loading={loadingCreateModal}
                        loadingText="Đang tạo device..."
                    />
                    <DeleteModal
                        modalIsOpen={modalDelete}
                        setModalIsOpen={setModalDelete}
                        headerTitle="Xác nhận xóa device"
                        deleteType={2}
                        confirmString={chosingMachineId}
                        handleDeletetFunction={handleDelete}
                        deleteId={chosingMachineId}
                        loading={loadingDeleteModal}
                        loadingText="Đang xóa device..."
                    />
                    <TableComponent
                        deletefunction={handleOpenDeleteModal}
                        headerTitle={headerTitle}
                        data={deviceList}
                        type="device"
                        eonNodeIdProp={eonNodeId}
                    />
                </div>
            </div>
        </>
    )
}
export default NodeDetailPage
