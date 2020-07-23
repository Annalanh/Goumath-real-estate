import React from 'react';
import { Formik } from 'formik';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import { validateEmail, validatePhone } from '../../../utils/form-validation'
import { getUserRole } from '../../../utils/auth'

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class NewPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ],
            publish_status: 'pending'
        };
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    }

    handleChangePublishStatus = (value) => {
        this.setState({ publish_status: value })
    }

    render() {
        let initialProfile = {
            type: '',
            category: '',
            area: '',
            num_bedroom: '',
            num_floor: '',
            num_bathroom: '',
            price: '',
            price_unit: '',
            contact_name: '',
            contact_phone: '',
            contact_email: '',
            description: '',
            facade: '',
            built_year: '',
            car_parking: false,
            business_usable: false,
            fully_furnitured: false
        }
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="kt-portlet" style={{ marginTop: "25px" }}>
                            <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                        Đăng tin mới
					                </h3>
                                </div>
                                <div className="gou-publish-status-container">
                                    {
                                        getUserRole() === 'admin' ? (
                                            <Select defaultValue={this.state.publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus}>
                                                <Option value="pending">Chờ duyệt</Option>
                                                <Option value="approved">Đã duyệt</Option>
                                                <Option value="refused">Bị từ chối</Option>
                                                <Option value="expired">Hết hạn</Option>
                                            </Select>
                                        ) : (
                                            <Select defaultValue={this.state.publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus} disabled>
                                                <Option value="pending">Chờ duyệt</Option>
                                                <Option value="approved">Đã duyệt</Option>
                                                <Option value="refused">Bị từ chối</Option>
                                                <Option value="expired">Hết hạn</Option>
                                            </Select>
                                        )
                                    }

                                </div>
                            </div>
                            <Formik
                                initialValues={initialProfile}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(this.state.publish_status, null, 2));
                                        actions.setSubmitting(false);
                                    }, 1000);
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    return errors;
                                }}
                            >
                                {props => (
                                    <form className="kt-form" onSubmit={props.handleSubmit}>
                                        <div className="kt-portlet__body">
                                            <div className="kt-section kt-section--first">
                                                <h3 className="kt-section__title">1. Thông tin cơ bản:</h3>
                                                <div className="kt-section__body">
                                                    <div>
                                                        <Upload
                                                            beforeUpload={() => false}
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={this.handlePreview}
                                                            onChange={this.handleChange}
                                                        >
                                                            {fileList.length >= 8 ? null : uploadButton}
                                                        </Upload>
                                                        <Modal
                                                            visible={previewVisible}
                                                            title={previewTitle}
                                                            footer={null}
                                                            onCancel={this.handleCancel}
                                                        >
                                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                        </Modal>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Loại tin:</label>
                                                        <div className="col-lg-6">
                                                            <div className="kt-radio-inline">
                                                                <label className="kt-radio">
                                                                    <input
                                                                        type="radio"
                                                                        name="type"
                                                                        checked={props.values.type == 'sell'}
                                                                        onChange={() => {
                                                                            props.setFieldValue('type', 'sell')
                                                                        }}
                                                                    /> Bán
                                                                <span></span>
                                                                </label>
                                                                <label className="kt-radio">
                                                                    <input
                                                                        type="radio"
                                                                        name="type"
                                                                        checked={props.values.type == 'rent'}
                                                                        onChange={() => {
                                                                            props.setFieldValue('type', 'rent')
                                                                        }}
                                                                    /> Thuê
                                                                <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Loại nhà:</label>
                                                        <div className="col-lg-6">
                                                            <Select defaultValue="" onChange={(value) => { props.setFieldValue('category', value) }} name="category">
                                                                <Option value="apartment">Chung cư</Option>
                                                                <Option value="house">Nhà riêng</Option>
                                                                <Option value="mansion">Biệt thự, liền kề</Option>
                                                                <Option value="town-house">Nhà mặt phố</Option>
                                                                <Option value="ground-project">Đất nền dự án</Option>
                                                                <Option value="frontage-ground">Đất trang trại</Option>
                                                                <Option value="warehouse">Kho, nhà xưởng</Option>
                                                                <Option value="hotel">Khách sạn</Option>
                                                                <Option value="store">Cửa hàng, kiot</Option>
                                                                <Option value="boarding-house">Phòng trọ, nhà trọ</Option>
                                                                <Option value="resindental-land">Thổ cư, dất ở</Option>
                                                                <Option value="in-alley-house">Nhà hẻm ngõ</Option>
                                                                <Option value="shophouse">Nhà mặt phố thương mại</Option>
                                                                <Option value="ground">Mặt bằng</Option>
                                                                <Option value="office">Văn phòng</Option>
                                                                <Option value="farmland">Đất nông nghiệp</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Diện tích(m2):</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="area"
                                                                value={props.values.area}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                                min="0"
                                                            />
                                                            <span className="form-text text-muted">We'll never share your email with anyone else</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Số phòng ngủ:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="num_bedroom"
                                                                value={props.values.num_bedroom}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                                min="0"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Số phòng tắm:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="num_bathroom"
                                                                value={props.values.num_bathroom}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                                min="0"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Số tầng:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="num_floor"
                                                                value={props.values.num_floor}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                                min="0"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="kt-section__title">2. Vị trí:</h3>
                                                <div className="kt-section__body">
                                                    <div className="form-group row">
                                                        <div className="col-lg-4">
                                                            <label>Tỉnh/Thành phố:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label>Quận/Huyện:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label>Phường/Xã:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-lg-4">
                                                            <label>Đường:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label>Số nhà, ngõ:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label>Hướng nhà:</label>
                                                            <Select defaultValue="all" style={{ width: 200, display: 'block' }}>
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="kt-section__title">3. Giá:</h3>
                                                <div className="kt-section__body">
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Giá:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                className="form-control"
                                                                value={props.values.price}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Đơn vị:</label>
                                                        <div className="col-lg-6">
                                                            <Select defaultValue="" onChange={(value) => { props.setFieldValue('price_unit', value) }} name="price_unit">
                                                                <Option value="vnd">VND</Option>
                                                                <Option value="million/m2">triệu/m2</Option>
                                                                <Option value="deal">Thoả thuận</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="kt-section__title">4. Liên hệ:</h3>
                                                <div className="kt-section__body">
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Tên người liên lạc:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="contact_name"
                                                                value={props.values.contact_name}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Số điện thoại:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="contact_phone"
                                                                value={props.values.contact_phone}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-lg-3 col-form-label">Email:</label>
                                                        <div className="col-lg-6">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="contact_email"
                                                                value={props.values.contact_email}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="kt-section__title">5. Mô tả chi tiết:</h3>
                                                <div className="kt-section__body">
                                                    <div className="form-group row">
                                                        <textarea
                                                            className="form-control"
                                                            id="exampleTextarea"
                                                            rows="10"
                                                            name="description"
                                                            value={props.values.description}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <h3 className="kt-section__title">6. Thông tin khác:</h3>
                                                <div className="kt-section__body">
                                                    <div className="form-group row">
                                                        <div className="col-lg-6">
                                                            <label>Mặt tiền(m):</label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="facade"
                                                                value={props.values.facade}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label>Năm xây dựng:</label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="built_year"
                                                                value={props.values.built_year}
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-lg-4">
                                                            <label className="kt-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="business_usable"
                                                                    checked={props.values.business_usable == true}
                                                                    onChange={() => {
                                                                        props.setFieldValue('business_usable', true)
                                                                    }}
                                                                /> Nhà có thể dùng để kinh doanh
                                                                <span></span>
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="kt-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="car_parking"
                                                                    checked={props.values.car_parking == true}
                                                                    onChange={() => {
                                                                        props.setFieldValue('car_parking', true)
                                                                    }}
                                                                /> Có chỗ đỗ oto
                                                                <span></span>
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="kt-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="fully_furnitured"
                                                                    checked={props.values.fully_furnitured == true}
                                                                    onChange={() => {
                                                                        props.setFieldValue('fully_furnitured', true)
                                                                    }}
                                                                /> Nội thất đầy đủ
                                                                <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="kt-portlet__foot">
                                            <div className="kt-form__actions">
                                                <div className="row">
                                                    <div className="col-lg-3"></div>
                                                    <div className="col-lg-6">
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                        <button type="reset" className="btn btn-secondary">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default NewPostPage;
