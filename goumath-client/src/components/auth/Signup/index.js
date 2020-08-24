import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { login, setUserRole, setUsername, setUserId } from '../../../utils/auth'
import { validateEmail, validatePhone, validatePassword } from '../../../utils/form-validation'
import { getBase64 } from '../../../utils/image-process'
import { Formik } from 'formik';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
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
        }
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


    render() {
        // if (isLogin()) {
        // 	this.props.history.push("/")
        // }
        const { t } = this.props
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">{t('profilePage:choose file')}</div>
            </div>
        );
        return (
            <>
                <div className="kt-grid kt-grid--ver kt-grid--root kt-page" style={{ height: "100%" }}>
                    <div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style={{ backgroundImage: "url(/assets/gou-imgs/bg-3.jpg)" }}>
                            <div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                                <div className="kt-login__container">
                                    <div className="kt-login__logo">
                                        <a href="#">
                                            <img src="/assets/gou-icons/logo-5.png" />
                                        </a>
                                    </div>
                                    <div>
                                        <div className="kt-login__head">
                                            <h3 className="kt-login__title">{t('sign up')}</h3>
                                            <div className="kt-login__desc">{t('enter your details to create your account')}:</div>
                                        </div>
                                        <Formik
                                            initialValues={{ fullname: '', username: '', email: '', phone: '', password: '', rpassword: '' }}

                                            onSubmit={(values, actions) => {
                                                actions.setSubmitting(false);

                                                let formData = new FormData()
                                                let fileList = this.state.fileList

                                                fileList.forEach(file => {
                                                    formData.append('uploadedFiles', file.originFileObj)
                                                })

                                                let { fullname, username, email, phone, password } = values
                                                axios({
                                                    url: `http://localhost:8081/auth/signup?fullname=${fullname}&username=${username}&email=${email}&phone=${phone}&password=${password}&`,
                                                    method: "POST",
                                                    data: formData,
                                                    processData: false,
                                                    contentType: false,
                                                }).then(res => {
                                                    let resData = res.data
                                                    if (resData.status) {
                                                        login(resData.token)
                                                        setUsername(resData.username)
                                                        setUserId(resData.userId)
                                                        setUserRole('admin')
                                                        window.location.href = '/'
                                                    } else {
                                                        
                                                        swal(t("common:error"), t(`form:${resData.message}`), "error")
                                                    }
                                                })
                                            }}

                                            validate={(values) => {
                                                const errors = {};
                                                const requiredError = t('form:required')
                                                const invalidPhoneNumber = t('form:invalid phone number')
                                                const invalidEmail = t('form:invalid email')
                                                const invalidPassword = t('form:invalidPassword')
                                                const notMatchPassword = t('form:notMatchPassword')

                                                if (!values.fullname) errors.fullname = requiredError;

                                                if (!values.username) errors.username = requiredError;

                                                if (!values.phone) errors.phone = requiredError;
                                                else if (!validatePhone(values.phone)) errors.phone = invalidPhoneNumber;

                                                if (!values.email) errors.email = requiredError;
                                                else if (!validateEmail(values.email)) errors.email = invalidEmail;

                                                if (!values.password) errors.password = requiredError
                                                else if (!validatePassword(values.password)) errors.password = invalidPassword

                                                if (!values.rpassword) errors.rpassword = requiredError
                                                else if (values.rpassword !== values.password) errors.rpassword = notMatchPassword

                                                return errors;
                                            }}
                                        >
                                            {props => (
                                                <form className="kt-form" onSubmit={props.handleSubmit}>
                                                    <div>
                                                        <Upload
                                                            beforeUpload={() => false}
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={this.handlePreview}
                                                            onChange={this.handleChange}
                                                        >
                                                            {fileList.length > 0 ? null : uploadButton}
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
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder={t('profilePage:fullname')}
                                                            name="fullname"
                                                            value={props.values.fullname}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.fullname && props.touched.fullname && <div className="gou-invalid-feedback">{props.errors.fullname}</div>}
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder={t('profilePage:username')}
                                                            name="username"
                                                            value={props.values.username}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.username && props.touched.username && <div className="gou-invalid-feedback">{props.errors.username}</div>}
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder={t('profilePage:email')}
                                                            name="email"
                                                            value={props.values.email}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.email && props.touched.email && <div className="gou-invalid-feedback">{props.errors.email}</div>}
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder={t('profilePage:phone')}
                                                            name="phone"
                                                            value={props.values.phone}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.phone && props.touched.phone && <div className="gou-invalid-feedback">{props.errors.phone}</div>}
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            placeholder={t('profilePage:password')}
                                                            name="password"
                                                            value={props.values.password}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.password && props.touched.password && <div className="gou-invalid-feedback">{props.errors.password}</div>}
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            placeholder={t('profilePage:confirm password')}
                                                            name="rpassword"
                                                            value={props.values.rpassword}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                    </div>
                                                    {props.errors.rpassword && props.touched.rpassword && <div className="gou-invalid-feedback">{props.errors.rpassword}</div>}
                                                    <div className="kt-login__actions">
                                                        <button type="submit" id="kt_login_signup_submit" className="btn btn-brand btn-elevate kt-login__btn-primary">{t('sign up')}</button>&nbsp;&nbsp;
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default withTranslation(['authPage', 'profilePage'])(SignupPage);