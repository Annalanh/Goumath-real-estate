import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import { provinces, districts } from '../../../utils/geoData'
import { generateAddress } from '../../../utils/address'
import SellRentIntroCard from '../../layouts/SellRentIntroCard'

const { Option } = Select;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      districts1: [],
      type: null,
      category: null,
      province: null,
      district: null,
      priceRange: null,
      areaRange: null,
      recentSellPosts: [],
      recentRentPosts: []
    }
  }

  componentDidMount = () => {
    axios({
      url: `http://localhost:8081/post/all-sell-posts-homepage`,
      method: "GET"
    }).then(res => {
      let resData = res.data
      if (resData.status) {
        let data = []
        resData.recentSellPosts.forEach(post => {
          let { title, type, area, price, list_img, _id, num_bathroom, num_bedroom } = post
          let listAddress = [post.house_no, post.street, post.ward, post.district, post.province]
          let address = generateAddress(listAddress)
          data.push({ address, title, type, area, price, list_img, _id, num_bathroom, num_bedroom })
        })
        this.setState({ recentSellPosts: data })
      } else {
        console.log(resData.err)
      }
    })
    axios({
      url: `http://localhost:8081/post/all-rent-posts-homepage`,
      method: "GET"
    }).then(res => {
      let resData = res.data
      if (resData.status) {
        let data = []
        resData.recentRentPosts.forEach(post => {
          let { title, type, area, price, list_img, _id, num_bathroom, num_bedroom } = post
          let listAddress = [post.house_no, post.street, post.ward, post.district, post.province]
          let address = generateAddress(listAddress)
          data.push({ address, title, type, area, price, list_img, _id, num_bathroom, num_bedroom })
        })
        this.setState({ recentRentPosts: data })
      } else {
        console.log(resData.err)
      }
    })
  }

  handleChangeProvince = (value) => {
    if (value) {
      this.setState({ province: value, districts1: districts[value], district: '' })
    }
    else this.setState({ province: null, districts1: [] })
  }
  handleChangeDistrict = (value) => {
    if (value) this.setState({ district: value })
    else this.setState({ district: null })
  }
  handleChangeType = (value) => {
    if (value) this.setState({ type: value })
    else this.setState({ type: null })
  }
  handleChangeCategory = (value) => {
    if (value) this.setState({ category: value })
    else this.setState({ category: null })
  }
  handleChangeArea = (value) => {
    if (value) this.setState({ areaRange: value })
    else this.setState({ areaRange: null })
  }
  handleChangePrice = (value) => {
    if (value) this.setState({ priceRange: value })
    else this.setState({ priceRange: null })
  }
  handleFilter = (e) => {
    e.preventDefault()
    let { province, district, type, category, priceRange, areaRange } = this.state
    window.location.href = `/search/${province}/${district}/${type}/${category}/${priceRange}/${areaRange}`
  }
  render() {
    const { t } = this.props
    let { province, districts1, recentSellPosts, recentRentPosts } = this.state
    return (
      <>
        <MobileNavBar />
        <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
            <AsideBar />

            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
              <NavBar />

              <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

                <div className="kt-subheader-search" style={{ backgroundImage: "url(/assets/gou-imgs/homepage-banner.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height: "500px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <div className="kt-container  kt-container--fluid ">
                    <h3 className="kt-subheader-search__title">
                      <span className="kt-subheader-search__desc"></span>
                    </h3>
                    <form className="kt-form row" onSubmit={this.handleFilter}>
                      <div className="col-lg-10">
                        <div className="row gou-filter-container">
                          <div className="col-lg-4  gou-filter-item">
                            <Select placeholder={t('province')} style={{ width: '100%' }} onChange={this.handleChangeProvince}>
                              <Option value="null">{t('province')}</Option>
                              {provinces && provinces.map(province => { return (<Option value={province}>{province}</Option>) })}
                            </Select>
                          </div>
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('district')} style={{ width: '100%' }} onChange={this.handleChangeDistrict}>
                              <Option value="null">{t('district')}</Option>
                              {districts1 && districts1.map(district => { return (<Option value={district}>{district}</Option>) })}
                            </Select>
                          </div>
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('post type')} style={{ width: '100%' }} onChange={this.handleChangeType}>
                              <Option value="null">{t('post type')}</Option>
                              <Option value="sell">{t("sell")}</Option>
                              <Option value="rent">{t("rent")}</Option>
                              <Option value="need buy">{t("need buy")}</Option>
                              <Option value="need rent">{t("need rent")}</Option>
                            </Select>
                          </div>
                        </div>
                        <div className="row gou-filter-container">
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('category')} style={{ width: '100%' }} onChange={this.handleChangeCategory}>
                              <Option value="null">{t('category')}</Option>
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
                          </div>
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('price')} style={{ width: '100%' }} onChange={this.handleChangePrice}>
                              <Option value="null">{t('price')}</Option>
                              <Option value="deal">{t('deal')}</Option>
                              <Option value="lt500">{t("less than")} 500 trieu</Option>
                              <Option value="500to800"> 500 - 800 trieu</Option>
                              <Option value="800to1000"> 800 trieu - 1 ty</Option>
                              <Option value="1000to2000"> 1 - 2 ty</Option>
                              <Option value="2000to3000"> 2 - 3 ty</Option>
                              <Option value="3000to5000"> 3 - 5 ty</Option>
                              <Option value="5000to7000"> 5 - 7 ty</Option>
                              <Option value="7000to10000"> 7 - 10 ty</Option>
                              <Option value="10000to20000"> 10 - 20 ty</Option>
                              <Option value="gt20000">{t("more than")} 20 ty</Option>
                            </Select>
                          </div>
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('area')} style={{ width: '100%' }} onChange={this.handleChangeArea}>
                              <Option value="null">{t('area')}</Option>
                              <Option value="lt30"> {t("less than")} 30 m2</Option>
                              <Option value="30to50"> 30 - 50 m2</Option>
                              <Option value="50to80"> 50 - 80 m2</Option>
                              <Option value="80to100"> 80 - 100 m2</Option>
                              <Option value="100to150"> 100 - 150 m2</Option>
                              <Option value="150to200"> 150 - 200 m2</Option>
                              <Option value="200to300"> 200 - 300 m2</Option>
                              <Option value="gt300">{t("more than")} 300 m2</Option>
                            </Select>
                          </div>
                        </div>

                      </div>
                      <div className="col-lg-2 gou-filter-btn">
                        <button type="submit" class="btn gou-save-btn" style={{ marginRight: "10px" }}>{t('search')}</button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div style={{ width: "50%" }}>
                      <h2 style={{ textAlign: "center", color: "#1a223c" }}>{t('homePage:Features intro')}</h2>
                    </div>
                  </div>
                  <hr style={{ width: "20%", border: "1px solid #1a223c", textAlign: "center" }} />



                  <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-3" style={{ display: "flex", alignItems: "center", flexDirection: "column", height: "300px" }}>
                      <div style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/assets/gou-imgs/homepage-search-house.png" style={{ width: "50%", height: "100%" }} />
                      </div>
                      <h3 style={{ fontWeight: "bold", color: "#1a223c" }}>{t('homePage:find houses')}</h3>
                      <div>{t(`homePage:find houses description`)}</div>
                    </div>
                    <div className="col-md-3" style={{ display: "flex", alignItems: "center", flexDirection: "column", height: "300px" }}>
                      <div style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/assets/gou-imgs/homepage-post-manage.png" style={{ width: "50%", height: "100%" }} />
                      </div>
                      <h3 style={{ fontWeight: "bold", color: "#1a223c" }}>{t('homePage:manage posts')}</h3>
                      <div>{t(`homePage:manage posts description`)}</div>
                    </div>
                    <div className="col-md-3" style={{ display: "flex", alignItems: "center", flexDirection: "column", height: "300px" }}>
                      <div style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/assets/gou-imgs/homepage-calculate-price.png" style={{ width: "50%", height: "100%" }} />
                      </div>
                      <h3 style={{ fontWeight: "bold", color: "#1a223c" }}>{t('homePage:calculation tools')}</h3>
                      <div>{t(`homePage:calculation tools description`)}</div>
                    </div>
                    <div className="col-md-3" style={{ display: "flex", alignItems: "center", flexDirection: "column", height: "300px" }}>
                      <div style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/assets/gou-imgs/homepage-market.png" style={{ width: "50%", height: "100%" }} />
                      </div>
                      <h3 style={{ fontWeight: "bold", color: "#1a223c" }}>{t('homePage:price prediction')}</h3>
                      <div>{t(`homePage:price prediction description`)}</div>
                    </div>
                  </div>





                  <h3 style={{ textAlign: "center", marginTop: "50px" }}>{t("homePage:recent houses for sale")}</h3>
                  <hr style={{ width: "20%", border: "1px solid #1a223c", textAlign: "center" }} />
                  <div>
                    <div className="row">
                      {
                        recentSellPosts.map(post => {
                          return <SellRentIntroCard title={post.title} area={post.area} price={post.price} address={post.address} type={post.type} list_img={post.list_img} postId={post._id} num_bathroom={post.num_bathroom} num_bedroom={post.num_bedroom} />
                        })
                      }
                    </div>
                  </div>
                  <h3 style={{ textAlign: "center", textAlign: "center", marginTop: "50px" }}>{t("homePage:recent houses for rent")}</h3>
                  <hr style={{ width: "20%", border: "1px solid #1a223c", textAlign: "center" }} />
                  <div>
                    <div className="row">
                      {
                        recentRentPosts.map(post => {
                          return <SellRentIntroCard title={post.title} area={post.area} price={post.price} address={post.address} type={post.type} list_img={post.list_img} postId={post._id} num_bathroom={post.num_bathroom} num_bedroom={post.num_bedroom} />
                        })
                      }
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

export default withTranslation(['common'])(HomePage);