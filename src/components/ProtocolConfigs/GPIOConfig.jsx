import React, { useState } from 'react';
import style from './GPIOconfig.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function GPIOConfig({ onClose, onConfirm }) {
    const [gpioNum, setGpioNum] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setGpioNum(e.target.value);
        setErrorMessage(''); // Reset khi người dùng nhập lại
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gpioNum) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin cấu hình GPIO!');
            return;
        }

        console.log('Configured GPIO:', gpioNum);
        onConfirm({ gpioNum }); // Gửi object để thống nhất với các config khác
    };

    return (
        <div className={cx('overlay')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Thông số GPIO</div>

                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('row')}>
                        <input
                            type="text"
                            className={cx('inputSmall')}
                            placeholder="GPIO Num"
                            name="gpioNum"
                            value={gpioNum}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Thông báo lỗi */}
                    {errorMessage && <p className={cx('errorText')}>{errorMessage}</p>}

                    <div className={cx('buttonBox')}>
                        <button type="button" onClick={onClose}>Hủy</button>
                        <button type="submit" className={cx('confirmButton')}>Xác nhận</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GPIOConfig;
