import React from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Upload, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

class NewSellRentPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      publish_status: 'pending',
      transaction_status: 'open',
      lat: '21.0289196',
      lon: '105.8358087',
      province: '',
      district: '',
      ward: '',
      street: '',
      house_no: '',
      disabled: false
    };
  }

  componentDidMount = () => {
    let { lat, lon } = this.state
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [Number(lon), Number(lat)],
      zoom: 14,
    });

    this.marker = new mapboxgl.Marker().setLngLat([Number(lon), Number(lat)]).addTo(this.map);

    this.map.on('click', (e) => {
      let lat = e.lngLat.lat
      let lon = e.lngLat.lng
      this.setState({ lat, lon }, () => {
        this.marker.remove()
        this.marker = new mapboxgl.Marker().setLngLat([Number(lon), Number(lat)]).addTo(this.map);
        axios({
          url: `https://apis.wemap.asia/we-tools/pip/${lon}/${lat}?key=vpstPRxkBBTLaZkOaCfAHlqXtCR`,
          method: 'GET'
        }).then(res => {
          let resData = res.data
          this.setState({
            province: resData.region[0].name || '',
            district: resData.county[0].name || '',
            ward: resData.locality[0].name || ''
          })
        })
      })
    })

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ',
        mapboxgl: mapboxgl,
        marker: false
      })
    );
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

  handleChangeProvince = (e) => {
    this.setState({ province: e.target.value })
  }

  handleChangeDistrict = (e) => {
    this.setState({ district: e.target.value })
  }

  handleChangeWard = (e) => {
    this.setState({ ward: e.target.value })
  }

  handleChangeStreet = (e) => {
    this.setState({ street: e.target.value })
  }

  handleChangeHouseNo = (e) => {
    this.setState({ house_no: e.target.value })
  }

  handleChangePriceUnit = (value) => {
    if (value === "deal") this.setState({ disabled: true })
    else this.setState({ disabled: false })
  }

  render() {
    const { t } = this.props
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
      disabled
    } = this.state;
    let initialProfile = {
      title: '',
      type: 'sell',
      category: '',
      area: '',
      num_bedroom: '',
      num_bathroom: '',
      num_floor: '',
      direction: '',
      price: '',
      price_unit: '',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      description: '',
      facade: '',
      built_year: '',
      business_usable: false,
      car_parking: false,
      fully_furnitured: false,
      posted_by_landholder: false
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
                              {t("upload new post")}
                            </h3>
                          </div>
                          <div className="gou-status-container">
                            {
                              getUserRole() === 'admin' ? (
                                <Select className='gou-antd-select' defaultValue={this.state.publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus}>
                                  <Option value="pending">{t('common:pending')}</Option>
                                  <Option value="approved">{t('common:approved')}</Option>
                                  <Option value="refused">{t('common:refused')}</Option>
                                  <Option value="expired">{t('common:expired')}</Option>
                                </Select>
                              ) : (
                                  <Select className='gou-antd-select' defaultValue={this.state.publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus} disabled>
                                    <Option value="pending">{t('common:pending')}</Option>
                                    <Option value="approved">{t('common:approved')}</Option>
                                    <Option value="refused">{t('common:refused')}</Option>
                                    <Option value="expired">{t('common:expired')}</Option>
                                  </Select>
                                )
                            }
                            <div style={{ marginLeft: '10px' }}>
                              <Select className='gou-antd-select' defaultValue={this.state.transaction_status} style={{ width: 150 }} onChange={this.handleChangeTransactionStatus}>
                                <Option value="close">{t('common:close')}</Option>
                                <Option value="open">{t('common:open')}</Option>
                                <Option value="dealing">{t('common:dealing')}</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Formik
                          initialValues={initialProfile}
                          onSubmit={(values, actions) => {
                            actions.setSubmitting(false);

                            let formData = new FormData()

                            fileList.forEach(file => {
                              formData.append('uploadedFiles', file.originFileObj)
                            })

                            Object.keys(values).forEach(key => {
                              formData.append(key, values[key])
                            })

                            formData.append('author', localStorage.getItem('userId'))
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
                              url: `http://localhost:8081/post/create`,
                              method: "POST",
                              data: formData,
                              processData: false,
                              contentType: false,
                            }).then(res => {
                              let resData = res.data
                              if (resData.status) {
                                swal(t("common:success"), t(resData.message), "success")
                                  .then(value => {
                                    if (value) window.location.href = "/manage-posts"
                                  })
                              } else {
                                swal(t("common:error"), t(resData.message), "error")
                              }
                            })
                          }}
                          validate={(values) => {
                            const errors = {};
                            const requiredError = t('form:required')
                            const invalidPhoneNumber = t('form:invalid phone number')
                            const invalidEmail = t('form:invalid email')
                            console.log(values)

                            if (!values.title) errors.title = requiredError
                            if (!values.type) errors.type = requiredError
                            if (!values.category) errors.category = requiredError
                            if (!values.area) errors.area = requiredError;
                            if (!values.num_bedroom) errors.num_bedroom = requiredError
                            if (!values.num_bathroom) errors.num_bathroom = requiredError
                            if (!values.num_floor) errors.num_floor = requiredError
                            // if (!values.price && values.price != 0) errors.price = requiredError
                            if (!values.contact_name) errors.contact_name = requiredError
                            if (!values.contact_phone) errors.contact_phone = requiredError
                            else if (!validatePhone(values.contact_phone)) errors.contact_phone = invalidPhoneNumber;
                            if (!values.contact_email) errors.contact_email = requiredError
                            else if (!validateEmail(values.contact_email)) errors.contact_email = invalidEmail;
                            if (!values.price_unit) errors.price_unit = requiredError

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
                                        {props.errors.title && props.touched.title && <div className="gou-invalid-feedback">{t(props.errors.title)}</div>}
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
                                          {props.errors.type && props.touched.type && <div className="gou-invalid-feedback">{t(props.errors.type)}</div>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:category')}:</label>
                                      <div className="col-lg-6">
                                        <Select className='gou-antd-select' value={props.values.category} onChange={(value) => { props.setFieldValue('category', value) }} name="category">
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
                                        {props.errors.category && props.touched.category && <div className="gou-invalid-feedback">{t(props.errors.category)}</div>}
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
                                        {props.errors.area && props.touched.area && <div className="gou-invalid-feedback">{t(props.errors.area)}</div>}
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
                                        {props.errors.num_bedroom && props.touched.num_bedroom && <div className="gou-invalid-feedback">{t(props.errors.num_bedroom)}</div>}
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
                                        {props.errors.num_bathroom && props.touched.num_bathroom && <div className="gou-invalid-feedback">{t(props.errors.num_bathroom)}</div>}
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
                                        {props.errors.num_floor && props.touched.num_floor && <div className="gou-invalid-feedback">{t(props.errors.num_floor)}</div>}
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className="kt-section__title">2. {t('common:location')}:</h3>
                                  <div className="kt-section__body">
                                    <div id="gou-map-container">
                                      <div id="map" />
                                    </div>
                                    <div className="form-group row">
                                      <div className="col-lg-4">
                                        <label>{t('common:province')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          onChange={this.handleChangeProvince}
                                          value={province}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:district')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          onChange={this.handleChangeDistrict}
                                          value={district}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:ward')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          onChange={this.handleChangeWard}
                                          value={ward}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <div className="col-lg-4">
                                        <label>{t('common:street')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          onChange={this.handleChangeStreet}
                                          value={street}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:house no')}:</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          onChange={this.handleChangeHouseNo}
                                          value={house_no}
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label>{t('common:direction')}:</label>
                                        <Select className='gou-antd-select' value={props.values.direction} onChange={(value) => { props.setFieldValue('direction', value) }} name="direction">
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
                                          disabled={disabled}
                                        />
                                        {props.errors.price && props.touched.price && <div className="gou-invalid-feedback">{t(props.errors.price)}</div>}
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-lg-3 col-form-label">{t('common:price unit')}:</label>
                                      <div className="col-lg-6">
                                        <Select className='gou-antd-select' value={props.values.price_unit} onChange={(value) => { props.setFieldValue('price_unit', value); if (value === "deal") { props.setFieldValue('price', 0) }; this.handleChangePriceUnit(value) }} name="price_unit">
                                          <Option value="vnd">VND</Option>
                                          <Option value="million/m2">{t('common:million')}/m2</Option>
                                          <Option value="deal">{t('common:deal')}</Option>
                                        </Select>
                                        {props.errors.price_unit && props.touched.price_unit && <div className="gou-invalid-feedback">{t(props.errors.price_unit)}</div>}
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
                                        {props.errors.contact_name && props.touched.contact_name && <div className="gou-invalid-feedback">{t(props.errors.contact_name)}</div>}
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
                                        {props.errors.contact_phone && props.touched.contact_phone && <div className="gou-invalid-feedback">{t(props.errors.contact_phone)}</div>}
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
                                        {props.errors.contact_email && props.touched.contact_email && <div className="gou-invalid-feedback">{t(props.errors.contact_email)}</div>}
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
                              <div className="kt-portlet__foot" style={{display: "flex", justifyContent: "center"}}>
                                <div className="kt-form__actions">
                                  <button type="submit" className="btn btn-info">{t('common:create new')}</button>
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

export default withTranslation(['newPostPage', 'common', 'form'])(NewSellRentPostPage);
