import React from 'react'
import { withTranslation } from 'react-i18next';
import { isLogin, logout } from '../../../utils/auth'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleVNTrans = this.handleVNTrans.bind(this);
        this.handleEngTrans = this.handleEngTrans.bind(this);

    }
    handleLogout() {
        logout()
        window.location.href = '/'
    }

    handleEngTrans() {
        const { i18n } = this.props
        i18n.changeLanguage('en');
        localStorage.setItem('i18nextLng', 'en')
    }

    handleVNTrans() {
        const { i18n } = this.props
        i18n.changeLanguage('vn');
        localStorage.setItem('i18nextLng', 'vn')
    }

    handleClickLoginIcon() {
        window.location.href = "/login"
    }
    render() {
        const { t } = this.props
        return (
            <div id="kt_header" className="kt-header kt-grid kt-grid--ver  kt-header--fixed ">

                <div className="kt-header__brand kt-grid__item  " id="kt_header_brand">
                    <div className="kt-header__brand-logo">
                        <a href="index.html">
                            <img alt="Logo" src="/assets/gou-icons/logo-6.png" />
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
                            <li className="kt-menu__item  kt-menu__item--active " aria-haspopup="true"><a href="/" className="kt-menu__link "><span className="kt-menu__link-text">{t('home page')}</span></a></li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">{t('common:sell')}</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:apartment')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:mansion')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:town house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:ground project')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:frontage ground')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:warehouse')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:hotel')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:store')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:boarding house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:residental land')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:in alley house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:shophouse')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:ground')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:office')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:farmland')}</span></a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                                <a className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-text">{t('common:rent')}</span><i className="kt-menu__hor-arrow la la-angle-down"></i><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                <div className="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left">
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:apartment')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:mansion')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:town house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:ground project')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:frontage ground')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:warehouse')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:hotel')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:store')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:boarding house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:residental land')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:in alley house')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:shophouse')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:ground')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:office')}</span></a></li>
                                        <li className="kt-menu__item"><a className="kt-menu__link" href="index.html"><span className="kt-menu__link-text">{t('common:farmland')}</span></a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
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
                    <div className="kt-header__topbar-item dropdown" data-toggle="kt-tooltip">
                        <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon kt-header__topbar-icon--success"><i className="flaticon2-bell-alarm-symbol"></i></span>
                            <span className="kt-hidden kt-badge kt-badge--danger"></span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a className="kt-nav__link" onClick={this.handleLogout}>
                                        <span className="kt-nav__link-text">{t('sign out')}</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a className="">
                                        <span className="kt-nav__link-text">{t('profile')}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="kt-header__topbar-item dropdown" data-toggle="kt-tooltip" data-placement="left" title={t('upload new post')}>
                        <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                            <span className="kt-header__topbar-icon kt-header__topbar-icon--success"><i className="flaticon2-writing"></i></span>
                            <span className="kt-hidden kt-badge kt-badge--danger"></span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
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
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a onClick={this.handleEngTrans} className="kt-nav__link">
                                        <span className="kt-nav__link-icon"><img src="/assets/gou-icons/260-united-kingdom.svg" alt="" /></span>
                                        <span className="kt-nav__link-text">{t('english')}</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
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
                                    <span className="kt-header__topbar-icon"><i className="flaticon2-user-outline-symbol"></i></span>
                                </div>
                                <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
                                    <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                        <li className={`kt-nav__item kt-nav__item--active`}>
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
        )
    }
}

export default withTranslation(['navBar', 'common'])(NavBar);