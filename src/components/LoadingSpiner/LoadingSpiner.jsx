import classNames from 'classnames/bind'
import style from './LoadingSpiner.module.scss'
function LoadingSpiner({ loadingText }) {
    let cx = classNames.bind(style)
    return (
        <>
            <div className={cx('loaderContainer')}>
                <div className={cx('loader')}></div>
                <h1>{loadingText}</h1>
            </div>
        </>
    )
}
export default LoadingSpiner
