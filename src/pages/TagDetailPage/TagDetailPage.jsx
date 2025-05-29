import classNames from 'classnames/bind'
import style from './TagDetailPage.module.scss'
import { useParams } from 'react-router-dom'
function TagDetailPage() {
    let cx = classNames.bind(style)
    const { tagId } = useParams()
    console.log(tagId)
    return (
        <>
            <div className={cx('wraper')}>
                <h1>TagDetailPage</h1>
                <div className={cx('content')}>
                    <div className={cx('colRight')}></div>
                    <div className={cx('colLeft')}></div>
                </div>
            </div>
        </>
    )
}
export default TagDetailPage
