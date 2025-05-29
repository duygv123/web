import classNames from 'classnames/bind'
import style from './DashboardUnitNode.module.scss'
import OeeSearchBar from '@/components/OeeSearchBar/OeeSearchBar'
import { useEffect, useState } from 'react'
import nodeApi from '@/services/api/nodeApi'
import deviceApi from '@/services/api/deviceApi'
import OeePageChart from '@/components/OeePageChart/OeePageChart'
import TableComponent from '@/components/TableComponent/TableComponent'
import TableComponentDashboardUnit from '@/components/TableComponentDashboardUnit/TableComponentDashboardUnit'
const headerTitle = ['Node id', 'Node name']

function DashboardUnitNode() {
    let cx = classNames.bind(style)
    const [nodeList, setNodeList] = useState([]) // lưu data các node
    const callNodeApi = () => {
        nodeApi.getAll().then((data) => {
            setNodeList(data)
        })
    }
    useEffect(() => {
        callNodeApi()
    }, [])
    return (
        <>
            <div className={cx('wraper')}>
                <h1>Chọn node</h1>
                <div className={cx('content')}>
                    <TableComponentDashboardUnit
                        // deletefunction={handleOpenDeleteModal}
                        headerTitle={headerTitle}
                        data={nodeList}
                        type="node"
                        // submitFunction={handleSubmit}
                        // eonNodeId={eonNodeId}
                    />
                </div>
            </div>
        </>
    )
}
export default DashboardUnitNode
