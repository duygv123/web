import classnames from 'classnames/bind'
import style from './Card.module.scss'

const cx = classnames.bind(style)

function Card({ children, className, onClick, hover, disabled, status, isSimulated }) {
    return (
        <div
            className={cx(className, 'wrapper', {
                hover,
                disabled,
                status,
                [status]: status,
                simulate: isSimulated,
            })}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Card
