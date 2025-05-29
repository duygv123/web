import classNames from 'classnames/bind'
import style from './SideBarContent.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SideBarContent() {
    const cx = classNames.bind(style)
    const navigate = useNavigate()
    const [active, setActive] = useState('Node List')

    const menuItems = [
        { label: 'Node List', path: '/' },
        { label: 'DashBoard', path: '/dashboard' },
        // { label: 'Historical Data', path: '/historical' },
        // { label: 'OTA Firmware', path: '/ota' },
        // { label: 'Options', path: '/options' },
    ]

    const handleClick = (item) => {
        setActive(item.label)
        navigate(item.path)
    }
    
    return (
        <div className={cx('wraper')}>
            {menuItems.map((item) => (
                <div
                    key={item.label}
                    className={cx('item', { active: active === item.label })}
                    onClick={() => handleClick(item)}
                >
                    <div className={cx('icon')} />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    )
}

export default SideBarContent
