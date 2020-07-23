import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import IntroCard from '../../layouts/IntroCard'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFilterRE = (e) => {
    e.preventDefault()
    console.log('alo')
  }

  render() {
    let path = this.props.path
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
                      Tìm kiếm bất động sản
                      <span className="kt-subheader-search__desc">Nhập thông tin để tìm nhà đất phù hợp với bạn</span>
                    </h3>
                    <form className="kt-form row" onSubmit={this.handleFilterRE}>
                      <div className="col-lg-10">
                      <div className="row gou-filter-container">
                        <div className="col-lg-4  gou-filter-item">
                          <Select placeholder='Thành phố'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="refused">Bị từ chối</Option>
                            <Option value="expired">Hết hạn</Option>
                          </Select>
                        </div>
                        <div className="col-lg-4 gou-filter-item">
                          <Select placeholder='Quận'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="refused">Bị từ chối</Option>
                            <Option value="expired">Hết hạn</Option>
                          </Select>
                        </div>
                        <div className="col-lg-4 gou-filter-item">
                          <Select placeholder='Bán'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="row gou-filter-container">
                        <div className="col-lg-4 gou-filter-item">
                          <Select placeholder='Loại nhà đất'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="refused">Bị từ chối</Option>
                            <Option value="expired">Hết hạn</Option>
                          </Select>
                        </div>
                        <div className="col-lg-4 gou-filter-item">
                          <Select placeholder='Giá'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="refused">Bị từ chối</Option>
                            <Option value="expired">Hết hạn</Option>
                          </Select>
                        </div>
                        <div className="col-lg-4 gou-filter-item">
                          <Select placeholder='Diện tích'>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                          </Select>
                        </div>
                      </div>
                      
                      </div>
                      <div className="col-lg-2 gou-filter-btn">
                        <button type="submit" className="btn btn-pill btn-upper btn-bold btn-font-sm kt-subheader-search__submit-btn">Tìm kiếm bất động sản</button>
                      </div> 
                    </form>
                  </div>
                </div>

                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                  <div className="row">
                    <div class="col-12 gou-card-list-title" style={{ marginBottom: "20px" }}>Tin thuê cho bạn</div>
                  </div>
                  <div className="row">
                    <IntroCard />
                    <IntroCard />
                    <IntroCard />
                    <IntroCard />
                  </div>
                  <div className="row">
                    <div class="col-12 gou-card-list-title" style={{ marginBottom: "20px" }}>Tin bán cho bạn</div>
                  </div>
                  <div className="row">
                    <IntroCard />
                    <IntroCard />
                    <IntroCard />
                    <IntroCard />
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

export default () => {
  let { path, url } = useRouteMatch();
  return (
    <HomePage path={path} />
  )
}
