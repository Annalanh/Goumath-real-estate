import React from 'react';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import { provinces, districts } from '../../../utils/geoData'

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
      areaRange: null
    }
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
    let { province, districts1 } = this.state
    return (
      <>
        <MobileNavBar />
        <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
            <AsideBar />

            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
              <NavBar />

              <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

                <div className="kt-subheader-search ">
                  <div className="kt-container  kt-container--fluid ">
                    <h3 className="kt-subheader-search__title">
                      {t('search for appropriate real estate')}
                      <span className="kt-subheader-search__desc">{t('fill in the form to')} {t('search for appropriate real estate')}</span>
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
                              <Option value="sell">Sell</Option>
                              <Option value="rent">Rent</Option>
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
                              <Option value="deal">Thoa thuan</Option>
                              <Option value="lt500">less than 500 trieu</Option>
                              <Option value="500to800"> 500 - 800 trieu</Option>
                              <Option value="800to1000"> 800 trieu - 1 ty</Option>
                              <Option value="1000to2000"> 1 - 2 ty</Option>
                              <Option value="2000to3000"> 2 - 3 ty</Option>
                              <Option value="3000to5000"> 3 - 5 ty</Option>
                              <Option value="5000to7000"> 5 - 7 ty</Option>
                              <Option value="7000to10000"> 7 - 10 ty</Option>
                              <Option value="10000to20000"> 10 - 20 ty</Option>
                              <Option value="gt20000"> more than 20 ty</Option>
                            </Select>
                          </div>
                          <div className="col-lg-4 gou-filter-item">
                            <Select placeholder={t('area')} style={{ width: '100%' }} onChange={this.handleChangeArea}>
                              <Option value="null">{t('area')}</Option>
                              <Option value="lt30"> less than 30 m2</Option>
                              <Option value="30to50"> 30 - 50 m2</Option>
                              <Option value="50to80"> 50 - 80 m2</Option>
                              <Option value="80to100"> 80 - 100 m2</Option>
                              <Option value="100to150"> 100 - 150 m2</Option>
                              <Option value="150to200"> 150 - 200 m2</Option>
                              <Option value="200to300"> 200 - 300 m2</Option>
                              <Option value="gt300"> more than 300 m2</Option>
                            </Select>
                          </div>
                        </div>

                      </div>
                      <div className="col-lg-2 gou-filter-btn">
                        <button type="submit" className="btn btn-pill btn-upper btn-bold btn-font-sm kt-subheader-search__submit-btn">{t('search')}</button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                  <div className="row">
                    <div class="col-12 gou-card-list-title" style={{ marginBottom: "20px" }}>Tin thuê cho bạn</div>
                  </div>
                  <div className="row">

                  </div>
                  <div className="row">
                    <div class="col-12 gou-card-list-title" style={{ marginBottom: "20px" }}>Tin bán cho bạn</div>
                  </div>
                  <div className="row">

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