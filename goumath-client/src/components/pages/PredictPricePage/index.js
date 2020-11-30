import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
import { Formik } from 'formik';
import './style.css'
import mapboxgl from 'mapbox-gl';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class PredictPricePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lon: 105.7942275,
            lat: 21.0546768,
            zoom: 5
        };
    }

    async componentDidMount() {
        let { lat, lon } = this.state
        mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
            center: [lon, lat],
            zoom: 14,
            predict_result: 0
        });
        this.marker = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(this.map);
        this.map.on('click', (e) => {
            let lat = e.lngLat.lat
            let lon = e.lngLat.lng
            this.setState({ lat, lon }, () => {
                this.marker.remove()
                this.marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(this.map);
            })
        })
    }

    render() {
        const { t } = this.props
        const initialProfile = {
            area: '',
            num_bathroom: '',
            num_bedroom: ''
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
                                    <div className="row gou-title-container">
                                        <h1>ĐỊNH GIÁ TÀI SẢN</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="kt-portlet">
                                                <Formik
                                                    initialValues={initialProfile}
                                                    onSubmit={(values, actions) => {
                                                        actions.setSubmitting(false);
                                                        let { num_bedroom, num_bathroom, area } = values
                                                        let { lat, lon } = this.state
                                                        axios({
                                                            url: `http://localhost:8081/predict?area=${area}&num_bedroom=${num_bedroom}&num_bathroom=${num_bathroom}&lat=${lat}&lon=${lon}`,
                                                            method: "GET",
                                                        }).then(res => {
                                                            let resData = res.data
                                                            let predict_result = JSON.stringify(resData)
                                                            predict_result = predict_result.replace('[', '')
                                                            predict_result = predict_result.replace(']', '')
                                                            this.setState({ predict_result: Number(predict_result)})
                                                        })
                                                    }}
                                                    validate={(values) => {
                                                        const errors = {};
                                                        const requiredError = t('form:required')

                                                        if (!values.area) errors.area = requiredError;
                                                        if (!values.num_bedroom) errors.num_bedroom = requiredError
                                                        if (!values.num_bathroom) errors.num_bathroom = requiredError

                                                        return errors;
                                                    }}
                                                >
                                                    {props => (
                                                        <form className="kt-form" onSubmit={props.handleSubmit}>
                                                            <div className="kt-portlet__body">
                                                                <div className="kt-section kt-section--first">
                                                                    <h3 class="kt-section__title">1. Thông tin cơ bản:</h3>
                                                                    <div className="kt-section__body">
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
                                                                    </div>
                                                                    <h3 class="kt-section__title">2. Vị trí:</h3>

                                                                    <div id="map" className="gou-map-container" />
                                                                </div>
                                                            </div>
                                                            <div class="kt-portlet__foot">
                                                                <div class="kt-form__actions">
                                                                    <div class="row" style={{ justifyContent: 'center' }}>
                                                                        <button type="submit" class="btn" style={{backgroundColor: "#1a223c", color: "white"}}>Price predict</button>
                                                                    </div>
                                                                    <div class="row" style={{ justifyContent: 'center', marginTop: '10px' }}>
                                                                        <input
                                                                            className="form-control"
                                                                            type="number"
                                                                            value={this.state.predict_result}
                                                                            style={{ width: '50%'}}
                                                                        />
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
export default withTranslation(['common'])(PredictPricePage);
