import styles from './OpcUaConfig.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

const SECURITY_MODES = [
    { label: 'Security Mode', value: '' },
    { label: 'None', value: '0' },
    { label: 'Sign', value: '1' },
    { label: 'SignAndEncrypt', value: '2' },
];

const AUTH_SETTINGS = [
    { label: 'Authentication', value: '' },
    { label: 'Anonymous', value: '0' },
    { label: 'UsernamePassword', value: '1' },
    { label: 'Certificate', value: '2' },
];

const CERTIFICATES = [
    { label: 'Select Certificate', value: '' },
    { label: 'Cert1', value: 'Cert1' },
    { label: 'Cert2', value: 'Cert2' },
];

const PRIVATE_KEYS = [
    { label: 'Select Private Key', value: '' },
    { label: 'Key1', value: 'Key1' },
    { label: 'Key2', value: 'Key2' },
];

function OpcUaConfigModal({ onClose }) {
    const [formValues, setFormValues] = useState({
        address: '',
        port: '',
        securityMode: '',
        authenticationSettings: '',
        username: '',
        password: '',
        certificate: '',
        privateKey: '',
        subscribeCyclicRate: '',
        cyclic: false,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrorMessage(''); // Reset lỗi khi người dùng sửa input
    };

    const validateForm = () => {
        const {
            address,
            port,
            securityMode,
            authenticationSettings,
            username,
            password,
            certificate,
            privateKey,
        } = formValues;

        if (!address || !port || !securityMode || !authenticationSettings) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin cấu hình OPC UA!');
            return false;
        }

        if (authenticationSettings === '1' && (!username || !password)) {
            setErrorMessage('Vui lòng nhập Username và Password!');
            return false;
        }

        if (authenticationSettings === '2' && (!certificate || !privateKey)) {
            setErrorMessage('Vui lòng chọn Certificate và Private Key!');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Configured OPC UA:', formValues);
        onClose(formValues); // Truyền dữ liệu về component cha
    };

    const renderSelectOptions = (options) =>
        options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ));

    return (
        <div className={cx('overlay')}>
            <div className={cx('container')}>
                <p className={cx('title')}>Thông số protocol OPC UA</p>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('row')}>
                        <input
                            type="text"
                            name="address"
                            placeholder="Device Address"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="port"
                            placeholder="Port"
                            value={formValues.port}
                            onChange={handleChange}
                        />
                        <select name="securityMode" value={formValues.securityMode} onChange={handleChange}>
                            {renderSelectOptions(SECURITY_MODES)}
                        </select>
                        <select
                            name="authenticationSettings"
                            value={formValues.authenticationSettings}
                            onChange={handleChange}
                        >
                            {renderSelectOptions(AUTH_SETTINGS)}
                        </select>
                    </div>

                    <div className={cx('row')}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={cx('row')}>
                        <select name="certificate" value={formValues.certificate} onChange={handleChange}>
                            {renderSelectOptions(CERTIFICATES)}
                        </select>
                        <select name="privateKey" value={formValues.privateKey} onChange={handleChange}>
                            {renderSelectOptions(PRIVATE_KEYS)}
                        </select>
                    </div>

                    <div className={cx('row')}>
                        <label className={cx('checkboxLabel')}>
                            <input
                                type="checkbox"
                                name="cyclic"
                                checked={formValues.cyclic}
                                onChange={handleChange}
                            />
                            Cyclic rate of subscribing data changes (ms)
                        </label>
                        <input
                            type="number"
                            name="subscribeCyclicRate"
                            placeholder="(ms)"
                            value={formValues.subscribeCyclicRate}
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

export default OpcUaConfigModal;
