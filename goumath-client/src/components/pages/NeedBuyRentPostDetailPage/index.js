import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import mapboxgl from 'mapbox-gl';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

class SellRentPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      zoom: 5,
      transaction_status: '',
      type: '',
      category: '',
      title: '',
      area: '',
      num_bedroom: '',
      num_floor: '',
      num_bathroom: '',
      direction: '',
      lat: '',
      lon: '',
      radius:'',
      price: '',
      price_unit: '',
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

        this.setState({
          isSaved: resData.isSaved,
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
          radius: postInfo.radius,
          direction: postInfo.direction,
          price: postInfo.price,
          price_unit: postInfo.price_unit,
          description: postInfo.description,
          contact_name: postInfo.contact_name,
          contact_phone: postInfo.contact_phone,
          contact_email: postInfo.contact_email,
          createdAt: postInfo.createdAt,
          author_avatar: postInfo.author.avatar
        }, () => {
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
                            <div className="col-lg-6">
                              <div className="row">
                                <img src={this.state.author_avatar} className="col-4" />
                                <div className="col-8">
                                  <div>
                                    {this.state.contact_name}
                                  </div>
                                  <div>
                                    {this.state.type}
                                  </div>
                                  <div>
                                    {this.state.contact_phone}
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div className="col-lg-6">
                              Giá: <span>{this.state.price}</span>
                            </div>
                          </div>
                          <div className="row gou-detail-section">
                            <div className="col-12 gou-detail-section-title">{t('requirements')}</div>
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
