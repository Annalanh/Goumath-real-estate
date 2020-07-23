import React from 'react';
import { Button, Select, Pagination } from 'antd';
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import IntroCard from '../../layouts/IntroCard'
import './style.css'

const { Option } = Select;

class FilterREPage extends React.Component {
    constructor(props) {
        super(props);
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
                                            <div class="kt-portlet" style={{ marginTop: "25px" }}>
                                                <div className="gou-toolbar">
                                                    <Button className="gou-toolbar-item gou-sell-filter-btn">Bán</Button>
                                                    <Button className="gou-toolbar-item gou-rent-filter-btn">Cho thuê</Button>
                                                    <Button className="gou-toolbar-item gou-need-sell-rent-filter-btn">Cần mua/thuê</Button>
                                                    <Select defaultValue="all" className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }}>
                                                        <Option value="all">Tất cả</Option>
                                                        <Option value="pending">Chờ duyệt</Option>
                                                        <Option value="approved">Đã duyệt</Option>
                                                        <Option value="refused">Bị từ chối</Option>
                                                        <Option value="expired">Hết hạn</Option>
                                                    </Select>
                                                    <Button onClick={this.handleClearFilters} className="gou-toolbar-item gou-clear-filter-btn">Xoá lọc</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                        <IntroCard />
                                    </div>
                                    <div className="row">
                                        <Pagination
                                            showSizeChanger
                                            // onShowSizeChange={onShowSizeChange}
                                            defaultCurrent={3}
                                            total={500}
                                        />
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

export default FilterREPage;
