import Card from '@/components/Card'

import classNames from 'classnames/bind'
import style from './ConnnectPageDetail.module.scss'
function ConnnectPageDetail() {
    let cx = classNames.bind(style)
    return (
        <>
            <div className={cx('wraper')}>
                <h1>Thiết lập kết nối</h1>
                <Card className={cx('connectBox')}>
                    <p>Nhấn nút sửa để chỉnh sửa kết nối</p>
                    <input placeholder="https://cha-tags-server.app/" />
                    <div className={cx('buttonBox')}>
                        <button>Sửa</button>
                        <button className={cx('buttonConnect')}>Kết nối</button>
                    </div>
                </Card>
            </div>
        </>
    )
}
export default ConnnectPageDetail
