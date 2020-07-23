import React from 'react';
import { Select } from 'antd';
import './style.css'
import mapboxgl from 'mapbox-gl';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class PostDetail extends React.Component {
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
                  <div className="row">
                    <div className="col-12">
                      <div className="kt-portlet" style={{ marginTop: "25px" }}>
                        <div className="kt-portlet__body">
                          <div className="row gou-detail-section">
                            <div className="col-lg-4">
                              <img className="gou-main-img" src="https://i.pinimg.com/originals/bc/72/3a/bc723a7e1359da8e64d123f680daadfb.jpg" />
                            </div>
                            <div className="col-lg-5 gou-general-detail-container">
                              <div className="gou-general-title">
                                Bán nhà ở Hà Nội gấp
                                </div>
                              <div className="gou-general-price">
                                20 tỷ
                                </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>

                                <div>Diện tích: 100</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>
                                <div>Địa chỉ: 200</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>
                                <div>Ngày đăng: 200</div>
                              </div>
                            </div>
                            <div className="col-lg-3 gou-contact-container">
                              <div className="row gou-contact-item">
                                <img src="/assets/media/users/300_21.jpg" className="col-4" />
                                <div className="col-8 gou-contact-name-container">
                                  <div>Nguyen Phuong Thao</div>
                                </div>
                              </div>
                              <div className="row gou-contact-item">
                                <div className="col-2 gou-contact-icon-container"><i class="fa fa-phone-alt"></i></div>
                                <div className="col-10">0916428357</div>
                              </div>
                              <div className="row gou-contact-item">
                                <div className="col-2 gou-contact-icon-container"><i class="fa fa-envelope"></i></div>
                                <div className="col-10">thaonp@gmail.com</div>
                              </div>
                            </div>
                          </div>
                          <div className="row gou-detail-section">
                            <div className="col-12 gou-detail-section-title">Đặc điểm</div>
                            <div className="col-12 gou-props-container">
                              <div className="row">
                                <div className="col-3">Loại tin:</div>
                                <div className="col-9">Bán nhà mặt phố</div>
                              </div>
                              <div className="row">
                                <div className="col-3">Giá:</div>
                                <div className="col-9">20 tỷ</div>
                              </div>
                              <div className="row">
                                <div className="col-3">Diện tích:</div>
                                <div className="col-9">3</div>
                              </div>
                              <div className="row">
                                <div className="col-3">Số tầng:</div>
                                <div className="col-9">2</div>
                              </div>
                              <div className="row">
                                <div className="col-3">Số phòng ngủ:</div>
                                <div className="col-9">4</div>
                              </div>
                              <div className="row">
                                <div className="col-3">Số phòng tắm:</div>
                                <div className="col-9">4</div>
                              </div>
                            </div>
                          </div>
                          <div className="row gou-detail-section">
                            <div className="col-12 gou-detail-section-title">Mô tả chi tiết</div>
                            <div className="col-12 gou-props-container">
                              Bán Nhà Mặt Phố Thành Công- Ba Đình, 5 Tầng, Kinh Doanh Sầm Uất Đêm Ngày
                              DT: 80/100mx 5T, MT: 5m
                              Mô tả:
                              + Vị trí trung tâm Ba Đình- Phố Thành Công tương lai gần sẽ rất rất đẹp, ô tô dừng đỗ suốt ngày đêm. Các nhà cao tầng đang mọc lên rất nhiều, hè rộng, kinh doanh sầm uất.
                              + Nhà hiện tại đang cho
                            </div>
                          </div>

                          <div className="col-12 gou-detail-section-title">Hiển thị bản đồ</div>
                          <div id="map" />
                          <div className="gou-utility-table">
                            <div className="kt-portlet">
                              <div className="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                  <h3 class="kt-portlet__head-title">Bản đồ tiện ích</h3>
                                </div>
                                <div className="gou-distance-selector">
                                  <Select defaultValue="1" style={{ width: 100 }} onChange={this.handleChangePublishStatus}>
                                    <Option value="0.1">100 m</Option>
                                    <Option value="0.2">200 m</Option>
                                    <Option value="0.5">500 m</Option>
                                    <Option value="1">1 km</Option>
                                    <Option value="2">2 km</Option>
                                    <Option value="5">5 km</Option>
                                  </Select>
                                </div>
                              </div>
                              <div className="kt-portlet__body">
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="hospital" />
                                      Bệnh viện (10)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="university" />
                                        Đại học (10)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="medical_supply" />
                                      Bệnh viện (4)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="pharmacy" />
                                        Nhà thuốc (5)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="veterinary" />
                                      Thú y (6)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="kindergarten" />
                                        Mẫu giáo (7)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="school" />
                                      Trường học (4)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="college" />
                                        Cao đẳng (10)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="language_school" />
                                      Trung tâm ngoại ngữ (10)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="mall" />
                                        Trung tâm thương mại (1)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="utility" value="supermarket" />
                                      Siêu thị (9)
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="music_school" />
                                      Trung tâm dạy nhạc, mỹ thuật, nấu ăn (10)
                                      <span></span>
                                    </label>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
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

export default PostDetail;
