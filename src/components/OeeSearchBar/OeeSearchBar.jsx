import ToggleButtons from '../ToggleButtons/ToggleButtons'
import classNames from 'classnames/bind'
import style from './OeeSearchBar.module.scss'
// import { machineSelectlist, oeeModeList } from '@/ultils'
import { useEffect, useState } from 'react'
// import Select from 'react-select'
import { toast } from 'react-toastify'
import Select from 'react-select'
import nodeApi from '@/services/api/nodeApi'
import deviceApi from '@/services/api/deviceApi'

// function findMachine(deviceId) {
//     for (let i = 0; i < machineSelectlist.length; i++) {
//         if (machineSelectlist[i].value === deviceId) {
//             return machineSelectlist[i]
//         }
//     }
//     return null // Trả về null nếu không tìm thấy object nào có giá trị "value" bằng với giá trị của biến deviceId
// }

function OeeSearchBar({
    oeeModeIndex,
    setOeeModeIndex,
    oeeFormState,
    setOeeFormState,
    handleSubmitForm,
    eonNodeId,
    getChartData,
}) {
    let cx = classNames.bind(style)
    // Form toggle settings
    const [selectedOption, setSelectedOption] = useState({ value: '', label: '' })

    const [nodeList, setNodeList] = useState([]) // lưu data các node -> truyền vào select
    const callNodeApi = () => {
        deviceApi.getAll(eonNodeId).then((data) => {
            let temp = data.map((item) => ({
                value: item.deviceId,
                label: item.deviceName,
            }))
            setNodeList(temp)
            setSelectedOption(temp[0])
            getChartData(temp[0].value)
        })
    }
    useEffect(() => {
        callNodeApi()
    }, [])
    // hai biết dayStart và dayEnd dùng để lưu trữ tạm giá trị ngày tháng, sau đó được xử lý trong useEffect kiểm tra hợp lệ sau đó mới gửi lên trên Oee page
    const [dayStart, setDayStart] = useState(oeeFormState.dayStart)
    const [dayEnd, setDayEnd] = useState(oeeFormState.dayEnd)
    const onOeeModeIndexChange = (index) => {
        setOeeModeIndex(index)
    }
    const handleSubmit = () => {
        handleSubmitForm()
        getChartData(oeeFormState.machine)
    }
    console.log(oeeFormState)
    useEffect(() => {
        if (dayStart > dayEnd) {
            toast.error('Ngày kết thúc phải sau ngày bắt đầu', {
                style: { fontSize: '24px' },
            })
        } else {
            setOeeFormState({
                ...oeeFormState,
                dayEnd: dayEnd,
                dayStart: dayStart,
                machine: selectedOption.value,
            })
        }
    }, [dayEnd, dayStart])
    useEffect(() => {
        setOeeFormState({
            ...oeeFormState,
            machine: selectedOption.value,
        })
    }, [selectedOption])
    return (
        <>
            <div className={cx('wraper')}>
                <form className={cx('formWraper')}>
                    <div className={cx('fieldBox')}>
                        <b>Ngày bắt đầu</b>
                        <input
                            type="date"
                            id="dayStart"
                            name="dayStart"
                            value={oeeFormState.dayStart}
                            onChange={(e) => setDayStart(e.target.value)}
                        />
                    </div>
                    <div className={cx('fieldBox')}>
                        <b>Ngày kết thúc</b>
                        <input
                            type="date"
                            id="dayEnd "
                            name="dayEnd"
                            value={oeeFormState.dayEnd}
                            onChange={(e) => setDayEnd(e.target.value)}
                        />
                    </div>
                    <div className={cx('fieldBox')}>
                        <b>Chọn máy</b>
                        <Select
                            className={cx('select')}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={nodeList}
                        />
                    </div>
                    <button type="button" onClick={() => handleSubmit()}>
                        tìm kiếm
                    </button>
                </form>
                {/* <ToggleButtons active={oeeModeIndex} onClick={onOeeModeIndexChange} titles={oeeModeList} /> */}
            </div>
        </>
    )
}
export default OeeSearchBar
