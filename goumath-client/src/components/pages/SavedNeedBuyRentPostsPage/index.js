import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Button, Select, Pagination } from 'antd';
import { generateAddress } from '../../../utils/address'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'
import NeedBuyRentIntroCard from '../../layouts/NeedBuyRentIntroCard'


const { Option } = Select;

class SavedNeedBuyRentPostsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 5,
                total: ''
            },
            filters: {
                type: null,
                publish_status: null,
            },
            loading: false
        }
    }

    componentDidMount() {
        const { pagination, filters } = this.state
        this.fetch({ pagination, filters })
    }

    fetch = (params = {}) => {
        let userId = localStorage.getItem('userId')
        this.setState({
            loading: true
        })
        axios.post(`http://localhost:8081/user/favorite-posts?current=${params.pagination.current}&pageSize=${params.pagination.pageSize}&type=${params.filters.type}&publish_status=${params.filters.publish_status}&userId=${userId}&all_types=need-buy-rent`).then(res => {
            let resData = res.data
            let resFavoritePosts = resData.favorite_posts

            let favoritePosts = []

            resFavoritePosts.forEach(post => {
                let { _id, type, title, price, lat, lon, radius, area, num_floor, num_bathroom, num_bedroom, direction, createdAt } = post
                favoritePosts.push({ type, title, price, lat, lon, radius, area, num_floor, num_bathroom, num_bedroom, direction, createdAt, _id })
            })
            this.setState({
                loading: false,
                data: favoritePosts,
                pagination: {
                    ...params.pagination,
                    total: resData.totalPostCount,
                },
                filters: {
                    ...params.filters
                }
            });
            console.log(res)
        });
    }

    handlePageNumberChange = (current, pageSize) => {
        let pagination = { current, pageSize }
        this.fetch({
            pagination,
            filters: this.state.filters,
        });
    };

    handleShowSizeChange = (current, pageSize) => {
        let pagination = { current, pageSize }
        this.fetch({
            pagination,
            filters: this.state.filters,
        });
    }

    handleFilterNeedBuy = () => {
        let pagination = {
            ...this.state.pagination,
            current: 1
        }
        let filters = {
            ...this.state.filters,
            type: 'need buy'
        }
        this.fetch({ pagination, filters })
    }

    handleFilterNeedRent = () => {
        let pagination = {
            ...this.state.pagination,
            current: 1
        }
        let filters = {
            ...this.state.filters,
            type: 'need rent'
        }
        this.fetch({ pagination, filters })
    }

    handleClearFilters = () => {
        let pagination = {
            ...this.state.pagination,
            current: 1
        }
        let filters = {
            type: null,
            publish_status: null
        }
        this.fetch({ pagination, filters })
    }

    handleFilterPublishStatus = (value) => {
        let pagination = {
            ...this.state.pagination,
            current: 1
        }
        let filters = {
            ...this.state.filters,
            publish_status: value
        }
        this.fetch({ pagination, filters })
    }

    render() {
        let { data, pagination } = this.state
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
                                            <div class="kt-portlet" style={{ marginTop: "25px" }}>
                                                <div className="gou-toolbar">
                                                    <Button className="gou-toolbar-item gou-need-sell-rent-filter-btn" onClick={this.handleFilterNeedBuy}>{t('common:need buy')}</Button>
                                                    <Button className="gou-toolbar-item gou-need-sell-rent-filter-btn" onClick={this.handleFilterNeedRent}>{t('common:need rent')}</Button>
                                                    <Select defaultValue="null" className="gou-toolbar-item gou-publish-status-filter-select" onChange={this.handleFilterPublishStatus} style={{ width: 120 }}>
                                                        <Option value="null">{t('common:all')}</Option>
                                                        <Option value="pending">{t('common:pending')}</Option>
                                                        <Option value="approved">{t('common:approved')}</Option>
                                                        <Option value="refused">{t('common:refused')}</Option>
                                                        <Option value="expired">{t('common:expired')}</Option>
                                                    </Select>
                                                    <Button onClick={this.handleClearFilters} className="gou-toolbar-item gou-clear-filter-btn">{t('common:clear filter')}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                    
                                            data.map(post => {
                                                return (
                                                    <NeedBuyRentIntroCard
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
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row">
                                        <Pagination
                                            showSizeChanger
                                            defaultCurrent={pagination.current}
                                            defaultPageSize={pagination.pageSize}
                                            total={pagination.total}
                                            onChange={this.handlePageNumberChange}
                                            onShowSizeChange={this.handleShowSizeChange}
                                            pageSizeOptions={['5', '10', '20', '50', '100']}
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

export default withTranslation(['common'])(SavedNeedBuyRentPostsPage);
