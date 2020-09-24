import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Select, Carousel } from 'antd';
import { generateAddress } from '../../../utils/address'
import showUtility from '../../../utils/showUtility'
import drawCircle from '../../../utils/drawCircle'
import './style.css'
import mapboxgl from 'mapbox-gl';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import { setUserId } from '../../../utils/auth';

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
      radius: 1,
      displayCircle: true,
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
      author_avatar: '',
      utilityCounts: {'hospital': 0, 'university': 0,  'medical_supply': 0,  'pharmacy': 0, 'veterinary': 0, 'kindergarten': 0, 'school': 0, 'college': 0, 'language_school': 0, 'music_school': 0, 'mall': 0, 'supermarket': 0 },
      checkedTypes: ['hospital', 'university', 'medical_supply', 'pharmacy', 'school', 'mall', 'supermarket']
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
          lat: Number(postInfo.lat),
          lon: Number(postInfo.lon),
          address,
          direction: postInfo.direction,
          price: postInfo.price,
          price_unit: postInfo.price_unit,
          facade: postInfo.facade,
          built_year: postInfo.built_year,
          car_parking: postInfo.car_parking,
          fully_furnitured: postInfo.fully_furnitured,
          business_usable: postInfo.business_usable,
          posted_by_landholder: postInfo.posted_by_landholder,
          description: postInfo.description,
          contact_name: postInfo.contact_name,
          contact_phone: postInfo.contact_phone,
          contact_email: postInfo.contact_email,
          createdAt: postInfo.createdAt.split("T")[0],
          author_avatar: postInfo.author.avatar
        }, () => {
          let { lat, lon, radius, checkedTypes } = this.state
          mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2d1bSIsImEiOiJjazJwbHI0eDIwNW82M210b2JnaTBneHY5In0.t4RveeJuHKVJt0RIgFOAGQ';
          this.map = new mapboxgl.Map({
            container: 'map',
            // style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat],
            zoom: 14,
          });

          this.marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(this.map);

          this.map.on('load', () => {
            drawCircle({ lat, lon, radius, map: this.map })
          })

          axios({
            url: `http://localhost:8081/utility/all`,
            method: "POST",
            data: { lat, lon, checkedTypes, radius }
          }).then(res => {
            let resData = res.data
            let utilityCounts = {'hospital': 0, 'university': 0,  'medical_supply': 0,  'pharmacy': 0, 'veterinary': 0, 'kindergarten': 0, 'school': 0, 'college': 0, 'language_school': 0, 'music_school': 0, 'mall': 0, 'supermarket': 0 }
            resData.forEach(utility => {
              utilityCounts[utility.type] = utility.point.length
              this.setState({ utilityCounts })
              showUtility({ pois: utility.point, map: this.map, type: utility.type, poiClick: { lat, lon } })
            })
          })
        })
      }
    })
  }

  handleShowUtility = (e) => {
    let { lat, lon, radius } = this.state
    let currentCheckedTypes = [...this.state.checkedTypes]
    let type = e.target.name
    if (!e.target.checked) {
      let newUtilityCounts = {...this.state.utilityCounts}
      newUtilityCounts[type] = 0
      let index = currentCheckedTypes.indexOf(type)
      currentCheckedTypes.splice(index, 1);
      this.setState({ checkedTypes: currentCheckedTypes, utilityCounts: newUtilityCounts }, () => {
        let markerList = document.getElementsByClassName(type)
        Array.from(markerList).forEach(marker => {
          marker.remove()
        })
      });
    } else {
      axios({
        url: `http://localhost:8081/utility/one?lon=${lon}&lat=${lat}&type=${type}&radius=${radius}`,
        method: "GET",
      }).then(res => {
        let resData = res.data
        currentCheckedTypes.push(type)
        let newUtilityCounts = {...this.state.utilityCounts}
        newUtilityCounts[type] = resData.length

        this.setState({ checkedTypes: currentCheckedTypes, utilityCounts: newUtilityCounts }, () => {
          showUtility({ pois: resData, map: this.map, type, poiClick: { lat, lon } })
        });
      })
    }
  }

  handleChangeRadius = (value) => {
    value = Number(value)
    let { lat, lon, displayCircle, checkedTypes } = this.state
    this.setState({ radius: value }, () => {
      if (displayCircle) {
        this.map.removeLayer('circle-fill')
        this.map.removeSource('circle-fill')
        this.map.removeLayer('circle-outline')
        this.map.removeSource('circle-outline')
      } else {
        this.setState({ displayCircle: true })
      }

      if (value != 0) {
        let radius = value
        drawCircle({ lat, lon, radius, map: this.map })
      } else {
        this.setState({ displayCircle: false })
      }
    })
    checkedTypes.forEach(type => {
      let markerList = document.getElementsByClassName(type)
      Array.from(markerList).forEach(marker => {
        marker.remove()
      })
    })
    axios({
      url: `http://localhost:8081/utility/all`,
      method: "POST",
      data: { lat, lon, checkedTypes, radius: value }
    }).then(res => {
      let resData = res.data
      let utilityCounts = {'hospital': 0, 'university': 0,  'medical_supply': 0,  'pharmacy': 0, 'veterinary': 0, 'kindergarten': 0, 'school': 0, 'college': 0, 'language_school': 0, 'music_school': 0, 'mall': 0, 'supermarket': 0 }

      resData.forEach(utility => {
        utilityCounts[utility.type] = utility.point.length
        showUtility({ pois: utility.point, map: this.map, type: utility.type, poiClick: { lat, lon } })
      })
      this.setState({ utilityCounts })
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
      } else {
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
      } else {
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
                                <div className="gou-icon"><i class="kt-menu__link-icon fa fa-expand"></i></div>

                                <div>{t('common:area')}: {this.state.area}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon fa fa-map-marker-alt"></i></div>
                                <div>{t('common:address')}: {this.state.address}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon fa fa-lock"></i></div>
                                <div>{t('common:transaction status')}: {t(`common:${this.state.transaction_status}`)}</div>
                              </div>
                              <div className="gou-general-others">
                                <div className="gou-icon"><i class="kt-menu__link-icon fa fa-calendar-alt"></i></div>
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
                                <div className="col-9">{t(`common:${this.state.type}`)} {t(`common:${this.state.category}`)}</div>
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
                                <div className="col-9">{t(`common:${this.state.direction}`)}</div>
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
                                <div className="col-9">{t(`common:${this.state.car_parking}`)}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:fully furnitured')}:</div>
                                <div className="col-9">{t(`common:${this.state.fully_furnitured}`)}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:business usable')}:</div>
                                <div className="col-9">{t(`common:${this.state.business_usable}`)}</div>
                              </div>
                              <div className="row">
                                <div className="col-3">{t('common:posted by landholder')}:</div>
                                <div className="col-9">{t(`common:${this.state.posted_by_landholder}`)}</div>
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
                                  <Select defaultValue="1" style={{ width: 100 }} onChange={this.handleChangeRadius}>
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
                                      <input type="checkbox" name="hospital" onClick={this.handleShowUtility} defaultChecked />
                                       {t('hospital')} ({this.state.utilityCounts.hospital})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="university" onChange={this.handleShowUtility} defaultChecked />
                                        {t('university')} ({this.state.utilityCounts.university})
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="medical_supply" onClick={this.handleShowUtility} defaultChecked />
                                      {t('medical supply')} ({this.state.utilityCounts.medical_supply})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="pharmacy" onClick={this.handleShowUtility} defaultChecked />
                                      {t('pharmacy')} ({this.state.utilityCounts.pharmacy})
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="veterinary" onClick={this.handleShowUtility} />
                                      {t('veterinary')}({this.state.utilityCounts.veterinary})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="kindergarten" onClick={this.handleShowUtility} />
                                      {t('kindergarten')}({this.state.utilityCounts.kindergarten})
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="school" onClick={this.handleShowUtility} defaultChecked />
                                      {t('school')} ({this.state.utilityCounts.school})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="college" onClick={this.handleShowUtility} />
                                      {t('college')} ({this.state.utilityCounts.college})
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="language_school" onClick={this.handleShowUtility} />
                                      {t('language school')} ({this.state.utilityCounts.language_school})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="mall" onClick={this.handleShowUtility} defaultChecked />
                                      {t('mall')} ({this.state.utilityCounts.mall})
                                      <span></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="supermarket" onClick={this.handleShowUtility} defaultChecked />
                                      {t('supermarket')}({this.state.utilityCounts.supermarket})
                                      <span></span>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <label class="kt-checkbox">
                                      <input type="checkbox" name="music_school" onClick={this.handleShowUtility} />
                                      {t('music school')}({this.state.utilityCounts.music_school})
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
