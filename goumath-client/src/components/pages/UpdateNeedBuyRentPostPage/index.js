import React from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf'
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Select, Slider } from 'antd';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import { validateEmail, validatePhone } from '../../../utils/form-validation'
import { getUserRole } from '../../../utils/auth'

const { Option } = Select;

class UpdateNeedBuyRentPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            lat: '',
            lon: '',
            radius: 0,
            displayCircle: false,
            transaction_status: '',
            publish_status: '',
            title: '',
            type: '',
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
                let displayCircle = false
                if (postInfo.radius != 0) {
                    displayCircle = true
                }
                this.setState({
                    loading: false,
                    lat: postInfo.lat,
                    lon: postInfo.lon,
                    radius: postInfo.radius,
                    displayCircle,
                    transaction_status: postInfo.transaction_status,
                    publish_status: postInfo.publish_status,
                    title: postInfo.title,
                    type: postInfo.type,
                    category: postInfo.category,
                    area: postInfo.area,
                    num_bedroom: postInfo.num_bedroom,
                    num_bathroom: postInfo.num_bathroom,
                    num_floor: postInfo.num_floor,
                    direction: postInfo.direction,
                    price: postInfo.price,
                    price_unit: postInfo.price_unit,
                    contact_name: postInfo.contact_name,
                    contact_phone: postInfo.contact_phone,
                    contact_email: postInfo.contact_email,
                    description: postInfo.description,
                }, () => {
                    let { lat, lon, radius, displayCircle } = this.state
                    mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
                    this.map = new mapboxgl.Map({
                        container: 'map',
                        style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
                        center: [Number(lon), Number(lat)],
                        zoom: 14,
                    });

                    this.marker = new mapboxgl.Marker().setLngLat([Number(lon), Number(lat)]).addTo(this.map);

                    this.map.on('click', (e) => {
                        let lat = e.lngLat.lat
                        let lon = e.lngLat.lng
                        this.handleClickMap({ lat, lon })
                    })
                    if (displayCircle) {
                        this.map.on('load', () => {
                            this.drawCircle({ lat, lon, radius })
                        })
                    }

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
                })
            } else {
                console.log(resData.message)
            }
        })
    }

    handleClickMap = ({ lat, lon }) => {
        this.marker.remove()
        this.marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(this.map);
        if (this.state.displayCircle) {
            let radius = this.state.radius
            this.map.removeLayer('circle-fill')
            this.map.removeSource('circle-fill')
            this.map.removeLayer('circle-outline')
            this.map.removeSource('circle-outline')
            this.drawCircle({ lat, lon, radius })
            this.setState({
                lat,
                lon,
            })
        } else {
            this.setState({
                lat,
                lon,
            })
        }
    }

    handleChangeRadius = (value) => {
        value = Number(value)
        this.setState({ radius: value }, () => {
            if (this.state.displayCircle) {
                this.map.removeLayer('circle-fill')
                this.map.removeSource('circle-fill')
                this.map.removeLayer('circle-outline')
                this.map.removeSource('circle-outline')
            } else {
                this.setState({ displayCircle: true })
            }

            if (value != 0) {
                let { lat, lon, radius } = this.state
                this.drawCircle({ lat, lon, radius })
            } else {
                this.setState({ displayCircle: false })
            }
        })
    }

    drawCircle = ({ lat, lon, radius }) => {
        let center = turf.point([Number(lon), Number(lat)]);
        let options = {
            steps: 80,
            units: 'kilometers'
        };

        let circle = turf.circle(center, radius, options);
        this.map.addLayer({
            "id": "circle-fill",
            "type": "fill",
            "source": {
                "type": "geojson",
                "data": circle
            },
            "paint": {
                "fill-color": "#c4e8f2",
                "fill-opacity": 0.5
            }
        });
        this.map.addLayer({
            "id": "circle-outline",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": circle
            },
            "paint": {
                "line-color": "#1890ff",
                "line-opacity": 0.5,
                "line-width": 10,
                "line-offset": 5
            }
        });
    }

    handleChangePublishStatus = (value) => {
        this.setState({ publish_status: value })
    }

    handleChangeTransactionStatus = (value) => {
        this.setState({ transaction_status: value })
    }

    render() {
        const { t } = this.props
        const marks = {
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
            20: {
                label: <strong>20km</strong>
            }
        };
        const pathname = this.props.location.pathname
        const postId = pathname.substr(pathname.lastIndexOf('/') + 1)
        const {
            loading,
            lat,
            lon,
            radius,
            transaction_status,
            publish_status,
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
            description
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
                                {
                                    loading ? (
                                        <div>Loading</div>
                                    ) : (
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
                                                                            <Select className='gou-antd-select' value={publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus}>
                                                                                <Option value="pending">{t('common:pending')}</Option>
                                                                                <Option value="approved">{t('common:approved')}</Option>
                                                                                <Option value="refused">{t('common:refused')}</Option>
                                                                                <Option value="expired">{t('common:expired')}</Option>
                                                                            </Select>
                                                                        ) : (
                                                                                <Select className='gou-antd-select' value={publish_status} style={{ width: 120 }} onChange={this.handleChangePublishStatus} disabled>
                                                                                    <Option value="pending">{t('common:pending')}</Option>
                                                                                    <Option value="approved">{t('common:approved')}</Option>
                                                                                    <Option value="refused">{t('common:refused')}</Option>
                                                                                    <Option value="expired">{t('common:expired')}</Option>
                                                                                </Select>
                                                                            )
                                                                    }
                                                                    <div style={{ marginLeft: '10px' }}>
                                                                        <Select className='gou-antd-select' value={transaction_status} style={{ width: 150 }} onChange={this.handleChangeTransactionStatus}>
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

                                                                    Object.keys(values).forEach(key => {
                                                                        formData.append(key, values[key])
                                                                    })

                                                                    formData.append('transaction_status', transaction_status)
                                                                    formData.append('publish_status', publish_status)
                                                                    formData.append('lat', lat)
                                                                    formData.append('lon', lon)
                                                                    formData.append('radius', radius)

                                                                    axios({
                                                                        url: `http://localhost:8081/post/update/${postId}`,
                                                                        method: "POST",
                                                                        data: formData,
                                                                        processData: false,
                                                                        contentType: false,
                                                                    }).then(res => {
                                                                        console.log(res)
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
                                                                                                        checked={props.values.type == 'need buy'}
                                                                                                        onChange={() => {
                                                                                                            props.setFieldValue('type', 'need buy')
                                                                                                            props.setFieldValue('price_unit', '')
                                                                                                        }}
                                                                                                    /> {t('common:need buy')}
                                                                                                    <span></span>
                                                                                                </label>
                                                                                                <label className="kt-radio">
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        name="type"
                                                                                                        checked={props.values.type == 'need rent'}
                                                                                                        onChange={() => {
                                                                                                            props.setFieldValue('type', 'need rent')
                                                                                                            props.setFieldValue('price_unit', '')
                                                                                                        }}
                                                                                                    /> {t('common:need rent')}
                                                                                                    <span></span>
                                                                                                </label>
                                                                                                {props.errors.type && props.touched.type && <div className="gou-invalid-feedback">{props.errors.type}</div>}
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
                                                                                    <div id="gou-map-container">
                                                                                        <div id="map" />
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <label className="col-2">Radius:</label>
                                                                                        <div className="col-10 gou-radius-slider">
                                                                                            <Slider marks={marks} defaultValue={radius} max={20} onChange={this.handleChangeRadius} />
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="form-group row">
                                                                                        <label className="col-lg-3 col-form-label">{t('common:direction')}:</label>
                                                                                        <div className="col-lg-6">
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
                                                                                            />
                                                                                            {props.errors.price && props.touched.price && <div className="gou-invalid-feedback">{props.errors.price}</div>}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row">
                                                                                        <label className="col-lg-3 col-form-label">{t('common:price unit')}:</label>
                                                                                        <div className="col-lg-6">
                                                                                            <Select className='gou-antd-select' value={props.values.price_unit} onChange={(value) => { props.setFieldValue('price_unit', value) }} name="price_unit">
                                                                                                {props.values.type === 'need buy' && <Option value="vnd">VND</Option>}
                                                                                                {props.values.type === 'need buy' && <Option value="million/m2">{t('common:million')}/m2</Option>}
                                                                                                {props.values.type === 'need rent' && <Option value="million/month">{t('common:million')}/{t('common:month')}</Option>}
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
                                                                            </div>
                                                                        </div>
                                                                        <div className="kt-portlet__foot" style={{display: "flex", justifyContent: "center"}}>
                                                                            <div className="kt-form__actions">
                                                                                <button type="submit" className="btn btn-info">{t('update post')}</button>
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

            </>
        )
    }
}

export default withTranslation(['updatePostPage', 'common'])(UpdateNeedBuyRentPostPage);
