import classNames from 'classnames/bind'
import style from './DashboardUnit.module.scss'
import OeeSearchBar from '@/components/OeeSearchBar/OeeSearchBar'
import { useEffect, useState } from 'react'
import nodeApi from '@/services/api/nodeApi'
import deviceApi from '@/services/api/deviceApi'
import OeePageChart from '@/components/OeePageChart/OeePageChart'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastConfig } from '@/ultils/toastConfig'
import tagApi from '@/services/api/tagApi'
import ToggleButtons from '@/components/ToggleButtons/ToggleButtons'
import TableComponentDashboardUnit from '@/components/TableComponentDashboardUnit/TableComponentDashboardUnit'
export const oeeModeList = ['Chart', 'Table']
const headerTitle = ['Thời gian mở cửa', 'Chu kì ép', 'Time stamp']

const returnStartEndDate = () => {
    const dayStart = '2023-04-01'
    const currentDate = new Date()
    const dayEnd = currentDate.toISOString().substr(0, 10)

    return { dayStart, dayEnd }
}
function chuyenDoiChuoiThoiGian(chuoiThoiGian) {
    // Tách thông tin từ timestamp
    var parts = chuoiThoiGian.split(/[T.:-]/)

    // Xếp lại các phần để định dạng lại ngày tháng
    var ngayThang = parts[2] + '-' + parts[1] + '-' + parts[0]

    // Định dạng lại thời gian
    var thoiGian = parts[3] + ':' + parts[4] + ':' + parts[5]

    // Kết hợp ngày và thời gian
    var ketQua = ngayThang + ' ' + thoiGian

    return ketQua
}
function transformData(inputArray) {
    const resultObject = {}

    inputArray.forEach((item) => {
        const deviceId = item.deviceId
        const timestampArray = []
        const valueArray = []

        item.cycleTimeData.forEach((data) => {
            timestampArray.push(chuyenDoiChuoiThoiGian(data.timestamp))
            valueArray.push(data.value.toFixed(4))
        })

        if (!resultObject[deviceId]) {
            resultObject[deviceId] = {
                xaxis: timestampArray,
                series: [
                    {
                        name: deviceId,
                        data: valueArray,
                    },
                ],
            }
        } else {
            resultObject[deviceId].xaxis = timestampArray
            resultObject[deviceId].series.push({
                name: deviceId,
                data: valueArray,
            })
        }
    })

    return resultObject
}
function DashboardUnit() {
    let cx = classNames.bind(style)
    const { eonNodeId } = useParams()

    const [oeeModeIndex, setOeeModeIndex] = useState(0) // oee search bar states
    const [oeeFormState, setOeeFormState] = useState({
        dayStart: returnStartEndDate().dayStart,
        dayEnd: returnStartEndDate().dayEnd,
        machine: '',
    })
    const [chartData, setChartData] = useState([])
    const [tableData, setTableData] = useState([])
    const getOeeData = () => {
        deviceApi.deviceCycleTime(eonNodeId, oeeFormState.dayStart, oeeFormState.dayEnd).then((data) => {
            setChartData(transformData(data))
            toast.success('Tải dữ liệu thành công', toastConfig)
        })
    }
    const getChartData = (machineId) => {
        tagApi.tagReading(eonNodeId, machineId, oeeFormState.dayStart, oeeFormState.dayEnd).then((data) => {
            let tempdata = data.map((item) => {
                return {
                    ...item,
                    timestamp: chuyenDoiChuoiThoiGian(item.timestamp),
                }
            })
            setTableData(tempdata.reverse())
        })
    }
    console.log(tableData)
    useEffect(() => {
        getOeeData()
    }, [])

    let mode = 1
    return (
        <div className={cx('wraper')}>
            <h1>Đồ thị chu kì ép {oeeFormState.machine}</h1>
            <div className={cx('content')}>
                <OeeSearchBar
                    oeeModeIndex={oeeModeIndex}
                    setOeeModeIndex={setOeeModeIndex}
                    oeeFormState={oeeFormState}
                    setOeeFormState={setOeeFormState}
                    handleSubmitForm={getOeeData}
                    eonNodeId={eonNodeId}
                    getChartData={getChartData}
                />
                <div className={cx('a')}></div>
                <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={oeeModeList} />
                {oeeModeIndex == 0 && <OeePageChart mode={mode} formState={oeeFormState} chartData={chartData} />}
                {oeeModeIndex == 1 && (
                    <TableComponentDashboardUnit
                        headerTitle={headerTitle}
                        data={tableData}
                        type="node"
                        disableClick={true}
                    />
                )}
            </div>
        </div>
    )
}
export default DashboardUnit
