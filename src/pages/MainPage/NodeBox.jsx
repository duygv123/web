import Card from '@/components/Card'
import RecycleBinSVG from '@/assets/icon/RecycleBinSVG'

import classNames from 'classnames/bind'
import style from './MainPage.module.scss'
import { useNavigate } from 'react-router-dom'
function NodeBox({ eonNodeId, eonNodeName, handleOpenDeleteModal, handleSubmit }) {
    let cx = classNames.bind(style)
    const navigate = useNavigate()

    function handleClick() {
        const data = {
            eonNodeName: eonNodeName,
        }
        navigate(`/nodes/${eonNodeId}`, { state: { data } })
    }
    function handleDeleteClick(event) {
        event.stopPropagation() // Stop the event from bubbling up
        handleOpenDeleteModal(eonNodeId)
    }
    function handleSubmitButton(event) {
        event.stopPropagation() // Stop the event from bubbling up
        handleSubmit(eonNodeId)
        console.log(eonNodeId)
    }
    return (
        <Card className={cx('nodeBox')} key={eonNodeId} hover onClick={handleClick}>
            <div className={cx('top')}>
                <h1>{eonNodeName}</h1>
                <div onClick={handleDeleteClick} className={cx('recycleBinSVG')}>
                    <RecycleBinSVG />
                </div>
            </div>
            <div className={cx('bottom')}>
                <div>
                    <p>
                        Id:
                        {eonNodeId}
                    </p>
                </div>
                <button className="filledButton" onClick={handleSubmitButton}>
                    confirm
                </button>
            </div>
        </Card>
    )
}
export default NodeBox
