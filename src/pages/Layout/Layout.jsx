
import SideBarContent from '../SideBarContent/SideBarContent';
import classNames from 'classnames/bind';
import style from './Layout.module.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo.jpg'; // Đường dẫn chính xác tới file logo

function Layout({ children }) {
    let cx = classNames.bind(style);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`);
    };
    return (
        <>
            <div className={cx('wraper')}>
                <div className={cx('sideBar')}>
                    <div className={cx('sideBarTop')}>
                        <div className={cx('avatar')} onClick={handleClick}>
                            <img src = {logo} alt="Logo" className={cx('avatarImg')} />
                        </div>
                        <p>Tag Manager App</p>
                    </div>
                    <SideBarContent />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}
export default Layout;