import React from 'react'
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import swal from 'sweetalert';
import { Formik } from 'formik';
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { login, isLogin, setUserRole, setUsername } from '../../../utils/auth'
import './style.css'
import { validateEmail, validatePhone, validatePassword } from '../../../utils/form-validation'
import { getBase64 } from '../../../utils/image-process'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: "",
            username: "",
            password: "",
            phone: "",
            email: "",
            dob: "",
            gender: "",
            address: "",
            role: "",
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
                    fullname: userInfo.fullname,
                    username: userInfo.username,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    dob: userInfo.dob ? userInfo.dob : '',
                    gender: userInfo.gender,
                    address: userInfo.address,
                    role: userInfo.role,
                    fileList: [{
                        uid: userInfo._id,
                        url: userInfo.avatar
                    }]
                }, () => {
                    console.log('hiihi')
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

    handleChangeFileList = ({ fileList }) => {
        this.setState({ fileList });
    }

    showChangePassword = () => {
        this.setState({
            changePasswordVisible: true
        })
    }

    handleCancelChangePassword = () => {
        this.setState({
            changePasswordVisible: false,
        });
    };

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
            fullname,
            username,
            phone,
            email,
            dob,
            gender,
            address,
            role
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
        return (
            <>
                <MobileNavBar />
                <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
                        <AsideBar />

                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                            <NavBar />

                            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
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

                                                        let formData = new FormData()
                                                        let fileList = this.state.fileList
                                                        let fileListLength = fileList.length
                                                        let defaultAvatar = false

                                                        if (fileListLength == 0) {
                                                            defaultAvatar = true
                                                        } else {
                                                            fileList.forEach(file => {
                                                                formData.append('uploadedFiles', file.originFileObj)
                                                            })
                                                        }

                                                        let { fullname, username, email, phone, dob, gender, address, role } = values
                                                        let password = this.state.password

                                                        console.log(fileList)
                                                        let userId = localStorage.getItem('userId')
                                                        axios({
                                                            url: `http://localhost:8081/user/update-profile?fullname=${fullname}&username=${username}&email=${email}&phone=${phone}&password=${password}&dob=${dob}&gender=${gender}&address=${address}&role=${role}&userId=${userId}&defaultAvatar=${defaultAvatar}`,
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
                                                                                    checked={props.values.gender == 'female'}
                                                                                    onChange={() => {
                                                                                        props.setFieldValue('gender', 'female')
                                                                                    }} /> Nữ
                                                                        <span></span>
                                                                            </label>
                                                                            <label className="kt-radio">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="gender"
                                                                                    checked={props.values.gender == 'male'}
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
                                                                                    checked={props.values.role == 'agent'}
                                                                                    onChange={() => {
                                                                                        props.setFieldValue('role', 'agent')
                                                                                    }} /> Môi giới
                                                                        <span></span>
                                                                            </label>
                                                                            <label className="kt-radio">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="role"
                                                                                    checked={props.values.role == 'landholder'}
                                                                                    onChange={() => {
                                                                                        props.setFieldValue('role', 'landholder')
                                                                                    }} /> Chính chủ
                                                                        <span></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <a onClick={this.showChangePassword}>
                                                                    {t('change password')}
                                                                </a>
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

                                            </div>
                                        </div>
                                    </div>
                                </div>
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

                        onSubmit={(values, { resetForm, setSubmitting }) => {
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