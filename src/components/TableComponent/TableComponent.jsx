import RecycleBinSVG from '@/assets/icon/RecycleBinSVG'
import PenSVG from '@/assets/icon/PenSVG'
import { ReactComponent as CheckIconSVG } from '../../assets/icon/CheckIconSVG.svg'

import classNames from 'classnames/bind'
import { useState } from 'react'
import style from './TableComponent.module.scss'
import { useNavigate } from 'react-router-dom'

function TableComponent({ headerTitle, data, type, eonNodeIdProp, deviceIdd, deletefunction, submitFunction }) {
    let cx = classNames.bind(style)
    const navigate = useNavigate()
    const [hoveredRowId, setHoveredRowId] = useState(null)
    //dựa vào type để biết bảng này cho device hay tag
    const idType = type === 'device' ? 'deviceId' : type === 'node' ? 'eonNodeId' : 'tagId'
    const handleClickRow = (eonNodeId, eonNodeName, deviceId, deviceName, tagid, tagName, event) => {
        event.stopPropagation() // Stop the event from bubbling up
        if (type == 'node') {
            const data = {
                eonNodeName: eonNodeName,
            }
            navigate(`/nodes/${eonNodeId}`, { state: { data } })
        }
        if (type === 'device') {
            const data = {
                deviceName: deviceName,
            }
            navigate(`/nodes/${eonNodeIdProp}/devices/${deviceId}`, { state: { data } })
        }
        // if (type === 'tag') {
        //     const data = {
        //         tagName: tagName,
        //     }
        //     navigate(`/nodes/${eonNodeIdProp}/devices/${deviceIdd}/tags/${tagid}`, { state: { data } })
        // }
    }
    const handleDelete = (id, event) => {
        event.stopPropagation() // Stop the event from bubbling up
        deletefunction(id)
        console.log(id)
    }
    const handleSubmit = (id, event) => {
        event.stopPropagation() // Stop the event from bubbling up
        submitFunction(id)
    }
    const handleModify = (id, event) => {
        event.stopPropagation() // Stop the event from bubbling up
        console.log(id)
    }
    const handleRowHover = (rowId) => {
        setHoveredRowId(rowId)
    }
    const handleRowLeave = () => {
        setHoveredRowId(null)
    }
    return (
        <div className={cx('table-container')}>
            <table>
                <thead>
                    <tr>
                        {headerTitle.map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                        <th key="deleteRow"></th>
                        {/* <th key="editRow"></th> */}
                    </tr>
                </thead>
                <tbody>
    {data.map((row) => (
        <tr
            onClick={(event) =>
                handleClickRow(
                    row['eonNodeId'],
                    row['eonNodeName'],
                    row['deviceId'],
                    row['deviceName'],
                    row['tagId'],
                    row['tagName'],
                    event,
                )
            }
            key={row[idType]} // Sử dụng giá trị duy nhất từ row
            onMouseEnter={() => handleRowHover(row[idType])}
            onMouseLeave={handleRowLeave}
            className={cx({ 'row-hover': hoveredRowId === row[idType] })}
        >
            {Object.keys(row).map((key) => (
                <td key={`${row[idType]}-${key}`}>{row[key]}</td> // Kết hợp row[idType] và key để tạo key duy nhất
            ))}
            {type === 'node' && (
                <td
                    onClick={(event) => handleSubmit(row[idType], event)}
                    className={cx({ hiddenIcon: hoveredRowId !== row[idType] }, 'rowButton')}
                >
                    <CheckIconSVG />
                </td>
            )}
            <td
                onClick={(event) => handleDelete(row[idType], event)}
                className={cx({ hiddenIcon: hoveredRowId !== row[idType] }, 'rowButton')}
            >
                <RecycleBinSVG />
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    )
}
export default TableComponent
