import classNames from 'classnames/bind'
import style from './PageStatus.module.scss'
function PageStatus() {
    let cx = classNames.bind(style)
    return (
        <>
            <div className={cx('wraper')}>
                <div className={cx('statusPageElement')}>
                    <div className={cx('statusBox', 'RUN')}>200</div>
                    <p>RUN</p>
                </div>
                <div className={cx('statusPageElement')}>
                    <div className={cx('statusBox', 'DOWN')}>12</div>
                    <p>DOWN</p>
                </div>
            </div>
        </>
    )
}
export default PageStatus
