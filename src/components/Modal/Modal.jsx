import CrossSVG from '@/assets/icon/CrossSVG'

import classNames from 'classnames/bind'
import style from './Modal.module.scss'
import ReactModal from 'react-modal'
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

function Modal({ children, modalIsOpen, setModalIsOpen, headerTitle, headerTitleColor = '#5175f3' }) {
    let cx = classNames.bind(style)

    return (
        <>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="inputModal"
                appElement={document.body}
            >
                <div className={cx('modalContent')}>
                    <div className={cx('header')}>
                        <h1 style={{ color: headerTitleColor }}>{headerTitle}</h1>
                        <div onClick={() => setModalIsOpen(false)} className={cx('crossSVG')}>
                            <CrossSVG />
                        </div>
                    </div>
                    <div className={cx('content')}>{children}</div>
                </div>
            </ReactModal>
        </>
    )
}
export default Modal
