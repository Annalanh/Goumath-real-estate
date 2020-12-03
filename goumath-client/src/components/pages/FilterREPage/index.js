import React from 'react';
import axios from 'axios';
import { Button, Select, Pagination } from 'antd';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import { withTranslation } from 'react-i18next';
import SellRentIntroCard from '../../layouts/SellRentIntroCard'
import NeedBuyRentIntroCard from '../../layouts/NeedBuyRentIntroCard'
import { provinces, districts } from '../../../utils/geoData'
import { generateAddress } from '../../../utils/address'

const { Option } = Select;

class FilterREPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            pagination: {
                current: 1,
                pageSize: 10,
                total: 3
            },
            sort: null,
            districts1: [],
            type: null,
            category: null,
            province: null,
            district: null,
            priceRange: null,
            areaRange: null
        }
    }
    componentDidMount = () => {
        let currentLocation = this.props.location.pathname
        let params = currentLocation.split("/")
        let province = params[2]
        let district = params[3]
        let type = params[4]
        let category = params[5]
        let priceRange = params[6]
        let areaRange = params[7]
        this.setState({ loading: false, type, category, priceRange, areaRange, province, district, districts1: districts[province] }, () => {
            let { pagination, sort } = this.state
            axios({
                url: `http://localhost:8081/post/all-posts?current=${pagination.current}&pageSize=${pagination.pageSize}&type=${type}&category=${category}&priceRange=${priceRange}&areaRange=${areaRange}&province=${province}&district=${district}&sort=${sort}&role=null`,
                method: "GET"
            }).then(res => {
                let resData = res.data
                console.log(resData)
                this.setState({ data: this.renderData(resData), pagination: { ...this.state.pagination, total: resData.totalCount } })
            })
        })
    }
    handleChangeProvince = (value) => {
        if (value) this.setState({ province: value, districts1: districts[value], district: '' })
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
    handleChangeSort = (value) => {
        if (value) {
            let { type, category, priceRange, areaRange, province, district, pagination } = this.state
            axios({
                url: `http://localhost:8081/post/all-posts?current=${pagination.current}&pageSize=${pagination.pageSize}&type=${type}&category=${category}&priceRange=${priceRange}&areaRange=${areaRange}&province=${province}&district=${district}&sort=${value}&role=null`,
                method: "GET"
            }).then(res => {
                let resData = res.data
                this.setState({ data: this.renderData(resData), pagination: { ...pagination, total: resData.totalCount }, sort: value })
            })
        } else {
            this.setState({ sort: null })
        }

    }
    handlePagiChange = (current, pageSize) => {
        let pagination = { current, pageSize }

        let { type, category, priceRange, areaRange, province, district, sort } = this.state
        axios({
            url: `http://localhost:8081/post/all-posts?current=${pagination.current}&pageSize=${pagination.pageSize}&type=${type}&category=${category}&priceRange=${priceRange}&areaRange=${areaRange}&province=${province}&district=${district}&sort=${sort}&role=null`,
            method: "GET"
        }).then(res => {
            let resData = res.data
            this.setState({ data: this.renderData(resData), pagination: { ...pagination, total: resData.totalCount } })
        })
    };
    handleFilter = () => {
        let { type, category, priceRange, areaRange, province, district, pagination, sort } = this.state
        axios({
            url: `http://localhost:8081/post/all-posts?current=1&pageSize=${pagination.pageSize}&type=${type}&category=${category}&priceRange=${priceRange}&areaRange=${areaRange}&province=${province}&district=${district}&sort=${sort}&role=null`,
            method: "GET"
        }).then(res => {
            let resData = res.data
            console.log("data", resData)
            this.setState({ data: this.renderData(resData), pagination: { ...this.state.pagination, total: resData.totalCount, current: 1 } }, () => { console.log(this.state) })
        })
    }
    renderData = (resData) => {
        let data = []
        resData.results.forEach(post => {
            if (post.type == "sell" || post.type == "rent") {
                let { title, type, area, price, list_img, _id, num_bathroom, num_bedroom } = post
                let listAddress = [post.house_no, post.street, post.ward, post.district, post.province]
                let address = generateAddress(listAddress)
                data.push({ address, title, type, area, price, list_img, _id, num_bathroom, num_bedroom })
            } else {
                let { _id, type, title, price, lat, lon, radius, area, num_floor, num_bathroom, num_bedroom, direction, createdAt } = post
                data.push({ _id, type, title, price, lat, lon, radius, area, num_floor, num_bathroom, num_bedroom, direction, createdAt })
            }

        })
        return data
    }
    render() {
        const { t } = this.props
        let { districts1, data, pagination, loading, province, district, type, category, priceRange, areaRange } = this.state

        return (
            <>
                <MobileNavBar />
                <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
                        <AsideBar />

                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                            <NavBar />

                            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
                                {
                                    loading ? (
                                        <div>loading</div>
                                    ) : (
                                            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div class="kt-portlet" style={{ marginTop: "25px" }}>
                                                            <div className="gou-toolbar">
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }} placeholder={t('post type')} onChange={this.handleChangeType} defaultValue={type}>
                                                                    <Option value="null">{t('post type')}</Option>
                                                                    <Option value="sell">{t('sell')}</Option>
                                                                    <Option value="rent">{t('rent')}</Option>
                                                                    <Option value="need buy">{t('need buy')}</Option>
                                                                    <Option value="need rent">{t('need rent')}</Option>
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 200 }} placeholder={t('category')} onChange={this.handleChangeCategory} defaultValue={category}>
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
                                                                    <Option value="resindental-land">{t('common:resindental land')}</Option>
                                                                    <Option value="in-alley-house">{t('common:in alley house')}</Option>
                                                                    <Option value="shophouse">{t('common:shophouse')}</Option>
                                                                    <Option value="ground">{t('common:ground')}</Option>
                                                                    <Option value="office">{t('common:office')}</Option>
                                                                    <Option value="farmland">{t('common:farmland')}</Option>
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }} placeholder={t('area')} onChange={this.handleChangeArea} defaultValue={areaRange}>
                                                                    <Option value="null">{t('area')}</Option>
                                                                    <Option value="lt30">&#8804; 30 m2</Option>
                                                                    <Option value="30to50">30 - 50 m2</Option>
                                                                    <Option value="50to80">50 - 80 m2</Option>
                                                                    <Option value="80to100">80 - 100 m2</Option>
                                                                    <Option value="100to150">100 - 150 m2</Option>
                                                                    <Option value="150to200">150 - 200 m2</Option>
                                                                    <Option value="200to300">200 - 300 m2</Option>
                                                                    <Option value="gt300">&#8805; 300 m2</Option>
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 130 }} placeholder={t('price')} onChange={this.handleChangePrice} defaultValue={priceRange}>
                                                                    <Option value="null">{t('price')}</Option>
                                                                    <Option value="deal">{t('deal')}</Option>
                                                                    <Option value="lt500">&#8804; 500 {t('million')}</Option>
                                                                    <Option value="500to800">500 - 800 {t('million')}</Option>
                                                                    <Option value="800to1000">800 {t('million')} - 1 {t('billion')}</Option>
                                                                    <Option value="1000to2000">1 - 2 {t('billion')}</Option>
                                                                    <Option value="2000to3000">2 - 3 {t('billion')}</Option>
                                                                    <Option value="3000to5000">3 - 5 {t('billion')}</Option>
                                                                    <Option value="5000to7000">5 - 7 {t('billion')}</Option>
                                                                    <Option value="7000to10000">7 - 10 {t('billion')}</Option>
                                                                    <Option value="10000to20000">10 - 20 {t('billion')}</Option>
                                                                    <Option value="gt20000">&#8805; 20 {t('billion')}</Option>
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 150 }} placeholder={t('province')} onChange={this.handleChangeProvince} defaultValue={province}>
                                                                    <Option value="null">{t('province')}</Option>
                                                                    {provinces && provinces.map(province => { return (<Option value={province}>{province}</Option>) })}
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 120 }} placeholder={t('district')} onChange={this.handleChangeDistrict} defaultValue={district}>
                                                                    <Option value="null">{t('district')}</Option>
                                                                    {districts1 && districts1.map(district => { return (<Option value={district}>{district}</Option>) })}
                                                                </Select>
                                                                <Select className="gou-toolbar-item gou-publish-status-filter-select" style={{ width: 180 }} placeholder={t('sort')} onChange={this.handleChangeSort}>
                                                                    <Option value="null">{t('sort')}</Option>
                                                                    <Option value="asc-price">{t('price')} ({t('low to high')})</Option>
                                                                    <Option value="desc-price">{t('price')} ({t('high to low')})</Option>
                                                                    <Option value="asc-area">{t('area')} ({t('small to large')})</Option>
                                                                    <Option value="desc-area">{t('area')} ({t('large to small')})</Option>
                                                                    <Option value="newest">{t('newest')}</Option>
                                                                </Select>
                                                                <button className="btn gou-save-btn" onClick={this.handleFilter}>{t('search')}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {
                                                        data.map(post => {
                                                            if (post.type == "sell" || post.type == "rent") {
                                                                return <SellRentIntroCard title={post.title} area={post.area} price={post.price} address={post.address} type={post.type} list_img={post.list_img} postId={post._id} num_bathroom={post.num_bathroom} num_bedroom={post.num_bedroom} />
                                                            } else {
                                                                return <NeedBuyRentIntroCard
                                                                    postId={post._id}
                                                                    type={post.type}
                                                                    title={post.title}
                                                                    price={post.price}
                                                                    lat={post.lat}
                                                                    lon={post.lon}
                                                                    radius={post.radius}
                                                                    area={post.area}
                                                                    num_floor={post.num_floor}
                                                                    num_bathroom={post.num_bathroom}
                                                                    num_bedroom={post.num_bedroom}
                                                                    createdAt={post.createdAt.split("T")[0]}
                                                                    direction={post.direction}
                                                                />
                                                            }
                                                        })
                                                    }
                                                </div>
                                                <div className="row">
                                                    <Pagination
                                                        showSizeChanger
                                                        defaultCurrent={1}
                                                        current={pagination.current}
                                                        defaultPageSize={pagination.pageSize}
                                                        total={pagination.total}
                                                        onChange={this.handlePagiChange}
                                                        onShowSizeChange={this.handlePagiChange}
                                                        pageSizeOptions={['1', '10', '20', '50', '100']}
                                                    />
                                                </div>
                                            </div>

                                        )
                                }
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withTranslation(['common'])(FilterREPage);
