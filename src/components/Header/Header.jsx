import { ReactComponent as AddIconSVG } from '../../assets/icon/AddIcon.svg'
import classNames from 'classnames/bind'
import PageStatus from '@/components/PageStatus/PageStatus'
import style from './Header.module.scss'

function Header({ title, buttonTittle, handleClickButton, handleClickButtonProp }) {
    let cx = classNames.bind(style)
    return (
        <div className={cx('wrapper')}>
            <h1>{title}</h1>
            <div className={cx('addButton')}>
                <button className={cx('filledButton')} onClick={() => handleClickButton(handleClickButtonProp)}>
                    <AddIconSVG />
                    {buttonTittle}
                </button>
                {/* <PageStatus /> */}
            </div>
        </div>
    )
}
export default Header
