import CrossSVG from '@/assets/icon/CrossSVG'
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner'

import { toast } from 'react-toastify'
import { toastConfig } from '@/ultils/toastConfig'

import classNames from 'classnames/bind'
import style from './DeleteModal.module.scss'
import ReactModal from 'react-modal'
import { useState } from 'react'
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
    },
}

function DeleteModal({
    modalIsOpen,
    setModalIsOpen,
    headerTitle,
    deleteType,
    confirmString,
    deleteId,
    handleDeletetFunction,
    loading,
    loadingText,
}) {
    let cx = classNames.bind(style)
    const [inputConfirmState, setInputConfirmState] = useState('') // lưu trạng thái của input
    const handleDelete = () => {
        if (confirmString === inputConfirmState) {
            handleDeletetFunction(deleteId)
            setInputConfirmState('')
        } else {
            toast.error('Nhập sai chuỗi xác nhận, vui lòng nhập lại!', toastConfig)
        }
    }
    const handleClose = () => {
        setInputConfirmState('')
        setModalIsOpen(false)
    }
    return (
        <>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="deleleModal"
                appElement={document.body}
            >
                <div className={cx('modalContent')}>
                    <div className={cx('header')}>
                        <h1>{headerTitle}</h1>
                        <div onClick={() => handleClose()} className={cx('crossSVG')}>
                            <CrossSVG />
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {loading && <LoadingSpiner loadingText={loadingText} />}

                        {deleteType === 1 && loading === false && (
                            <p>
                                Việc xóa node sẽ xóa tất cả các divices và tags của nó. Nhập{' '}
                                <span className={cx('confirmStringSpan')}>{confirmString}</span> để xác nhận xóa node:
                            </p>
                        )}
                        {deleteType === 2 && loading === false && (
                            <p>
                                Việc xóa device sẽ xóa tất cả các tag của nó. Nhập{' '}
                                <span className={cx('confirmStringSpan')}>{confirmString}</span> để xác nhận xóa device:
                            </p>
                        )}
                        {deleteType === 3 && loading === false && (
                            <p>
                                Việc xóa tag sẽ xóa tất cả thông tin của tag của nó. Nhập{' '}
                                <span className={cx('confirmStringSpan')}>{confirmString}</span> để xác nhận xóa tag:
                            </p>
                        )}
                        {loading === false && (
                            <>
                                <input
                                    value={inputConfirmState}
                                    onChange={(e) => setInputConfirmState(e.target.value)}
                                />
                                <div className={cx('deleteButtonBox')}>
                                    <div className={cx('cancelButton')} onClick={() => handleClose()}>
                                        Hủy
                                    </div>
                                    <div className={cx('deleteButton')} onClick={() => handleDelete()}>
                                        Xóa
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ReactModal>
        </>
    )
}
export default DeleteModal
