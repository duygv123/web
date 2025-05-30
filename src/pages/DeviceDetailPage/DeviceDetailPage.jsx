import TableComponent from '@/components/TableComponent/TableComponent'
import CreateEditModal from '@/components/CreateEditModal/CreateEditModal'
import Header from '@/components/Header/Header'
import DeleteModal from '@/components/DeleteModal/DeleteModal'

import classNames from 'classnames/bind'
import { useEffect, useState, useCallback, use } from 'react'
import style from './DeviceDetailPage.module.scss'
import { useParams, useLocation } from 'react-router-dom'
import tagApi from '@/services/api/tagApi'
import { toast } from 'react-toastify'
import { toastConfig } from '@/ultils/toastConfig'
import hubConnection from '@/services/signalR'
import useCallSignalR from '@/hooks/useCallSignalR'


const headerTitle = ['Tag id', 'Tag name', 'Tag type', 'Tag value', 'Address', 'Time stamp']
function DeviceDetailPage() {
    let cx = classNames.bind(style)
    const location = useLocation()
    const { data } = location.state
    const { eonNodeId, deviceId } = useParams()
    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState(false) // state cho trạng thái mở đóng của delete modal
    
    const [loadingCreateModal, setLoadingCreateModal] = useState(false) // trạng thái loading của modal create
    const [loadingDeleteModal, setLoadingDeleteModal] = useState(false) // trạng thái loading của modal create
    
    const [chosingMachineId, setChosingMachineId] = useState('') // lưu id truyền vào delete modal
    
    const [tagList, setTagList] = useState([])
    const [connection, setConnection] = useState(null)
    const [arrayData, setArrayData] = useState({})
     const [updatedData, setUpdatedData] = useState([]); // Dữ liệu đã cập nhật
    const callTagApi = () => {
        tagApi.getAll(eonNodeId, deviceId).then((data) => {
            setTagList(data)
        })
    }



    const handleOpenDeleteModal = (id) => {
        console.log(id)
        setChosingMachineId(id)
        setModalDelete(true)
    }
    const handleDelete = (id) => {
        console.log(`Xóa device có id:${id}`)
        setLoadingDeleteModal(true)
        tagApi
            .deleteTag(eonNodeId, deviceId, id)
            .then((response) => {
                console.log(response)
                toast.success('Xóa tag thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
                callTagApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Xóa tag không thành công', toastConfig)
                setLoadingDeleteModal(false)
                setModalDelete(false)
            })
    }
    const handleCreateDevice = (data) => {
        setLoadingCreateModal(true)
        tagApi
            .postTag(data, eonNodeId, deviceId)
            .then((response) => {
                console.log(response)
                toast.success('Thêm tag mới thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
                callTagApi()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Thêm tag mới không thành công', toastConfig)
                setLoadingCreateModal(false)
                setModalIsOpen(false)
            })
    }
    useEffect(() => {
        callTagApi()
    }, [])
    
    useEffect(() => {
        hubConnection.start().then((connection) => {
            setConnection(connection)
        })
    },[])
const tagData = useCallSignalR(connection)

useEffect(() => {
  if (
    tagData &&
    tagData.EonNodeId &&
    tagData.DeviceId &&
    tagData.TagId
  ) {
    setArrayData((prevData) => {
      const newData = {
        ...prevData,
        [tagData.EonNodeId]: {
          ...(prevData[tagData.EonNodeId] || {}),
          [tagData.DeviceId]: {
            ...(prevData[tagData.EonNodeId]?.[tagData.DeviceId] || {}),
            [tagData.TagId]: tagData,
          },
        },
      };
      //console.log('arrayData updated:', newData);
      return newData;
    });
  } 
}, [tagData]);
 //console.log(arrayData)
const formatTimestampToVN = (utcString) => {
    if (!utcString) return '';
    const date = new Date(utcString);
    date.setHours(date.getHours() + 7); // cộng thêm 7 giờ thủ công

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};


    return (
        <>
            <div className={cx('wraper')}>
                <Header
                    title="Danh sách các tag trong device"
                    buttonTittle="Tạo tag mới"
                    handleClickButton={setModalIsOpen}
                    handleClickButtonProp={true}
                />
                <div className={cx('content')}>
                    <CreateEditModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        handleCreateFucntion={handleCreateDevice}
                        formInitialValues={{
                            tagId: '',
                            tagName: '',
                            tagType: 0,
                        }}
                        headerTitle="Tạo tag mới"
                        modalType={3}
                        loading={loadingCreateModal}
                        loadingText="Đang tạo tag..."
                    />
                    <DeleteModal
                        modalIsOpen={modalDelete}
                        setModalIsOpen={setModalDelete}
                        headerTitle="Xác nhận xóa tag"
                        deleteType={3}
                        confirmString={chosingMachineId}
                        handleDeletetFunction={handleDelete}
                        deleteId={chosingMachineId}
                        loading={loadingDeleteModal}
                        loadingText="Đang xóa tag..."
                    />

                    
<TableComponent
    deviceIdd={deviceId}
    eonNodeIdProp={eonNodeId}
    deletefunction={handleOpenDeleteModal}
    headerTitle={headerTitle}
    data={tagList.map(tag => {
    const tagId = (tag.TagId || tag.tagId || '').toString().trim();
    const tagObj = arrayData?.[tag.eonNodeId || eonNodeId]?.[tag.deviceId || deviceId]?.[tagId];

    const rawTimestamp = tagObj?.Timestamp ?? tag.timestamp ?? '';
    const adjustedTimestamp = formatTimestampToVN(rawTimestamp);

    return {
        ...tag,
        tagValue: tagObj?.Value ?? tag.tagValue ?? 0,
        timestamp: adjustedTimestamp
    };
})}


    type="tag"
/>
                </div>
            </div>
        </>
    )
}
export default DeviceDetailPage
