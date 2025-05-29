import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import style from './ProtocolSelector.module.scss';
import chevronIcon from '@/assets/icon/chevrondown.svg';

const cx = classNames.bind(style);

function ProtocolSelector({ field, form, onProtocolChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const protocols = ['OPC UA', 'Modbus RTU', 'Modbus TCP', 'FINS', 'GPIO'];
    const dropdownRef = useRef(null); // Tạo ref để tham chiếu đến dropdown

    const handleSelect = (value) => {
        form.setFieldValue(field.name, value); // Cập nhật giá trị formik
        setIsOpen(false);

        // Gọi callback nếu có
        if (onProtocolChange) {
            onProtocolChange(value);
        }
    };

    // Đóng dropdown khi nhấn ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('dropdownContainer')} ref={dropdownRef}>
            <div className={cx('inputWithIcon')} onClick={() => setIsOpen(!isOpen)}>
                <input
                    type="text"
                    readOnly
                    value={field.value}
                    placeholder="Protocol"
                    {...field}
                />
                <img src={chevronIcon} alt="dropdown icon" />
            </div>

            {isOpen && (
                <div className={cx('dropdown')}>
                    {protocols.map((item) => (
                        <div
                            key={item}
                            className={cx('dropdownItem')}
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProtocolSelector;