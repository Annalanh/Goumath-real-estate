import React from 'react';
import { withTranslation } from 'react-i18next';
import Chart from "react-apexcharts";
import { Select, Tag } from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;
const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
        <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}

class StatisticPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    id: "basic-bar",
                    stacked: false,
                    toolbar: { show: false }
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                },
                colors: ['#FF1654', '#247BA0'],
                yaxis: [
                    {
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#FF1654"
                        },
                        labels: {
                            style: {
                                colors: "#FF1654"
                            }
                        },
                        title: {
                            text: "Series A",
                            style: {
                                color: "#FF1654"
                            }
                        },
                        seriesName: 'a',
                    },
                    {
                        opposite: true,
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#247BA0"
                        },
                        labels: {
                            style: {
                                colors: "#247BA0"
                            }
                        },
                        title: {
                            text: "Series B",
                            style: {
                                color: "#247BA0"
                            }
                        },
                        seriesName: 'b'
                    }
                ],

            },
            series: [{
                name: "a",
                data: [4, 5, 5, 6, 5, 7, 8, 10],
                type: 'line'
            },
            {
                name: "b",
                data: [300, 400, 450, 500, 490, 600, 700, 910],
                type: 'bar'
            },
            ],
            options2: {
                chart: {
                    id: "basic-line",
                    stacked: false,
                    toolbar: { show: false },
                    type: 'line'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                },
                stroke: {
                    width: [3,3],
                },
                colors: ['#FF1654', '#247BA0'],
            },
            series2: [{
                name: "a",
                data: [40, 50, 50, 60, 50, 70, 80, 100],
            },
            {
                name: "b",
                data: [300, 400, 450, 500, 490, 600, 700, 910],
            }],
        };
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
                                                <div className="kt-portlet__head">
                                                    <div className="kt-portlet__head-label">
                                                        <h3 className="kt-portlet__head-title">1. Tham khoả giá bán/thuê và số lượng chào bán.thuê theo từng khu vực</h3>
                                                    </div>
                                                </div>
                                                <div className="kt-portlet__body">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select placeholder="Huyện">
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select placeholder="Huyện">
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select defaultValue="6-months">                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="3-months">3 tháng</Option>
                                                                <Option value="6-months">6 tháng</Option>
                                                                <Option value="9-months">9 tháng</Option>
                                                                <Option value="1-year">1 năm</Option>
                                                                <Option value="2-year">2 năm</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="row gou-type-container">
                                                        <div class="col-lg-6">
                                                            <div class="kt-radio-inline">
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" /> Bán
                                                                    <span></span>
                                                                </label>
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" checked="" /> Cho thuê
                                                                    <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div class="col-lg-12">
                                                            <div className="mixed-chart">
                                                                <Chart
                                                                    options={this.state.options}
                                                                    series={this.state.series} width="500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="kt-portlet" style={{ marginTop: "25px" }}>
                                                <div className="kt-portlet__head">
                                                    <div className="kt-portlet__head-label">
                                                        <h3 className="kt-portlet__head-title">2. So sánh giá bán/thuê của từng khu vực</h3>
                                                    </div>
                                                </div>
                                                <div className="kt-portlet__body">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select
                                                                mode="multiple"
                                                                tagRender={tagRender}
                                                                defaultValue={['gold', 'cyan']}
                                                                style={{ width: '100%' }}
                                                                options={options}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select placeholder="Huyện">
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select defaultValue="6-months">
                                                                <Option value="3-months">3 tháng</Option>
                                                                <Option value="6-months">6 tháng</Option>
                                                                <Option value="9-months">9 tháng</Option>
                                                                <Option value="1-year">1 năm</Option>
                                                                <Option value="2-year">2 năm</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="row gou-type-container">
                                                        <div class="col-lg-6">
                                                            <div class="kt-radio-inline">
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" /> Bán
                                                                    <span></span>
                                                                </label>
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" checked="" /> Cho thuê
                                                                    <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="kt-portlet" style={{ marginTop: "25px" }}>
                                                <div className="kt-portlet__head">
                                                    <div className="kt-portlet__head-label">
                                                        <h3 className="kt-portlet__head-title">3. So sánh số lượng chào bán/thuê của từng khu vực</h3>
                                                    </div>
                                                </div>
                                                <div className="kt-portlet__body">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select placeholder="Huyện">
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select placeholder="Huyện">
                                                                <Option value="all">Tất cả</Option>
                                                                <Option value="pending">Chờ duyệt</Option>
                                                                <Option value="approved">Đã duyệt</Option>
                                                                <Option value="refused">Bị từ chối</Option>
                                                                <Option value="expired">Hết hạn</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select defaultValue="6-months">
                                                                <Option value="3-months">3 tháng</Option>
                                                                <Option value="6-months">6 tháng</Option>
                                                                <Option value="9-months">9 tháng</Option>
                                                                <Option value="1-year">1 năm</Option>
                                                                <Option value="2-year">2 năm</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="row gou-type-container">
                                                        <div class="col-lg-6">
                                                            <div class="kt-radio-inline">
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" /> Bán
                                                                    <span></span>
                                                                </label>
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="gender" checked="" /> Cho thuê
                                                                    <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div class="col-lg-12">
                                                            <div className="mixed-chart">
                                                                <Chart
                                                                    options={this.state.options2}
                                                                    series={this.state.series2} 
                                                                    width="500px"
                                                                />
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

export default StatisticPage;
