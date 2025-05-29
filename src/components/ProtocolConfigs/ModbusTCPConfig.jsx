// import React, { useState } from 'react';
// import style from './ModbusTCPConfig.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(style);

// function ModbusTCPConfig({ onClose, onConfirm }) {
//     const [formValues, setFormValues] = useState({
//         ipAddress: '',
//         port: '',
//         packetDelay: '',
//         unitNumber: '',
//     });

//     const handleChange = (e) => {
//         const { name, type, value } = e.target;
//         setFormValues((prev) => ({
//             ...prev,
//             [name]: type === 'number' ? value : value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Tránh reload trang
//         console.log('Configured Modbus TCP:', formValues);
//         onConfirm(formValues); // Gọi hàm xác nhận với giá trị đã nhập
//     };

//     return (
//         <div className={cx('overlay')}>
//             <div className={cx('container')}>
//                 <div className={cx('title')}>Thông số protocol Modbus TCP</div>

//                 <form className={cx('form')} onSubmit={handleSubmit}>
//                     <div className={cx('row')}>
//                         <input
//                             type="text"
//                             placeholder="IP Address"
//                             name="ipAddress"
//                             value={formValues.ipAddress}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Port"
//                             name="port"
//                             value={formValues.port}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Packet Delay (ms)"
//                             name="packetDelay"
//                             value={formValues.packetDelay}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Modbus ID"
//                             name="unitNumber"
//                             value={formValues.unitNumber}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className={cx('buttonBox')}>
//                         <button type="button" onClick={onClose}>Hủy</button>
//                         <button type="submit" className={cx('confirmButton')}>Xác nhận</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ModbusTCPConfig;
import React, { useState } from 'react';
import style from './ModbusTCPConfig.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function ModbusTCPConfig({ onClose, onConfirm }) {
    const [formValues, setFormValues] = useState({
        ipAddress: '',
        port: '',
        packetDelay: '',
        unitNumber: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage(''); // reset lỗi khi người dùng nhập lại
    };

    const validateForm = () => {
        const { ipAddress, port, packetDelay, unitNumber } = formValues;
        if (!ipAddress || !port || !packetDelay || !unitNumber) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin cấu hình Modbus TCP!');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log('Configured Modbus TCP:', formValues);
        onConfirm(formValues);
    };


    return (
        <div className={cx('overlay')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Thông số protocol Modbus TCP</div>

                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('row')}>
                        <input
                            type="text"
                            placeholder="IP Address"
                            name="ipAddress"
                            value={formValues.ipAddress}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Port"
                            name="port"
                            value={formValues.port}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Packet Delay (ms)"
                            name="packetDelay"
                            value={formValues.packetDelay}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Modbus ID"
                            name="unitNumber"
                            value={formValues.unitNumber}
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

export default ModbusTCPConfig;
