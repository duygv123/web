import DeleteModal from '@/components/DeleteModal/DeleteModal'
import CreateEditModal from '@/components/CreateEditModal/CreateEditModal'
import Header from '@/components/Header/Header'
import NodeBox from './NodeBox'
import TableComponent from '@/components/TableComponent/TableComponent'

import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import style from './MainPage.module.scss'
import nodeApi from '@/services/api/nodeApi'
import { toast } from 'react-toastify'
import { toastConfig } from '@/ultils/toastConfig'
import hubConnection from '@/services/signalR/hubConnection'
const headerTitle = ['Node id', 'Node name', '']

function MainPage() {
    let cx = classNames.bind(style)
    const [nodeList, setNodeList] = useState([]) // lưu data các node

    const [modalIsOpen, setModalIsOpen] = useState(false) // state cho trạng thái mở đóng của create modal
    const [modalDelete, setModalDelete] = useState(false) // state cho trạng thái mở đóng của delete modal
    const [chosingMachineId, setChosingMachineId] = useState('') // lưu id truyền vào delete modal
    const [loadingCreateModal, setLoadingCreateModal] = useState(false) // trạng thái loading của modal create
    const [loadingDeleteModal, setLoadingDeleteModal] = useState(false) // trạng thái loading của modal create

    const [connection, setConnection] = useState()
    useEffect(() => {
        hubConnection.start().then((connection) => {
            setConnection(connection)
        })
    }, [])

    // hàm xóa node
    const handleDelete = (id) => {
        console.log(`Xóa node có id:${id}`)
        setLoadingDeleteModal(true)
        nodeApi
            .deleteNode(id)
            .then((response) => {
                console.log(response)
                toast.success('Xóa node thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
                callNodeApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Xóa node không thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
            })
        // setNodeList(nodeList.filter((node) => node.id !== id))
    }
    //hàm gọi api lấy node data
    const callNodeApi = () => {
        nodeApi.getAll().then((data) => {
            setNodeList(data)
        })
    }
    const handleCreateNode = (data) => {
        setLoadingCreateModal(true)
        console.log(data)
        nodeApi
            .postNode(data)
            .then((response) => {
                console.log(response)
                toast.success('Thêm node mới thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
                callNodeApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Thêm node mới không thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
            })
    }
    //hàm handle mở delete modal lên
    const handleOpenDeleteModal = (id) => {
        setChosingMachineId(id)
        setModalDelete(true)
    }
    //hàm gọi hàm từ signalR
    const handleSubmit = (id) => {
        console.log(id)
        connection
            .invoke('SendConfig', id)
            .then((data) => {
                toast.success('Gửi lệnh thành công')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Gửi lệnh không thành công')
            })
    }
    useEffect(() => {
        callNodeApi()
    }, [])
    return (
        <>
            <div className={cx('wraper')}>
                <Header
                    title="Danh sách các node"
                    buttonTittle="Tạo node mới"
                    handleClickButton={setModalIsOpen}
                    handleClickButtonProp={true}
                />
                <CreateEditModal
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                    handleCreateFucntion={handleCreateNode}
                    formInitialValues={{
                        eonNodeName: '',
                        eonNodeId: '',
                    }}
                    headerTitle="Tạo node mới"
                    modalType={1}
                    loading={loadingCreateModal}
                    loadingText="Đang tạo node..."
                />
                <DeleteModal
                    modalIsOpen={modalDelete}
                    setModalIsOpen={setModalDelete}
                    headerTitle="Xác nhận xóa node"
                    deleteType={1}
                    confirmString={chosingMachineId}
                    handleDeletetFunction={handleDelete}
                    deleteId={chosingMachineId}
                    loading={loadingDeleteModal}
                    loadingText="Đang xóa node..."
                />
                <div className={cx('content')}>
                    <TableComponent
                        deletefunction={handleOpenDeleteModal}
                        headerTitle={headerTitle}
                        data={nodeList}
                        type="node"
                        submitFunction={handleSubmit}
                        // eonNodeId={eonNodeId}
                    />
                    {/* {nodeList.map((item) => (
                        <>
                            <NodeBox
                                key={item.eonNodeId}
                                eonNodeId={item.eonNodeId}
                                eonNodeName={item.eonNodeName}
                                handleOpenDeleteModal={handleOpenDeleteModal}
                                handleSubmit={handleSubmit}
                            />
                        </>
                    ))} */}
                </div>
            </div>
        </>
    )
}
export default MainPage
