import React from 'react'
import { isLogin, logout } from '../../../utils/auth'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    handleLogout(){
        logout()
        window.location.href = '/'
    }
    render() {
        return (
            <div id="kt_header" className="kt-header kt-grid kt-grid--ver  kt-header--fixed ">

                <div className="kt-header__brand kt-grid__item  " id="kt_header_brand">
                    <div className="kt-header__brand-logo">
                        <a href="index.html">
                            <img alt="Logo" src="/assets/media/logos/logo-6.png" />
                        </a>
                    </div>
                </div>

                <h3 className="kt-header__title kt-grid__item">
                    Goumath
                </h3>

                <button className="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i className="la la-close"></i></button>
                
                <div className="kt-header-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_header_menu_wrapper">
                    <div id="kt_header_menu" className="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default ">
                        <ul className="kt-menu__nav ">
                            <li className="kt-menu__item  kt-menu__item--active " aria-haspopup="true"><a href="/" className="kt-menu__link "><span className="kt-menu__link-text">Trang chủ</span></a></li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">Nhà đất bán</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán nhà chung cư</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán nhà nhà riêng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán biệt thự, liền kề</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán nhà mặt phố</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán đất nền, dự án</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán đất mặt tiền</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán trang trại</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán kho, nhà xưởng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán khách sạn</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán cửa hàng, kiot</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán phòng trọ, nhà trọ</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán đất thổ cư, đất ở</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán nhà hẻm ngõ</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán nhà mặt phố thương mại</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán mặt bằng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán văn phòng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán đất nông nghiệp</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Bán căn hộ cao cấp</span></a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">Nhà đất cho thuê</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê căn hộ chung cư</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê nhà riêng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê mặt phố</span></a></li>  
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê trọ, nhà trọ</span></a></li>                                      
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê biệt thự liền kề</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê văn phòng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê hàng, kiot</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê kho, nhà xưởng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê sạn, nhà hàng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê mặt phố thương mại</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê đất lâm nông nghiệp</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê trang trại</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê mặt bằng</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê thổ cư, đất ở</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê nền, dự án</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">Cho thuê nhà hẻm ngõ</span></a></li>                                        
                                    </ul>
                                </div>
                            </li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">Tiện ích</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="/calculate-loan"><span className="kt-menu__link-text">Tính tiền</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="/predict"><span className="kt-menu__link-text">Định giá bất động sản</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="/statistic"><span className="kt-menu__link-text">Tham khảo giá thị trường</span></a></li>
                                    </ul>
                                </div>
                            </li>
                            {
                                isLogin() && <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true"><a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">Components</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a></li>
                            }
                        </ul>
                    </div>
                </div>
            
                

                <div className="kt-header__topbar">
                    <div className="kt-header__topbar-item dropdown">
                        <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon kt-header__topbar-icon--success"><i className="flaticon2-bell-alarm-symbol"></i></span>
                            <span className="kt-hidden kt-badge kt-badge--danger"></span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a className="kt-nav__link" onClick={this.handleLogout}>
                                        <span className="kt-nav__link-text">Log out</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a className="">
                                        <span className="kt-nav__link-text">Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="kt-header__topbar-item">
                        <div className="kt-header__topbar-wrapper" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon kt-header__topbar-icon--success"><i className="flaticon2-writing"></i></span>
                            <span className="kt-hidden kt-badge kt-badge--danger"></span>
                        </div>
                    </div>

                    <div className="kt-header__topbar-item kt-header__topbar-item--langs">
                        <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon kt-header__topbar-icon--brand">
                                <img className="" src="/assets/media/flags/260-united-kingdom.svg" alt="" />
                            </span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon"><img src="/assets/media/flags/226-united-states.svg" alt="" /></span>
                                        <span className="kt-nav__link-text">English</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon"><img src="/assets/media/flags/128-spain.svg" alt="" /></span>
                                        <span className="kt-nav__link-text">Spanish</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon"><img src="/assets/media/flags/162-germany.svg" alt="" /></span>
                                        <span className="kt-nav__link-text">German</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="kt-header__topbar-item kt-header__topbar-item--user">
                        <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon"><i className="flaticon2-user-outline-symbol"></i></span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a className="kt-nav__link" onClick={this.handleLogout}>
                                        <span className="kt-nav__link-text">Log out</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-text">Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar