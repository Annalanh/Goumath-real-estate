import React from 'react';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
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
            lng: 105.7942275,
            lat: 21.0546768,
            zoom: 5
        };
    }

    async componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
            center: [this.state.lng, this.state.lat],
            zoom: 14,
        });

        let hospitalIcon = document.createElement('div');
        hospitalIcon.innerHTML = `
          <div class="pin">
            <i class="fa fa-university"></i>
          </div>
          `

        let marker1 = new mapboxgl.Marker()
            .setLngLat([105.7942275, 21.0546768])
            .addTo(map);

        let marker2 = new mapboxgl.Marker(hospitalIcon)
            .setLngLat([105.7938183, 21.0476192])
            .addTo(map);

        let popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        })
            .setLngLat([105.7938183, 21.0476192])
            .setHTML(`
            <div>
              <div class="gou-utility-name gou-utility-detail-container">Bệnh viện tâm thần</div>
              <div class="gou-utility-detail-container">
                <span class="gou-utility-detail-title">Địa chỉ:</span> 
                <span>số 133, đốc ngữ, ba đình, hà nội</span> 
              </div>
              <div class="gou-utility-detail-container">
                <span class="gou-utility-detail-title">Khoảng cách:</span> 
                <span>12 km</span> 
              </div>
            </div>`
            )

        marker2.getElement().addEventListener('mouseenter', () => {
            popup.addTo(map);
        })

        marker2.getElement().addEventListener('mouseleave', () => {
            popup.remove();
        })

    }

    render() {

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
                                                <form className="kt-form">
                                                    <div className="kt-portlet__body">
                                                        <div className="kt-section kt-section--first">
                                                            <h3 class="kt-section__title">1. Thông tin cơ bản:</h3>
                                                            <div className="kt-section__body">
                                                                <div className="row form-group">
                                                                    <div class="col-lg-6">
                                                                        <div class="kt-radio-inline">
                                                                            <label class="kt-radio">
                                                                                <input type="radio" name="gender" /> Bán
                                                                            <span></span></label>
                                                                            <label class="kt-radio">
                                                                                <input type="radio" name="gender" /> Cho thuê
                                                                            <span></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-lg-3 col-form-label">Loại nhà:</label>
                                                                    <div className="col-lg-6">
                                                                        <Select defaultValue="">
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
                                                                    <label className="col-lg-3 col-form-label">Hướng nhà:</label>
                                                                    <div className="col-lg-6">
                                                                        <Select defaultValue="">
                                                                            <Option value="apartment">Chung cư</Option>
                                                                            <Option value="house">Nhà riêng</Option>
                                                                            <Option value="mansion">Biệt thự, liền kề</Option>
                                                                            <Option value="town-house">Nhà mặt phố</Option>
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
                                                                            // value={props.values.area}
                                                                            // onChange={props.handleChange}
                                                                            // onBlur={props.handleBlur}
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
                                                                            name="area"
                                                                            // value={props.values.area}
                                                                            // onChange={props.handleChange}
                                                                            // onBlur={props.handleBlur}
                                                                            min="0"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h3 class="kt-section__title">2. Vị trí:</h3>

                                                            <div id="map" className="gou-map-container" />

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
                                                        </div>
                                                    </div>
                                                    <div class="kt-portlet__foot">
                                                        <div class="kt-form__actions">
                                                            <div class="row" style={{ justifyContent: 'center' }}>
                                                                <button type="submit" class="btn btn-success">Ước tính giá</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

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

export default PredictPricePage;
