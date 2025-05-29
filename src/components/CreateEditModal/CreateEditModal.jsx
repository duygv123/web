import { useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal/Modal';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';
import ProtocolSelector from '@/components/ProtocolSelector/ProtocolSelector';
import OpcUaConfigModal from '../ProtocolConfigs/OpcUaConfig';
import ModbusRtuConfigModal from '@/components/ProtocolConfigs/ModbusRTUConfig';
import ModbusTCPConfigModal from '@/components/ProtocolConfigs/ModbusTCPConfig';
import GPIOConfig from '../ProtocolConfigs/GPIOConfig';
import ChevronDownSVG from '@/assets/icon/chevrondown.svg';
import style from './CreateEditModal.module.scss';
import { toastConfig } from '@/ultils/toastConfig';

const cx = classNames.bind(style);

function CreateEditModal({
    modalIsOpen,
    setModalIsOpen,
    handleCreateFucntion,
    formInitialValues,
    headerTitle,
    modalCreate = true,
    modalType,
    loading,
    loadingText,
}) {
    const [selectedProtocol, setSelectedProtocol] = useState('');
    const [showOpcUaPopup, setShowOpcUaPopup] = useState(false);
    const [modbusRTUModalOpen, setModbusRTUModalOpen] = useState(false);
    const [modbusTCPModalOpen, setModbusTCPModalOpen] = useState(false);
    const [gpioModalOpen, setGpioModalOpen] = useState(false);
    const [tagList, setTagList] = useState([]);

    
    const handleCreate = (values) => {
        // === TẠO TAG ===
        if (modalType === 3) {
            const requiredTagFields = [
                'tagName',
                'dataType',
                'address',
                'spanHigh',
                'spanLow',
                'initValue',
                'scanRate',
                'deadband'
            ];
    
            const isEmpty = requiredTagFields.some((field) => {
                const value = values[field];
                if (typeof value === 'string') return value.trim() === '';
                return value === undefined || value === null;
            });
    
            if (isEmpty) {
                toast.error('Vui lòng nhập đầy đủ các giá trị của Tag!', toastConfig);
                return;
            }
    
            // In ra console
            console.log('Giá trị tag vừa nhập:', values);
    
            // (Không bắt buộc) Lưu vào danh sách nếu bạn muốn
            setTagList((prevList) => [...prevList, values]);
    
            toast.success('Lưu Tag thành công!', toastConfig);
    
            if (setModalIsOpen) setModalIsOpen(false);
            return;
        }
    
        // === TẠO NODE ===
        if (modalType === 1) {
            const requiredFields = ['eonNodeName', 'eonNodeId'];
            const isEmpty = requiredFields.some((field) => !values[field] || values[field].trim() === '');
    
            if (isEmpty) {
                toast.error('Vui lòng nhập đầy đủ các giá trị của Node!', toastConfig);
                return;
            }
        }
    
        // === TẠO DEVICE ===
        if (modalType === 2) {
            const requiredFields = ['deviceName', 'deviceId', 'deviceProtocol', 'protocolId'];
            const isEmpty = requiredFields.some((field) => !values[field] || values[field].toString().trim() === '');
    
            if (isEmpty) {
                toast.error('Vui lòng nhập đầy đủ các giá trị của Device!', toastConfig);
                return;
            }
        }
    
        // Gửi dữ liệu tạo Node/Device kèm danh sách tag nếu có
        console.log('Final Submit Values:', values);
        handleCreateFucntion(values, tagList);
    };
    
    
    
    
    
    

    const handleProtocolChange = (protocol) => {
        setSelectedProtocol(protocol);
        if (protocol === 'OPC UA') setShowOpcUaPopup(true);
        else if (protocol === 'Modbus RTU') setModbusRTUModalOpen(true);
        else if (protocol === 'Modbus TCP') setModbusTCPModalOpen(true);
        else if (protocol === 'GPIO') setGpioModalOpen(true);
    };

    return (
        <>
            {/* Popup cấu hình protocol */}
            {showOpcUaPopup && <OpcUaConfigModal onClose={() => setShowOpcUaPopup(false)} />}
            {modbusRTUModalOpen && <ModbusRtuConfigModal onClose={() => setModbusRTUModalOpen(false)} />}
            {modbusTCPModalOpen && (
                <ModbusTCPConfigModal
                    onClose={() => setModbusTCPModalOpen(false)}
                    onConfirm={() => setModbusTCPModalOpen(false)}
                />
            )}
            {gpioModalOpen && (
                <Formik
                    initialValues={{ gpioNum: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                        setGpioModalOpen(false);
                    }}
                >
                    {({ handleSubmit }) => (
                        <GPIOConfig onClose={() => setGpioModalOpen(false)} onConfirm={handleSubmit} />
                    )}
                </Formik>
            )}

            {/* Modal chính */}
            <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} headerTitle={headerTitle}>
                <Formik initialValues={formInitialValues} onSubmit={handleCreate}>
                    <Form className={cx('form')}>
                        {loading && <LoadingSpiner loadingText={loadingText} />}

                        {!loading && (
                            <>
                                {modalType === 1 && <NodeForm cx={cx} setModalIsOpen={setModalIsOpen} />}
                                {modalType === 2 && (
                                    <DeviceForm
                                        cx={cx}
                                        setModalIsOpen={setModalIsOpen}
                                        onProtocolChange={handleProtocolChange}
                                    />
                                )}
                                {modalType === 3 && <TagForm cx={cx} setModalIsOpen={setModalIsOpen} />}
                            </>
                        )}
                    </Form>
                </Formik>
            </Modal>
        </>
    );
}

