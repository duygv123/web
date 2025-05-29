import styles from './ModbusRTUConfig.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ModbusRtuConfigModal({ onClose }) {
    const [formValues, setFormValues] = useState({
        useAscii: true,
        unitNumber: '',
        packetDelay: '',
        baudRate: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrorMessage(''); // Reset lỗi khi người dùng nhập lại
    };

    const validateForm = () => {
        const { unitNumber, packetDelay, baudRate } = formValues;
        if (!unitNumber || !packetDelay || !baudRate) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin cấu hình Modbus RTU!');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log('Configured Modbus RTU:', formValues);
        onClose(formValues); // Gửi data về component cha
    };

    return (
        <div className={cx('overlay')}>
            <div className={cx('container')}>
                <p className={cx('title')}>Thông số protocol Modbus RTU</p>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('row')}>
                        <label className={cx('checkboxLabel')}>
                            <input
                                type="checkbox"
                                name="useAscii"
                                checked={formValues.useAscii}
                                onChange={handleChange}
                            />
                            Use ASCII
                        </label>
                        <input
                            type="number"
                            name="unitNumber"
                            placeholder="Modbus ID"
                            value={formValues.unitNumber}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="packetDelay"
                            placeholder="Packet Delay (ms)"
                            value={formValues.packetDelay}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="baudRate"
                            placeholder="Baudrate"
                            value={formValues.baudRate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Thông báo lỗi */}
                    {errorMessage && <p className={cx('errorText')}>{errorMessage}</p>}

                    <div className={cx('buttonBox')}>
                        <button type="button" onClick={() => onClose()}>
                            Hủy
                        </button>
                        <button type="submit" className={cx('confirmButton')}>
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModbusRtuConfigModal;
