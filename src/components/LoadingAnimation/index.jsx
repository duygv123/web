import classnames from 'classnames/bind'
import style from './LoadingAnimation.module.scss'

const cx = classnames.bind(style)

function LoadingAnimation({ label }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('label')}>{label}</div>
            <div className={cx('loadingio-spinner-spinner-n5v4fx11fwk')}>
                <div className={cx('ldio-lvl3gbhmrtq')}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingAnimation
