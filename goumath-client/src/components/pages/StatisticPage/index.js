import React from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import { Select, Tag } from 'antd';
import { withTranslation } from 'react-i18next';
import './style.css'
import { provinces, districts } from '../../../utils/geoData'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'


const { Option } = Select;

function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
        <Tag color='gold' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}

class StatisticPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            province1: '',
            district1: '',
            category1: '',
            type1: '',
            month1: '',
            province2: '',
            chosenDistricts2: [],
            category2: '',
            type2: '',
            month2: '',
            province3: '',
            chosenDistricts3: [],
            category3: '',
            type3: '',
            month3: '',
            options: {
                chart: {
                    id: "basic-bar",
                    stacked: false,
                    toolbar: { show: false }
                },
                xaxis: {
                    categories: []
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
                            text: "Giá/Price",
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
                            text: "Số lượng tin/Amount of real estate",
                            style: {
                                color: "#247BA0"
                            }
                        },
                        seriesName: 'b'
                    }
                ],

            },
            series: [
                {
                    name: "Giá/Price",
                    data: [],
                    type: 'line'
                },
                {
                    name: "Số lượng/Amount",
                    data: [],
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
                    width: [3, 3],
                },
                colors: ['#FF1654', '#247BA0'],
            },
            series2: [
                {
                    name: "a",
                    data: []
                },
                {
                    name: "b",
                    data: []
                }
            ],
            options3: {
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
                    width: [3, 3],
                },
                colors: ['#FF1654', '#247BA0'],
            },
            series3: [
                {
                    name: "a",
                    data: [12, 23, 34, 45, 56, 67, 78, 89, 90]
                },
                {
                    name: "b",
                    data: [90, 89, 78, 56, 45, 23, 67, 89, 44]
                }
            ],
        };
    }

    handleChangeProvince1 = (value) => {
        if (value) this.setState({ province1: value, districts1: districts[value] })
        else this.setState({ province1: value, districts1: [] })
    }
    handleChangeDistrict1 = (value) => {
        this.setState({ district1: value }, () => {
            let { province1, district1, category1, type1, month1 } = this.state
            if (province1 && district1 && category1 && type1 && month1) this.showStats1({ province: province1, district: district1, category: category1, type: type1, month: month1 })
        })
    }
    handleChangeCategory1 = (value) => {
        this.setState({ category1: value }, () => {
            let { province1, district1, category1, type1, month1 } = this.state
            if (province1 && district1 && category1 && type1 && month1) this.showStats1({ province: province1, district: district1, category: category1, type: type1, month: month1 })
        })
    }
    handleChangeMonth1 = (value) => {
        this.setState({ month1: value }, () => {
            let { province1, district1, category1, type1, month1 } = this.state
            if (province1 && district1 && category1 && type1 && month1) this.showStats1({ province: province1, district: district1, category: category1, type: type1, month: month1 })
        })
    }
    handleChangeType1 = (e) => {
        let type1 = e.target.value
        this.setState({ type1 }, () => {
            let { province1, district1, category1, type1, month1 } = this.state
            if (province1 && district1 && category1 && type1 && month1) this.showStats1({ province: province1, district: district1, category: category1, type: type1, month: month1 })
        })
    }
    showStats1 = ({ province, district, category, type, month }) => {
        axios({
            url: 'http://localhost:8081/post/filter-one-district',
            method: 'POST',
            data: { province, district, category, type, month }
        }).then(res => {
            const resData = res.data
            const newSeries = []
            this.state.series.forEach((s, index) => {
                newSeries.push({ name: s.name, data: index == 0 ? resData.avgPrices : resData.postCounts, type: s.type });
            });

            this.setState({
                series: newSeries,
                options: { ...this.state.options, xaxis: { categories: resData.monthList } }
            })

        })
    }
    handleChangeProvince2 = (value) => {
        let districts2 = districts[value]
        districts2 = districts2.map(d => { return { value: d } })
        this.setState({ province2: value, districts2 })
    }
    handleChangeDistricts2 = (value) => {
        this.setState({ chosenDistricts2: value }, () => {
            let { province2, chosenDistricts2, category2, type2, month2 } = this.state
            if (province2 && chosenDistricts2.length > 0 && category2 && type2 && month2) this.showStats2({ province: province2, districts: chosenDistricts2, category: category2, type: type2, month: month2 })
        })
    }
    handleChangeCategory2 = (value) => {
        this.setState({ category2: value }, () => {
            let { province2, chosenDistricts2, category2, type2, month2 } = this.state
            if (province2 && chosenDistricts2.length > 0 && category2 && type2 && month2) this.showStats2({ province: province2, districts: chosenDistricts2, category: category2, type: type2, month: month2 })
        })
    }
    handleChangeMonth2 = (value) => {
        this.setState({ month2: value }, () => {
            let { province2, chosenDistricts2, category2, type2, month2 } = this.state
            if (province2 && chosenDistricts2.length > 0 && category2 && type2 && month2) this.showStats2({ province: province2, districts: chosenDistricts2, category: category2, type: type2, month: month2 })
        })
    }
    handleChangeType2 = (e) => {
        let type2 = e.target.value
        this.setState({ type2 }, () => {
            let { province2, chosenDistricts2, category2, type2, month2 } = this.state
            if (province2 && chosenDistricts2.length > 0 && category2 && type2 && month2) this.showStats2({ province: province2, districts: chosenDistricts2, category: category2, type: type2, month: month2 })
        })
    }
    showStats2 = ({ province, districts, category, type, month }) => {
        axios({
            url: 'http://localhost:8081/post/filter-many-districts',
            method: 'POST',
            data: { province, districts, category, type, month }
        }).then(res => {
            const resData = res.data

            const newSeries2 = []
            resData.forEach(r => {
                newSeries2.push({ name: r.district, data: r.avgPrices })
            })
            this.setState({
                series2: newSeries2,
                options2: { ...this.state.options2, xaxis: { categories: resData[0].monthList } }
            })
        })
    }
    handleChangeProvince3 = (value) => {
        let districts3 = districts[value]
        districts3 = districts3.map(d => { return { value: d } })
        console.log(districts3)
        this.setState({ province3: value, districts3 })
    }
    handleChangeDistricts3 = (value) => {
        this.setState({ chosenDistricts3: value }, () => {
            let { province3, chosenDistricts3, category3, type3, month3 } = this.state
            if (province3 && chosenDistricts3.length > 0 && category3 && type3 && month3) this.showStats3({ province: province3, districts: chosenDistricts3, category: category3, type: type3, month: month3 })
        })
    }
    handleChangeCategory3 = (value) => {
        this.setState({ category3: value }, () => {
            let { province3, chosenDistricts3, category3, type3, month3 } = this.state
            if (province3 && chosenDistricts3.length > 0 && category3 && type3 && month3) this.showStats3({ province: province3, districts: chosenDistricts3, category: category3, type: type3, month: month3 })
        })
    }
    handleChangeMonth3 = (value) => {
        this.setState({ month3: value }, () => {
            let { province3, chosenDistricts3, category3, type3, month3 } = this.state
            if (province3 && chosenDistricts3.length > 0 && category3 && type3 && month3) this.showStats3({ province: province3, districts: chosenDistricts3, category: category3, type: type3, month: month3 })
        })
    }
    handleChangeType3 = (e) => {
        let type3 = e.target.value
        this.setState({ type3 }, () => {
            let { province3, chosenDistricts3, category3, type3, month3 } = this.state
            if (province3 && chosenDistricts3.length > 0 && category3 && type3 && month3) this.showStats3({ province: province3, districts: chosenDistricts3, category: category3, type: type3, month: month3 })
        })
    }
    showStats3 = ({ province, districts, category, type, month }) => {
        axios({
            url: 'http://localhost:8081/post/filter-many-districts',
            method: 'POST',
            data: { province, districts, category, type, month }
        }).then(res => {
            const resData = res.data

            const newSeries3 = []
            resData.forEach(r => {
                newSeries3.push({ name: r.district, data: r.postCounts })
            })
            this.setState({
                series3: newSeries3,
                options3: { ...this.state.options3, xaxis: { categories: resData[0].monthList } }
            })
        })
    }

    render() {
        const { t } = this.props
        let { districts1, districts2, districts3 } = this.state
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
                                                        <h3 className="kt-portlet__head-title">1. {t('statistic:Price and the amount of real estate in a specific district')}</h3>
                                                    </div>
                                                </div>
                                                <div className="kt-portlet__body">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select className='gou-antd-select' defaultValue="" onChange={this.handleChangeProvince1}>
                                                                <Option value="">{t('province')}</Option>
                                                                {provinces && provinces.map(province => { return (<Option value={province}>{province}</Option>) })}
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select className='gou-antd-select' defaultValue="" onChange={this.handleChangeDistrict1}>
                                                                <Option value="">{t('district')}</Option>
                                                                {districts1 && districts1.map(district => { return (<Option value={district}>{district}</Option>) })}
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select className='gou-antd-select' defaultValue="" onChange={this.handleChangeCategory1}>
                                                                <Option value="">{t('category')}</Option>
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
                                                                <Option value="resindental-land">{t('common:resindental land')}</Option>
                                                                <Option value="in-alley-house">{t('common:in alley house')}</Option>
                                                                <Option value="shophouse">{t('common:shophouse')}</Option>
                                                                <Option value="ground">{t('common:ground')}</Option>
                                                                <Option value="office">{t('common:office')}</Option>
                                                                <Option value="farmland">{t('common:farmland')}</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select defaultValue="" onChange={this.handleChangeMonth1}>
                                                                <Option value="">{t('month')}</Option>
                                                                <Option value={3}>3 {t('month')}</Option>
                                                                <Option value={6}>6 {t('month')}</Option>
                                                                <Option value={9}>9 {t('month')}</Option>
                                                                <Option value={12}>12 {t('month')}</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="row gou-type-container">
                                                        <div class="col-lg-6">
                                                            <div class="kt-radio-inline">
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="type1" value="sell" onChange={this.handleChangeType1} /> {t('sell')}
                                                                    <span></span>
                                                                </label>
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="type1" value="rent" onChange={this.handleChangeType1} /> {t('rent')}
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
                                                        <h3 className="kt-portlet__head-title">2. {t('statistic:Compare real estate prices in diffrent districts')} </h3>
                                                    </div>
                                                </div>
                                                <div className="kt-portlet__body">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select className='gou-antd-select' defaultValue="" onChange={this.handleChangeProvince2}>
                                                                <Option value="">{t('province')}</Option>
                                                                {provinces && provinces.map(province => { return (<Option value={province}>{province}</Option>) })}
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select
                                                                mode="multiple"
                                                                tagRender={tagRender}
                                                                style={{ width: '100%' }}
                                                                options={districts2}
                                                                onChange={this.handleChangeDistricts2}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select className='gou-antd-select' defaultValue="" onChange={this.handleChangeCategory2}>
                                                                <Option value="">{t('category')}</Option>
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
                                                                <Option value="resindental-land">{t('common:resindental land')}</Option>
                                                                <Option value="in-alley-house">{t('common:in alley house')}</Option>
                                                                <Option value="shophouse">{t('common:shophouse')}</Option>
                                                                <Option value="ground">{t('common:ground')}</Option>
                                                                <Option value="office">{t('common:office')}</Option>
                                                                <Option value="farmland">{t('common:farmland')}</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <Select defaultValue="" onChange={this.handleChangeMonth2}>
                                                                <Option value="">{t('month')}</Option>
                                                                <Option value={3}>3 {t('month')}</Option>
                                                                <Option value={6}>6 {t('month')}</Option>
                                                                <Option value={9}>9 {t('month')}</Option>
                                                                <Option value={12}>12 {t('month')}</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="row gou-type-container">
                                                        <div class="col-lg-6">
                                                            <div class="kt-radio-inline">
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="type2" onChange={this.handleChangeType2} value="sell" /> {t('sell')}
                                                                    <span></span>
                                                                </label>
                                                                <label class="kt-radio">
                                                                    <input type="radio" name="type2" onChange={this.handleChangeType2} value="rent" /> {t('rent')}
                                                                    <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div class="col-lg-12">
                                                            <div>
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

export default withTranslation(['common', 'statistic'])(StatisticPage);