function NodeForm({ cx, setModalIsOpen }) {
    return (
        <>
            <div className={cx('formLeft')}>
                <p>Tên Node</p>
                <Field type="text" name="eonNodeName" placeholder="Tên node" />
            </div>
            <div className={cx('formRight')}>
                <p>Node Id</p>
                <Field type="text" name="eonNodeId" placeholder="Node Id" />
                <FormButtons cx={cx} setModalIsOpen={setModalIsOpen} />
            </div>
        </>
    );
}

function DeviceForm({ cx, setModalIsOpen, onProtocolChange }) {
    return (
        <>
            <div className={cx('formLeft')}>
                <p>Tên Device</p>
                <Field type="text" name="deviceName" placeholder="Tên Device" />
                <p className={cx('inputTitleBottom')}>Device Protocol</p>
                <Field
                    name="deviceProtocol" 
                    component={ProtocolSelector}
                    onProtocolChange={onProtocolChange}
                />
            </div>
            <div className={cx('formRight')}>
                <p>Device ID</p>
                <Field type="text" name="deviceId" placeholder="Device ID" />
                <p className={cx('inputTitleBottom')}>Protocol ID</p>
                <Field type="text" name="protocolId" placeholder="Protocol ID" />
                <FormButtons cx={cx} setModalIsOpen={setModalIsOpen} />
            </div>
        </>
    );
}


function TagForm({ cx, setModalIsOpen }) {
    return (
        <div className={cx('modalContent')}>
            {/* Basic Section */}
            <div className={cx('formLeft')}>
                <h4 className={cx('sectionTitle')}>Basic</h4>

                <div className={cx('inputGroup')}>
                    <p>Name</p>
                    <Field type="text" name="tagName" placeholder="Tên tag" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Data Type</p>
                    <Field type="text" name="dataType" placeholder="Loại dữ liệu" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Address</p>
                    <Field type="text" name="address" placeholder="Địa chỉ" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Span High</p>
                    <Field type="text" name="spanHigh" placeholder="Tầm trên" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Span Low</p>
                    <Field type="text" name="spanLow" placeholder="Tầm dưới" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Init Value</p>
                    <Field type="text" name="initValue" placeholder="Giá trị khởi tạo" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Scan Rate</p>
                    <Field type="text" name="scanRate" placeholder="Tần số quét" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Deadband</p>
                    <Field type="text" name="deadband" placeholder="Dải chết" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Description</p>
                    <Field as="textarea" name="description" placeholder="Mô tả" />
                </div>
            </div>

            {/* Advanced Section */}
            <div className={cx('formRight')}>
                <h4 className={cx('sectionTitle')}>Advanced</h4>

                <div className={cx('inputGroup')}>
                    <p>Use Scale Mode</p>
                    <div className={cx('checkboxContainer')}>
                        <Field type="checkbox" name="scaleMode" id="scaleMode" className={cx('checkbox')} />
                        <label htmlFor="scaleMode">Use Scale Mode</label>
                    </div>
                </div>

                <div className={cx('inputGroup')}>
                    <p>Scale</p>
                    <Field type="text" name="scale" placeholder="Hệ số nhân" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Offset</p>
                    <Field type="text" name="offset" placeholder="Hệ số cộng" />
                </div>

                <div className={cx('inputGroup')}>
                    <p>Clamp Options</p>
                    <div className={cx('clampGroup')}>
                        <div className={cx('checkboxContainer')}>
                            <Field type="checkbox" name="clampToHigh" id="clampToHigh" className={cx('checkbox')} />
                            <label htmlFor="clampToHigh">Clamp to High</label>
                        </div>
                        <div className={cx('checkboxContainer')}>
                            <Field type="checkbox" name="clampToLow" id="clampToLow" className={cx('checkbox')} />
                            <label htmlFor="clampToLow">Clamp to Low</label>
                        </div>
                        <div className={cx('checkboxContainer')}>
                            <Field type="checkbox" name="clampToZero" id="clampToZero" className={cx('checkbox')} />
                            <label htmlFor="clampToZero">Clamp to Zero</label>
                        </div>
                    </div>
                </div>

                <FormButtons cx={cx} setModalIsOpen={setModalIsOpen} />
            </div>
        </div>
    );
}



function FormButtons({ cx, setModalIsOpen }) {
    return (
        <div className={cx('buttonBox')}>
            <button className={cx('elevatedButton')} type="button" onClick={() => setModalIsOpen(false)}>
                Hủy
            </button>
            <button className={cx('okButton', 'filledButton')} type="submit">
                OK
            </button>
        </div>
    );
}

export default CreateEditModal;
