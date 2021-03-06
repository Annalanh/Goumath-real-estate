import React from 'react'
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
import swal from 'sweetalert';
import { Formik } from 'formik';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.css'
import { validateEmail, validatePhone, validatePassword } from '../../../utils/form-validation'
import { getBase64 } from '../../../utils/image-process'
import { provinces, districts } from '../../../utils/geoData'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            fullname: "",
            username: "",
            password: "",
            phone: "",
            email: "",
            dob: "",
            gender: "",
            address: "",
            role: "",
            is_register: false,
            register_district: '',
            register_province: '',
            districts1: [],
            fileList: [],
            changePasswordVisible: false
        }
    }

    componentDidMount() {
        axios({
            url: `http://localhost:8081/user/get-profile/${localStorage.getItem('username')}`,
            method: "GET",
        }).then(res => {
            let resData = res.data
            console.log(resData)
            if (resData.status) {
                let { userInfo } = resData
                console.log(userInfo)
                this.setState({
                    loading: false,
                    fullname: userInfo.fullname,
                    username: userInfo.username,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    dob: userInfo.dob ? userInfo.dob.split("T")[0] : '',
                    gender: userInfo.gender,
                    address: userInfo.address == "undefined"? "":userInfo.address,
                    role: userInfo.role,
                    is_register: userInfo.is_register,
                    register_province: userInfo.register_province,
                    register_district: userInfo.register_district,
                    districts1: districts[userInfo.register_province],
                    fileList: [{
                        uid: userInfo._id,
                        url: userInfo.avatar
                    }]
                })
            } else {
                console.log(resData.message)
            }
        })
    }

    handleCancelPreview = () => this.setState({ previewVisible: false });

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

    handleChangeFileList = ({ fileList }) => { this.setState({ fileList }); }

    showChangePassword = () => { this.setState({ changePasswordVisible: true }) }

    handleCancelChangePassword = () => { this.setState({ changePasswordVisible: false }); };

    handleChangeRegister = (e) => {
        let value = e.target.checked
        if (value) this.setState({ is_register: value })
        else this.setState({ is_register: value, register_province: '', register_district: '', district1: [] })
    }

    handleChangeProvince = (value) => {
        if (value) this.setState({ register_province: value, districts1: districts[value], register_district: '' })
        else this.setState({ register_province: '', districts1: [] })
    }

    handleChangeDistrict = (value) => {
        if (value) this.setState({ register_district: value })
        else this.setState({ register_district: '' })
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle, changePasswordVisible } = this.state;
        const { t } = this.props
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let {
            loading,
            fullname,
            username,
            phone,
            email,
            dob,
            gender,
            address,
            role,
            is_register,
            register_province,
            register_district,
            districts1,
        } = this.state

        let initialProfile = {
            fullname,
            username,
            phone,
            email,
            dob,
            gender,
            address,
            role
        }
        console.log(initialProfile)
        return (
            <>
                <MobileNavBar />
                <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
                        <AsideBar />

                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                            <NavBar />

                            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
                                {
                                    loading ? (<div>Loading</div>) : (
                                        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="kt-portlet" style={{ marginTop: "25px" }}>
                                                        <div className="kt-portlet__head">
                                                            <div className="kt-portlet__head-label">
                                                                <h3 className="kt-portlet__head-title">
                                                                    {t('profile')}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <Formik
                                                            enableReinitialize={true}
                                                            initialValues={initialProfile}
                                                            onSubmit={(values, actions) => {
                                                                actions.setSubmitting(false);

                                                                if ((is_register && register_district == '') || (is_register && register_province == '')) {
                                                                    swal(t("common:error"), t(`chua co dịa chi dang ky`), "error")
                                                                } else {
                                                                    let formData = new FormData()
                                                                    let fileList = this.state.fileList
                                                                    let fileListLength = fileList.length
                                                                    let defaultAvatar = false

                                                                    if (fileListLength === 0) {
                                                                        defaultAvatar = true
                                                                    } else {
                                                                        fileList.forEach(file => {
                                                                            formData.append('uploadedFiles', file.originFileObj)
                                                                        })
                                                                    }

                                                                    let { fullname, username, email, phone, dob, gender, address, role } = values
                                                                    let password = this.state.password

                                                                    let userId = localStorage.getItem('userId')
                                                                    axios({
                                                                        url: `http://localhost:8081/user/update-profile?fullname=${fullname}&username=${username}&email=${email}&phone=${phone}&password=${password}&dob=${dob}&gender=${gender}&address=${address}&role=${role}&userId=${userId}&defaultAvatar=${defaultAvatar}&register_province=${register_province}&register_district=${register_district}&is_register=${is_register}`,
                                                                        method: "POST",
                                                                        data: formData,
                                                                        processData: false,
                                                                        contentType: false,
                                                                    }).then(res => {
                                                                        let resData = res.data
                                                                        if (resData.status) {
                                                                            swal(t("common:success"), t(resData.message), "success")
                                                                                .then(value => {
                                                                                    if (value) {
                                                                                        localStorage.setItem('username', username)
                                                                                        window.location.reload()
                                                                                    }
                                                                                })

                                                                        } else {
                                                                            swal(t("common:error"), t(`common:${resData.message}`), "error")
                                                                        }
                                                                    })
                                                                }
                                                            }}
                                                            validate={(values) => {
                                                                const errors = {};

                                                                if (!values.fullname) {
                                                                    errors.fullname = 'Bắt buộc';
                                                                }

                                                                if (!values.username) {
                                                                    errors.username = "Bắt buộc";
                                                                }

                                                                if (!values.phone) {
                                                                    errors.phone = "Bắt buộc";
                                                                } else if (!validatePhone(values.phone)) {
                                                                    errors.phone = "Số điện thoại không hợp lệ!";
                                                                }

                                                                if (!values.email) {
                                                                    errors.email = 'Bắt buộc';
                                                                } else if (!validateEmail(values.email)) {
                                                                    errors.email = "Email không hợp lệ!";
                                                                }

                                                                return errors;
                                                            }}
                                                        >
                                                            {props => (
                                                                <form className="kt-form kt-form--label-right" onSubmit={props.handleSubmit}>
                                                                    <div className="kt-portlet__body">
                                                                        <div className='row'>
                                                                            <div className="col-12">
                                                                                <label>{t('avatar')}</label>
                                                                                <Upload
                                                                                    beforeUpload={() => false}
                                                                                    listType="picture-card"
                                                                                    fileList={fileList}
                                                                                    onPreview={this.handlePreview}
                                                                                    onChange={this.handleChangeFileList}
                                                                                >
                                                                                    {fileList.length > 0 ? null : uploadButton}
                                                                                </Upload>
                                                                                <Modal
                                                                                    visible={previewVisible}
                                                                                    title={previewTitle}
                                                                                    footer={null}
                                                                                    onCancel={this.handleCancelPreview}
                                                                                >
                                                                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                                                </Modal>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-lg-6">
                                                                                <label>{t('fullname')}</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="fullname"
                                                                                    className="form-control"
                                                                                    value={props.values.fullname}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                />
                                                                                {props.errors.fullname && props.touched.fullname && <div className="gou-invalid-feedback">{props.errors.fullname}</div>}
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <label>{t('username')}</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="username"
                                                                                    className="form-control"
                                                                                    value={props.values.username}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                />
                                                                                {props.errors.username && props.touched.username && <div className="gou-invalid-feedback">{props.errors.username}</div>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-lg-6">
                                                                                <label>{t('phone')}</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="phone"
                                                                                    className="form-control"
                                                                                    value={props.values.phone}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                />
                                                                                {props.errors.phone && props.touched.phone && <div className="gou-invalid-feedback">{props.errors.phone}</div>}
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <label>{t('email')}</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="email"
                                                                                    className="form-control"
                                                                                    value={props.values.email}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                />
                                                                                {props.errors.email && props.touched.email && <div className="gou-invalid-feedback">{props.errors.email}</div>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-lg-6">
                                                                                <label>{t('date of birth')}</label>
                                                                                <div>
                                                                                    <div className="input-group date">
                                                                                        <input
                                                                                            type="date"
                                                                                            name="dob"
                                                                                            className="form-control"
                                                                                            value={props.values.dob}
                                                                                            onChange={props.handleChange}
                                                                                            onBlur={props.handleBlur}
                                                                                        />
                                                                                        <div className="input-group-append">
                                                                                            <span className="input-group-text">
                                                                                                <i className="la la-calendar-check-o"></i>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <label>{t('gender')}</label>
                                                                                <div className="kt-radio-inline">
                                                                                    <label className="kt-radio">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="gender"
                                                                                            checked={props.values.gender === 'female'}
                                                                                            onChange={() => {
                                                                                                props.setFieldValue('gender', 'female')
                                                                                            }} /> Nữ
                                                                        <span></span>
                                                                                    </label>
                                                                                    <label className="kt-radio">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="gender"
                                                                                            checked={props.values.gender === 'male'}
                                                                                            onChange={() => {
                                                                                                props.setFieldValue('gender', 'male')
                                                                                            }} /> Nam
                                                                        <span></span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-lg-6">
                                                                                <label>{t('address')}</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="address"
                                                                                    className="form-control"
                                                                                    value={props.values.address}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                />
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <label>{t('role')}</label>
                                                                                <div className="kt-radio-inline">
                                                                                    <label className="kt-radio">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="role"
                                                                                            checked={props.values.role === 'agent'}
                                                                                            onChange={() => {
                                                                                                props.setFieldValue('role', 'agent')
                                                                                            }} /> Môi giới
                                                                        <span></span>
                                                                                    </label>
                                                                                    <label className="kt-radio">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="role"
                                                                                            checked={props.values.role === 'landholder'}
                                                                                            onChange={() => {
                                                                                                props.setFieldValue('role', 'landholder')
                                                                                            }} /> Chính chủ
                                                                        <span></span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-lg-1">
                                                                                <label className="kt-checkbox">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        name="register"
                                                                                        checked={is_register}
                                                                                        onChange={this.handleChangeRegister}
                                                                                    /> Register
                                                                        <span></span>
                                                                                </label>
                                                                            </div>
                                                                            {
                                                                                is_register && (<div className="col-lg-11">
                                                                                    <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }} placeholder="Province" defaultValue={register_province} onChange={this.handleChangeProvince}>
                                                                                        <Option value="">Province</Option>
                                                                                        {provinces && provinces.map(province => { return (<Option value={province}>{province}</Option>) })}
                                                                                    </Select>
                                                                                    <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }} placeholder="District" defaultValue={register_district} onChange={this.handleChangeDistrict}>
                                                                                        <Option value="">District</Option>
                                                                                        {districts1 && districts1.map(district => { return (<Option value={district}>{district}</Option>) })}
                                                                                    </Select>
                                                                                </div>)
                                                                            }

                                                                        </div>
                                                                        <a onClick={this.showChangePassword}>
                                                                            {t('change password')}
                                                                        </a>
                                                                    </div>

                                                                    <div className="kt-portlet__foot" style={{ display: "flex", justifyContent: "center" }}>
                                                                        <div className="kt-form__actions">
                                                                            <button type="submit" style={{ marginRight: "10px" }} className="btn gou-save-btn">{t('form:save')}</button>
                                                                            <button type="reset" className="btn gou-reset-btn" onClick={props.handleReset}>{t('form:reset')}</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            )}

                                                        </Formik>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>

                <Modal
                    title={t('change password')}
                    visible={changePasswordVisible}
                    footer={null}
                    onCancel={this.handleCancelChangePassword}
                >
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '' }}
                        enableReinitialize={true}

                        onSubmit={(values, { resetForm }) => {
                            let { oldPassword, newPassword } = values
                            axios({
                                url: 'http://localhost:8081/user/change-password',
                                method: 'POST',
                                data: { oldPassword, newPassword, username: localStorage.getItem('username') }
                            }).then(res => {
                                let resData = res.data
                                if (resData.status) {
                                    swal(t("common:success"), t(resData.message), "success")
                                        .then(value => {
                                            if (value) {
                                                resetForm({ values: { oldPassword: '', newPassword: '' } })
                                                this.setState({
                                                    password: resData.password,
                                                    changePasswordVisible: false,
                                                })
                                            }
                                        })
                                } else {
                                    swal(t("common:error"), t(`form:${resData.message}`), "error")
                                }
                            })
                        }}

                        validate={(values) => {
                            const errors = {};

                            if (!values.newPassword) errors.newPassword = t('form:required')
                            else if (!validatePassword(values.newPassword)) errors.newPassword = t('form:invalidPassword')

                            return errors;
                        }}
                    >
                        {props => (
                            <form className="kt-form" onSubmit={props.handleSubmit} autoComplete="off">
                                <div className="kt-portlet__body">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{t('current password')}:</label>
                                            <input
                                                type="password"
                                                name="oldPassword"
                                                className="form-control"
                                                value={props.values.oldPassword}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{t('new password')}:</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                className="form-control"
                                                value={props.values.newPassword}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.newPassword && props.touched.newPassword && <div className="gou-invalid-feedback">{props.errors.newPassword}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="kt-portlet__foot">
                                    <div className="kt-form__actions">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button type="submit" style={{ marginRight: "10px" }} className="btn gou-save-btn">{t('form:save')}</button>
                                                <button type="reset" className="btn gou-reset-btn" onClick={props.handleReset}>{t('form:reset')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>

                </Modal>
            </>
        )
    }
}

export default withTranslation(['profilePage', 'common', 'form'])(ProfilePage);