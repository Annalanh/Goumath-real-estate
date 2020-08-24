import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Select, Carousel } from 'antd';
import { generateAddress } from '../../../utils/address'
import './style.css'
import mapboxgl from 'mapbox-gl';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class SellRentPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      zoom: 5,
      list_img: [],
      transaction_status: '',
      type: '',
      category: '',
      title: '',
      area: '',
      num_bedroom: '',
      num_floor: '',
      num_bathroom: '',
      address: '',
      direction: '',
      lat: '',
      lon: '',
      price: '',
      price_unit: '',
      facade: 0,
      built_year: 0,
      car_parking: false,
      fully_furnitured: false,
      business_usable: false,
      posted_by_landholder: false,
      description: '',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      createdAt: '',
      author_avatar: ''
    };
  }

  async componentDidMount() {
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
        let listAddress = [postInfo.house_no, postInfo.street, postInfo.ward, postInfo.district, postInfo.province]
        let address = generateAddress(listAddress)
        this.setState({
          isSaved: resData.isSaved,
          list_img: postInfo.list_img,
          transaction_status: postInfo.transaction_status,
          type: postInfo.type,
          category: postInfo.category,
          title: postInfo.title,
          area: postInfo.area,
          num_bedroom: postInfo.num_bedroom,
          num_floor: postInfo.num_floor,
          num_bathroom: postInfo.num_bathroom,
          lat: postInfo.lat,
          lon: postInfo.lon,
          address,
          direction: postInfo.direction,
          price: postInfo.price,
          price_unit: postInfo.price_unit,
          facade: postInfo.facade,
          built_year: postInfo.built_year,
          car_parking: postInfo.car_parking,
          fully_furnitured: postInfo.fully_furnitured,
          business_usable: postInfo.usable,
          posted_by_landholder: postInfo.posted_by_landholder,
          description: postInfo.description,
          contact_name: postInfo.contact_name,
          contact_phone: postInfo.contact_phone,
          contact_email: postInfo.contact_email,
          createdAt: postInfo.createdAt,
          author_avatar: postInfo.author.avatar
        }, () => {
          console.log(this.state)
          mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
            center: [Number(this.state.lon), Number(this.state.lat)],
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
        })
      }
    })
  }
  handleSaveToFavorites = () => {
    let currentLocation = this.props.location.pathname
    let postId = currentLocation.substr(currentLocation.lastIndexOf('/') + 1)
    let userId = localStorage.getItem('userId')

    axios({
      url: `http://localhost:8081/post/save`,
      method: "POST",
      data: { userId, postId }
    }).then(res => {
      let resData = res.data
      if (resData.status) {
        this.setState({
          isSaved: true
        })
      }else{
        console.log(resData.message)
      }
    })
  }

  handleUnsaveToFavorites = () => {
    let currentLocation = this.props.location.pathname
    let postId = currentLocation.substr(currentLocation.lastIndexOf('/') + 1)
    let userId = localStorage.getItem('userId')

    axios({
      url: `http://localhost:8081/post/unsave`,
      method: "POST",
      data: { userId, postId }
    }).then(res => {
      let resData = res.data
      if (resData.status) {
        this.setState({
          isSaved: false
        })
      }else{
        console.log(resData.message)
      }
    })
  }
  render() {
    const { t } = this.props
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
                            <div className="col-lg-5">
                              <Carousel autoplay>
                                {
                                  this.state.list_img.map(img => {
                                    return (
                                      <div>
                                        <img className="gou-main-img" src={img} />
                                      </div>
                                    )
                                  })
                                }
                              </Carousel>
                            </div>
                            <div className="col-lg-4 gou-general-detail-container">
                              <div className="gou-general-title-container">
                                <div className="gou-general-title">
                                  {this.state.title}
                                </div>
                                {
                                  this.state.isSaved ? (
                                    <button className="btn gou-unsave-btn" onClick={this.handleUnsaveToFavorites} style={{ display: this.state.showSavePostBtn }}>
                                      <i class="flaticon-download" style={{ marginRight: '5px' }}></i>
                                      {t('common:unsave post')}
                                    </button>
                                  ) : (
                                      <button className="btn gou-save-btn" onClick={this.handleSaveToFavorites} style={{ display: this.state.showSavePostBtn }}>
                                        <i class="flaticon-download" style={{ marginRight: '5px' }}></i>
                                        {t('common:save post')}
                                      </button>
                                    )
                                }
                              </div>
                              <div className="gou-general-price">
                                {this.state.price} {t(`common:${this.state.price_unit}`)}
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>

                                <div>{t('common:area')}: {this.state.area}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>
                                <div>{t('common:address')}: {this.state.address}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>
                                <div>{t('common:transaction status')}: {t(`common:${this.state.transaction_status}`)}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon flaticon2-protection"></i></div>
                                <div>{t('common:created at')}: {this.state.createdAt}</div>
                              </div>
                            </div>
                            <div className="col-lg-3 gou-contact-container">
                              <div className="row gou-contact-item">
                                <img src={this.state.author_avatar} className="col-4" />
                                <div className="col-8 gou-contact-name-container">
                                  <div>{this.state.contact_name}</div>
                                </div>
                              </div>
                              <div className="row gou-contact-item">
                                <div className="col-2 gou-contact-icon-container"><i class="fa fa-phone-alt"></i></div>
                                <div className="col-10">{this.state.contact_phone}</div>
                              </div>
                              <div className="row gou-contact-item">
                                <div className="col-2 gou-contact-icon-container"><i class="fa fa-envelope"></i></div>
                                <div className="col-10">{this.state.contact_email}</div>
                              </div>
                            </div>
                          </div>
                          <div className="row gou-detail-section">
                            <div className="col-12 gou-detail-section-title">{t('common:properties')}</div>
                            <div className="col-12 gou-props-container">
                              <div className="row">
                                <div className="col-3">{t('common:post type')}:</div>
                                <div className="col-9">{this.state.type} {this.state.category}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:price')}:</div>
                                <div className="col-9">{this.state.price} {this.state.price_unit}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:area')}:</div>
                                <div className="col-9">{this.state.area}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:num floor')}:</div>
                                <div className="col-9">{this.state.num_floor}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:num bedroom')}:</div>
                                <div className="col-9">{this.state.num_bedroom}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:num bathroom')}:</div>
                                <div className="col-9">{this.state.num_bathroom}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:direction')}:</div>
                                <div className="col-9">{this.state.direction}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:facade')}:</div>
                                <div className="col-9">{this.state.facade}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:built year')}:</div>
                                <div className="col-9">{this.state.built_year}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:car parking')}:</div>
                                <div className="col-9">{this.state.car_parking}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:fully furnitured')}:</div>
                                <div className="col-9">{this.state.fully_furnitured}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:business usable')}:</div>
                                <div className="col-9">{this.state.business_usable}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:posted by landholder')}:</div>
                                <div className="col-9">{this.state.posted_by_landholder}</div>
                              </div>
                            </div>
                          </div>
                          <div className="row gou-detail-section">
                            <div className="col-12 gou-detail-section-title">{t('common:description')}</div>
                            <div className="col-12 gou-props-container">
                              {this.state.description}
                            </div>
                          </div>

                          <div className="col-12 gou-detail-section-title">{t('show map')}</div>
                          <div id="map" />
                          <div className="gou-utility-table">
                            <div className="kt-portlet">
                              <div className="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                  <h3 class="kt-portlet__head-title">{t('utility map')}</h3>
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

export default withTranslation(['postDetailPage', 'common'])(SellRentPostDetail);
