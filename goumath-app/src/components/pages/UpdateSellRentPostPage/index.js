import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
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

class UpdateSellRentPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false, 
      previewImage:'', 
      previewTitle:'', 
      fileList:[], 
      lat:'', 
      lon:'', 
      transaction_status:'', 
      publish_status:'', 
      province:'', 
      district:'', 
      ward:'', 
      street:'', 
      house_no:'',
      title:'',
      type:'',
      category:'',
      area:'',
      num_bedroom:'',
      num_bathroom:'',
      num_floor:'',
      direction:'', 
      price:'',
      price_unit:'',
      contact_name:'',
      contact_phone:'',
      contact_email:'',
      description:'',
      facade:'',
      built_year:'',
      business_usable:false,
      car_parking:false,
      fully_furnitured:false,
      posted_by_landholder:false
    };
  }

  componentDidMount() {
    let currentLocation = this.props.location.pathname
    let postId = currentLocation.substr(currentLocation.lastIndexOf('/') + 1)
    let userId = localStorage.getItem('userId')

    axios({
      url: `http://localhost:8081/post/detail`,
      method: "POST",
      data: { postId, userId }
    }).then(res => {
      let resData = res.data
      if (resData.status) {
        let postInfo = resData.post
        let fileList = []
        let uid = 0
        postInfo.list_img.forEach(img => {
          fileList.push({
            uid,
            url: img
          })
          uid+=1
        })
        this.setState({
          fileList, 
          lat:postInfo.lat, 
          lon:postInfo.lon, 
          transaction_status:postInfo.transaction_status, 
          publish_status:postInfo.publish_status, 
          province:postInfo.province, 
          district:postInfo.district, 
          ward:postInfo.ward, 
          street:postInfo.street, 
          house_no:postInfo.house_no,
          title:postInfo.title,
          type:postInfo.type,
          category:postInfo.category,
          area:postInfo.area,
          num_bedroom:postInfo.num_bedroom,
          num_bathroom:postInfo.num_bathroom,
          num_floor:postInfo.num_floor,
          direction:postInfo.direction, 
          price:postInfo.price,
          price_unit:postInfo.price_unit,
          contact_name:postInfo.contact_name,
          contact_phone:postInfo.contact_phone,
          contact_email:postInfo.contact_email,
          description:postInfo.description,
          facade:postInfo.facade,
          built_year:postInfo.built_year,
          business_usable:postInfo.business_usable,
          car_parking:postInfo.car_parking,
          fully_furnitured:postInfo.fully_furnitured,
          posted_by_landholder:postInfo.posted_by_landholder
        })
      } else {
        console.log(resData.message)
      }
    })
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

  handleChangeTransactionStatus = (value) => {
    this.setState({ transaction_status: value })
  }

  render() {
    const { t } = this.props 
    const pathname = this.props.location.pathname
    const postId = pathname.substr(pathname.lastIndexOf('/') + 1)
    
    const { 
      previewVisible, 
      previewImage, 
      fileList, 
      previewTitle, 
      lat, 
      lon, 
      transaction_status, 
      publish_status, 
      province, 
      district, 
      ward, 
      street, 
      house_no,
      title,
      type,
      category,
      area,
      num_bedroom,
      num_bathroom,
      num_floor,
      direction, 
      price,
      price_unit,
      contact_name,
      contact_phone,
      contact_email,
      description,
      facade,
      built_year,
      business_usable,
      car_parking,
      fully_furnitured,
      posted_by_landholder
    } = this.state;

    let initialProfile = {
      title,
      type,
      category,
      area,
      num_bedroom,
      num_bathroom,
      num_floor,
      direction, 
      price,
      price_unit,
      contact_name,
      contact_phone,
      contact_email,
      description,
      facade,
      built_year,
      business_usable,
      car_parking,
      fully_furnitured,
      posted_by_landholder
    }

    const uploadButton = (
      <div>
        <PlusOutlined />
      <div className="ant-upload-text">{t('common:upload')}</div>
      </div>
    );
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
                              {t("update post")}
					                </h3>
                          </div>
                          <div className="gou-status-container">
                            {
                              getUserRole() === 'admin' ? (
                                <Select className='gou-antd-select' value={publish_status} onChange={this.handleChangePublishStatus}>
                                  <Option value="pending">{t('common:pending')}</Option>
                                  <Option value="approved">{t('common:approved')}</Option>
                                  <Option value="refused">{t('common:refused')}</Option>
                                  <Option value="expired">{t('common:expired')}</Option>
                                </Select>
                              ) : (
                                  <Select className="gou-antd-select" value={publish_status} onChange={this.handleChangePublishStatus} disabled>
                                    <Option value="pending">{t('common:pending')}</Option>
                                    <Option value="approved">{t('common:approved')}</Option>
                                    <Option value="refused">{t('common:refused')}</Option>
                                    <Option value="expired">{t('common:expired')}</Option>
                                  </Select>
                                )
                            }
                            <div style={{ marginLeft: '10px' }}>
                              <Select className="gou-antd-select" style={{width: 150}} value={transaction_status} onChange={this.handleChangeTransactionStatus}>
                                <Option value="close">{t('common:close')}</Option>
                                <Option value="open">{t('common:open')}</Option>
                                <Option value="dealing">{t('common:dealing')}</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Formik
                          enableReinitialize={true}
                          initialValues={initialProfile}
                          onSubmit={(values, actions) => {
                            actions.setSubmitting(false);

                            let formData = new FormData()
                            let currentUploadedFiles = []
                            let { fileList, lat, lon, province, district, ward, street, house_no, transaction_status, publish_status } = this.state
                            
                            fileList.forEach(file => {
                              if(file.originFileObj) formData.append('uploadedFiles', file.originFileObj);
                              // else formData.append('currentUploadedFiles', file.url)
                              else currentUploadedFiles.push(file.url)
                            })

                            if(currentUploadedFiles.length == 0){
                              formData.append('currentUploadedFiles', 'empty')
                            }else{
                              formData.append('currentUploadedFiles', currentUploadedFiles.toString())
                            }

                            Object.keys(values).forEach(key => {
                              formData.append(key, values[key])
                            })

                            formData.append('transaction_status', transaction_status)
                            formData.append('publish_status', publish_status)
                            formData.append('lat', lat)
                            formData.append('lon', lon)
                            formData.append('province', province)
                            formData.append('district', district)
                            formData.append('ward', ward)
                            formData.append('street', street)
                            formData.append('house_no', house_no)

                            axios({
                                url: `http://localhost:8081/post/update/${postId}`,
                                method: "POST",
                                data: formData,
                                processData: false,
                                contentType: false,
                            }).then(res => {
                              let resData = res.data
                              if (resData.status) {
                                swal(t("common:success"), t(resData.message), "success")
                                  .then(value => {
                                    if(value) window.location.href = "/manage-posts"
                                  })
                              } else {
                                swal(t("common:error"), t(resData.message), "error")
                              }
                            })
                          }}
                          validate={(values) => {
                            const errors = {};

                            if (!values.title) errors.title = 'Required'
                            if (!values.type) errors.type = 'Required'
                            if (!values.category) errors.category = 'Required'
                            if (!values.area) errors.area = 'Required';
                            if (!values.num_bedroom) errors.num_bedroom = 'Required'
                            if (!values.num_bathroom) errors.num_bathroom = 'Required'
                            if (!values.num_floor) errors.num_floor = 'Required'
                            if (!values.price) errors.price = 'Required'
                            if (!values.contact_name) errors.contact_name = 'Required'
                            if (!values.contact_phone) errors.contact_phone = 'Required'
                            else if (!validatePhone(values.contact_phone)) errors.contact_phone = "Invalid number";
                            if (!values.contact_email) errors.contact_email = 'Required'
                            else if (!validateEmail(values.contact_email)) errors.contact_email = "Invalid email";
                            if (!values.price_unit) errors.price_unit = 'Required'

                            return errors;
                          }}
                        >
                          {props => (
                            <form className="kt-form" onSubmit={props.handleSubmit}>
                              <div className="kt-portlet__body">
                                <div className="kt-section kt-section--first">
                                  <h3 className="kt-section__title">1. {t('general info')}:</h3>
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
                                      <label className="col-lg-3 col-form-label">{t('common:title')}:</label>
                                      <div className="col-lg-6">
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="title"
                                          value={props.values.title}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                        />
                                        {props.errors.title && props.touched.title && <div className="gou-invalid-feedback">{props.errors.title}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:post type')}:</label>
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
                                            /> {t('common:sell')}
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
                                            /> {t('common:rent')}
                                            <span></span>
                                          </label>
                                          {props.errors.type && props.touched.type && <div className="gou-invalid-feedback">{props.errors.type}</div>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:category')}:</label>
                                      <div className="col-lg-6">
                                        <Select className="gou-antd-select" value={props.values.category} onChange={(value) => { props.setFieldValue('category', value) }} name="category">
                                          <Option value="apartment">{t('common:apartment')}</Option>
                                          <Option value="house">{t('common:house')}</Option>
                                          <Option value="mansion">{t('common:mansion')}</Option>
                                          <Option value="town-house">{t('common:town house')}</Option>
                                          <Option value="ground-project">{t('common:ground project')}</Option>
                                          <Option value="frontage-ground">{t('common:frontage ground')}</Option>
                                          <Option value="warehouse">{t('common:warehouse')}</Option>
                                          <Option value="hotel">{t('common:hotel')}</Option>
                                          <Option value="store">{t('common:store')}</Option>
                                          <Option value="boarding-house">{t('common:boarding house')}</Option>
                                          <Option value="resindental-land">{t('common:resindental land"')}</Option>
                                          <Option value="in-alley-house">{t('common:in alley house')}</Option>
                                          <Option value="shophouse">{t('common:shophouse')}</Option>
                                          <Option value="ground">{t('common:ground')}</Option>
                                          <Option value="office">{t('common:office')}</Option>
                                          <Option value="farmland">{t('common:farmland')}</Option>
                                        </Select>
                                        {props.errors.category && props.touched.category && <div className="gou-invalid-feedback">{props.errors.category}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:area')}(m2):</label>
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
                                        {props.errors.area && props.touched.area && <div className="gou-invalid-feedback">{props.errors.area}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:num bedroom')}:</label>
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
                                        {props.errors.num_bedroom && props.touched.num_bedroom && <div className="gou-invalid-feedback">{props.errors.num_bedroom}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:num bathroom')}:</label>
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
                                        {props.errors.num_bathroom && props.touched.num_bathroom && <div className="gou-invalid-feedback">{props.errors.num_bathroom}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:num floor')}:</label>
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
                                        {props.errors.num_floor && props.touched.num_floor && <div className="gou-invalid-feedback">{props.errors.num_floor}</div>}
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className="kt-section__title">2. {t('common:location')}:</h3>
                                  <div className="kt-section__body">
                                    <div className="form-group row">
                                      <div className="col-lg-4">
                                        <label>{t('common:province')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          // name="province"
                                          // value={props.values.province}
                                          // onChange={props.handleChange}
                                          // onBlur={props.handleBlur}
                                        />                                                        
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:district')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          // name="district"
                                          // value={props.values.district}
                                          // onChange={props.handleChange}
                                          // onBlur={props.handleBlur}
                                        />                                                        
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:ward')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          // name="ward"
                                          // value={props.values.ward}
                                          // onChange={props.handleChange}
                                          // onBlur={props.handleBlur}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <div className="col-lg-4">
                                        <label>{t('common:street')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          // name="street"
                                          // value={props.values.street}
                                          // onChange={props.handleChange}
                                          // onBlur={props.handleBlur}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:house no')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          // name="house_no"
                                          // value={props.values.house_no}
                                          // onChange={props.handleChange}
                                          // onBlur={props.handleBlur}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:direction')}:</label>
                                        <Select className="gou-antd-select" value={props.values.direction} onChange={(value) => { props.setFieldValue('direction', value) }} name="direction">
                                          <Option value="north">{t('common:north')}</Option>
                                          <Option value="south">{t('common:south')}</Option>
                                          <Option value="west">{t('common:west')}</Option>
                                          <Option value="east">{t('common:east')}</Option>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className="kt-section__title">3. {t('common:price')}:</h3>
                                  <div className="kt-section__body">
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:price')}:</label>
                                      <div className="col-lg-6">
                                        <input
                                          type="number"
                                          name="price"
                                          className="form-control"
                                          value={props.values.price}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                        />
                                        {props.errors.price && props.touched.price && <div className="gou-invalid-feedback">{props.errors.price}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:price unit')}:</label>
                                      <div className="col-lg-6">
                                        <Select className="gou-antd-select" value={props.values.price_unit} onChange={(value) => { props.setFieldValue('price_unit', value) }} name="price_unit">
                                          <Option value="vnd">VND</Option>
                                          <Option value="million/m2">{t('common:million')}/m2</Option>
                                          <Option value="deal">{t('common:deal')}</Option>
                                        </Select>
                                        {props.errors.price_unit && props.touched.price_unit && <div className="gou-invalid-feedback">{props.errors.price_unit}</div>}
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className="kt-section__title">4. {t('common:contact')}:</h3>
                                  <div className="kt-section__body">
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:contact name')}:</label>
                                      <div className="col-lg-6">
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="contact_name"
                                          value={props.values.contact_name}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                        />
                                        {props.errors.contact_name && props.touched.contact_name && <div className="gou-invalid-feedback">{props.errors.contact_name}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:contact phone')}:</label>
                                      <div className="col-lg-6">
                                        <input
                                          className="form-control"
                                          type="number"
                                          name="contact_phone"
                                          value={props.values.contact_phone}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                        />
                                        {props.errors.contact_phone && props.touched.contact_phone && <div className="gou-invalid-feedback">{props.errors.contact_phone}</div>}
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
                                        {props.errors.contact_email && props.touched.contact_email && <div className="gou-invalid-feedback">{props.errors.contact_email}</div>}
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className="kt-section__title">5. {t('common:description')}:</h3>
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
                                  <h3 className="kt-section__title">6. {t('common:other info')}:</h3>
                                  <div className="kt-section__body">
                                    <div className="form-group row">
                                      <div className="col-lg-6">
                                        <label>{t('common:facade')}(m):</label>
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
                                        <label>{t('common:built year')}:</label>
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
                                      <div className="col-lg-3">
                                        <label className="kt-checkbox">
                                          <input
                                            type="checkbox"
                                            name="business_usable"
                                            checked={props.values.business_usable == true}
                                            onChange={() => {
                                              props.setFieldValue('business_usable', true)
                                            }}
                                          /> {t('common:business usable')}
                                                                <span></span>
                                        </label>
                                      </div>
                                      <div className="col-lg-3">
                                        <label className="kt-checkbox">
                                          <input
                                            type="checkbox"
                                            name="car_parking"
                                            checked={props.values.car_parking == true}
                                            onChange={() => {
                                              props.setFieldValue('car_parking', true)
                                            }}
                                          /> {t('common:car parking')}
                                                                <span></span>
                                        </label>
                                      </div>
                                      <div className="col-lg-3">
                                        <label className="kt-checkbox">
                                          <input
                                            type="checkbox"
                                            name="fully_furnitured"
                                            checked={props.values.fully_furnitured == true}
                                            onChange={() => {
                                              props.setFieldValue('fully_furnitured', true)
                                            }}
                                          /> {t('common:fully furnitured')}
                                                                <span></span>
                                        </label>
                                      </div>
                                      <div className="col-lg-3">
                                        <label className="kt-checkbox">
                                          <input
                                            type="checkbox"
                                            name="posted_by_landholder"
                                            checked={props.values.posted_by_landholder == true}
                                            onChange={() => {
                                              props.setFieldValue('posted_by_landholder', true)
                                            }}
                                          /> {t('common:posted by landholder')}
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
                                      <button type="submit" className="btn btn-info">{t('update post')}</button>
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

      </>
    )
  }
}

export default withTranslation(['updatePostPage', 'common'])(UpdateSellRentPostPage);
