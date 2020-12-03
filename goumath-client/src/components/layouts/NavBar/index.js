import React from 'react'
import axios from 'axios'
import { Socket, SocketContext, Event } from 'react-socket-io';
import { withTranslation } from 'react-i18next';
import { isLogin, logout } from '../../../utils/auth'

const uri = 'http://localhost:8081/';
const options = { transports: ['websocket'] };

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notiList: [],
            notiCount: 0,
            en_active: "",
            vn_active: "",
            homepage_active: "",
            sell_active: "",
            rent_active: "",
            utility_active: ""
        }
        this.handleVNTrans = this.handleVNTrans.bind(this);
        this.handleEngTrans = this.handleEngTrans.bind(this);

    }
    componentDidMount = () => {
        if(localStorage.getItem("i18nextLng") == "vn"){
            this.setState({ en_active: "", vn_active: "kt-nav__item--active"})
        }else{
            this.setState({ en_active: "kt-nav__item--active", vn_active: ""})
        }
        let currentPath = window.location.pathname
        let currentPathEls = currentPath.split("/")

        if(currentPathEls[1] == ""){
            this.setState({ homepage_active: "kt-menu__item--active", sell_active: "", rent_active: "", utility_active: "" })
        }else if(currentPathEls[1] == "search" && currentPathEls[4] == "sell"){
            this.setState({ homepage_active: "", sell_active: "kt-menu__item--active", rent_active: "", utility_active: "" })
        }else if(currentPathEls[1] == "search" && currentPathEls[4] == "rent"){
            this.setState({ homepage_active: "", sell_active: "", rent_active: "kt-menu__item--active", utility_active: "" })
        }else if(currentPathEls[1] == "calculate-loan" || currentPathEls[1] == "statistic" || currentPathEls[1] == "predict"){
            this.setState({ homepage_active: "", sell_active: "", rent_active: "", utility_active: "kt-menu__item--active" })
        }

        console.log(currentPathEls)
        axios({
            url: `http://localhost:8081/notification/all-notis?userId=${localStorage.getItem('userId')}`,
            method: "GET"
        }).then(res => {
            let resData = res.data
            let notiCount = 0
            resData.forEach(noti => {
                if(!noti.status) notiCount += 1
            })
            resData = resData.reverse()
            this.setState({ notiList: resData, notiCount })
        })
    }
    handleEventResponse = (res) => {
        if (res.authorId == localStorage.getItem('userId')) {
            let { notiList, notiCount } = this.state
            let newNotiList = []
            newNotiList.push(res)
            notiList.forEach(noti => {
                newNotiList.push(noti)
            })
            this.setState({ notiList: newNotiList, notiCount: notiCount + 1 })
        }
    }

    handleClickNoti = (noti) => {
        if (!noti.status) {
            axios({
                url: `http://localhost:8081/notification/update?notiId=${noti._id}`,
                method: "GET"
            }).then(res => {
                let resData = res.data
                if (resData.status) {
                    let notiCount = this.state.notiCount
                    this.setState({ notiCount: notiCount - 1 }, () => {
                        window.location.href = `http://localhost:3000/manage-posts/update/${noti.postType}/${noti.postId}`
                    })
                }
            })
        }else{
            window.location.href = `http://localhost:3000/manage-posts/update/${noti.postType}/${noti.postId}`
        }

    }

    handleLogout() {
        logout()
        window.location.href = '/'
    }

    handleEngTrans() {
        const { i18n } = this.props
        i18n.changeLanguage('en');
        localStorage.setItem('i18nextLng', 'en')
        this.setState({ en_active: "kt-nav__item--active", vn_active: ""})
    }

    handleVNTrans() {
        const { i18n } = this.props
        i18n.changeLanguage('vn');
        localStorage.setItem('i18nextLng', 'vn')
        this.setState({ en_active: "", vn_active: "kt-nav__item--active"})
    }

    handleClickLoginIcon() {
        window.location.href = "/login"
    }

    render() {
        const { t } = this.props
        const { en_active, vn_active, homepage_active, sell_active, rent_active, utility_active } = this.state
        return (
            <>
                <Event event="respond:test" handler={this.handleEventResponse} />
                <Event event="noti:respond" handler={this.handleEventResponse} />
                <div id="kt_header" className="kt-header kt-grid kt-grid--ver  kt-header--fixed" style={{backgroundColor:"#1a223c"}}>

                    <div className="kt-header__brand kt-grid__item  " id="kt_header_brand" style={{backgroundColor: "#1a223c"}}>
                        <div className="kt-header__brand-logo">
                            <a href="index.html">
                                <img alt="Logo" src="/assets/gou-imgs/logo.png" style={{width:"100%", height: "100%"}} />
                            </a>
                        </div>
                    </div>

                    <h3 className="kt-header__title kt-grid__item" style={{color: "white"}}>
                        Goumath
                </h3>

                    <button className="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i className="la la-close"></i></button>

                    <div className="kt-header-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_header_menu_wrapper">
                        <div id="kt_header_menu" className="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default ">
                            <ul className="kt-menu__nav ">
                                <li className= {`kt-menu__item  ${homepage_active}`} aria-haspopup="true"><a href="/" className="kt-menu__link "><span className="kt-menu__link-text">{t('home page')}</span></a></li>
                                <li className={`kt-menu__item  kt-menu__item--submenu kt-menu__item--rel ${sell_active}`} data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                    <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">{t('common:sell')}</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                    <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                        <ul className="kt-menu__subnav">
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/apartment/null/null`}><span className="kt-menu__link-text">{t('common:apartment')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/house/null/null`}><span className="kt-menu__link-text">{t('common:house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/mansion/null/null`}><span className="kt-menu__link-text">{t('common:mansion')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/town-house/null/null`}><span className="kt-menu__link-text">{t('common:town house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/ground-project/null/null`}><span className="kt-menu__link-text">{t('common:ground project')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/frontage-ground/null/null`}><span className="kt-menu__link-text">{t('common:frontage ground')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/warehouse/null/null`}><span className="kt-menu__link-text">{t('common:warehouse')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/hotel/null/null`}><span className="kt-menu__link-text">{t('common:hotel')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/store/null/null`}><span className="kt-menu__link-text">{t('common:store')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/boarding-house/null/null`}><span className="kt-menu__link-text">{t('common:boarding house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/residental-land/null/null`}><span className="kt-menu__link-text">{t('common:residental land')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/in-alley-house/null/null`}><span className="kt-menu__link-text">{t('common:in alley house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/shophouse/null/null`}><span className="kt-menu__link-text">{t('common:shophouse')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/ground/null/null`}><span className="kt-menu__link-text">{t('common:ground')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/office/null/null`}><span className="kt-menu__link-text">{t('common:office')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/sell/farmland/null/null`}><span className="kt-menu__link-text">{t('common:farmland')}</span></a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={`kt-menu__item  kt-menu__item--submenu kt-menu__item--rel ${rent_active}`} data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                    <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">{t('common:rent')}</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                    <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                        <ul className="kt-menu__subnav">
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/apartment/null/null`}><span className="kt-menu__link-text">{t('common:apartment')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/house/null/null`}><span className="kt-menu__link-text">{t('common:house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/mansion/null/null`}><span className="kt-menu__link-text">{t('common:mansion')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/town-house/null/null`}><span className="kt-menu__link-text">{t('common:town house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/ground-project/null/null`}><span className="kt-menu__link-text">{t('common:ground project')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/frontage-ground/null/null`}><span className="kt-menu__link-text">{t('common:frontage ground')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/warehouse/null/null`}><span className="kt-menu__link-text">{t('common:warehouse')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/hotel/null/null`}><span className="kt-menu__link-text">{t('common:hotel')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/store/null/null`}><span className="kt-menu__link-text">{t('common:store')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/boarding-house/null/null`}><span className="kt-menu__link-text">{t('common:boarding house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/residental-land/null/null`}><span className="kt-menu__link-text">{t('common:residental land')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/in-alley-house/null/null`}><span className="kt-menu__link-text">{t('common:in alley house')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/shophouse/null/null`}><span className="kt-menu__link-text">{t('common:shophouse')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/ground/null/null`}><span className="kt-menu__link-text">{t('common:ground')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/office/null/null`}><span className="kt-menu__link-text">{t('common:office')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href={`/search/null/null/rent/farmland/null/null`}><span className="kt-menu__link-text">{t('common:farmland')}</span></a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={`kt-menu__item  kt-menu__item--submenu kt-menu__item--rel ${utility_active}`} data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                    <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">{t('utility')}</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                    <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                        <ul className="kt-menu__subnav">
                                            <li className="kt-menu__item"><a className="kt-menu__link" href="/calculate-loan"><span className="kt-menu__link-text">{t('loan calculator')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href="/predict"><span className="kt-menu__link-text">{t('price prediction')}</span></a></li>
                                            <li className="kt-menu__item"><a className="kt-menu__link" href="/statistic"><span className="kt-menu__link-text">{t('market price')}</span></a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>



                    <div className="kt-header__topbar">
                        <div class="kt-header__topbar-item dropdown">
                            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="30px,0px"
                                aria-expanded="true">
                                <span className="kt-header__topbar-icon kt-header__topbar-icon--success gou-noti-num">
                                    <i className="flaticon2-bell-alarm-symbol"></i>
                                    <strong style={{color:"white"}}>{this.state.notiCount}</strong>
                                </span>
                                <span className="kt-hidden kt-badge kt-badge--danger"></span>
                            </div>
                            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
                                <form>
                                    <div class="tab-content">
                                        <div class="tab-pane active show" role="tabpanel">
                                            <div class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                                                data-scroll="true" data-height="300" data-mobile-height="200"
                                                id="gou-noti-list">
                                                {
                                                    this.state.notiList.length > 0 &&
                                                    this.state.notiList.map(noti => {
                                                        let backgroundColor = noti.status ? 'transparent' : '#edf2fa'
                                                        return (
                                                            <a className="kt-notification__item" onClick={() => this.handleClickNoti(noti)} style={{ backgroundColor: backgroundColor }}>
                                                                <div class="kt-notification__item-icon">
                                                                    <i class="flaticon-whatsapp kt-font-danger"></i>
                                                                </div>
                                                                <div class="kt-notification__item-details">
                                                                    <div class="kt-notification__item-title">
                                                                        {noti.content}
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="kt-header__topbar-item dropdown" data-toggle="kt-tooltip" data-placement="left" title={t('upload new post')}>
                            <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                                <span className="kt-header__topbar-icon kt-header__topbar-icon--success"><i className="flaticon2-writing"></i></span>
                                <span className="kt-hidden kt-badge kt-badge--danger"></span>
                            </div>
                            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                                <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                    <li className="kt-nav__item">
                                        <a className="kt-nav__link" href="/manage-posts/create/sell-rent">
                                            <span className="kt-nav__link-text">{t('sell')}/{t('rent')}</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a className="kt-nav__link" href="/manage-posts/create/need-buy-rent">
                                            <span className="kt-nav__link-text">{t('need buy')}/{t('need rent')}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="kt-header__topbar-item kt-header__topbar-item--langs">
                            <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                                <span className="kt-header__topbar-icon kt-header__topbar-icon--brand">
                                    <img className="" src="/assets/gou-icons/260-united-kingdom.svg" alt="" />
                                </span>
                            </div>
                            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                                <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                    <li className={`kt-nav__item ${en_active}`}>
                                        <a onClick={this.handleEngTrans} className="kt-nav__link">
                                            <span className="kt-nav__link-icon"><img src="/assets/gou-icons/260-united-kingdom.svg" alt="" /></span>
                                            <span className="kt-nav__link-text">{t('english')}</span>
                                        </a>
                                    </li>
                                    <li className={`kt-nav__item ${vn_active}`}>
                                        <a onClick={this.handleVNTrans} className="kt-nav__link">
                                            <span className="kt-nav__link-icon"><img src="/assets/gou-icons/220-vietnam.svg" alt="" /></span>
                                            <span className="kt-nav__link-text">{t('vietnam')}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            isLogin() ? (
                                <div className="kt-header__topbar-item kt-header__topbar-item--user">
                                    <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                                        <span className="kt-header__topbar-icon">
                                            <img src="/assets/uploads/default-avatar.png"/>
                                        </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                                        <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                            <li className={`kt-nav__item`}>
                                                <a className="kt-nav__link" onClick={this.handleLogout}>
                                                    <span className="kt-nav__link-text">{t('sign out')}</span>
                                                </a>
                                            </li>
                                            <li className="kt-nav__item">
                                                <a href="/profile" className="kt-nav__link">
                                                    <span className="kt-nav__link-text">{t('profile')}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                    <div className="kt-header__topbar-item" data-toggle="kt-tooltip" data-placement="left" title={t('sign in')}>
                                        <div className="kt-header__topbar-wrapper" data-offset="10px,0px">
                                            <span onClick={this.handleClickLoginIcon} className="kt-header__topbar-icon kt-header__topbar-icon--success"><img src="/assets/gou-icons/login.png" style={{ width: "50%", height: "50%" }} /></span>
                                            <span className="kt-hidden kt-badge kt-badge--danger"></span>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </>
        )
    }
}
NavBar.contextType = SocketContext;
class NavBarContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Socket uri={uri} options={options} {...this.props}>
                <NavBar {...this.props} />
            </Socket>
        )
    }
}

export default withTranslation(['navBar', 'common'])(NavBarContainer);