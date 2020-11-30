import React from 'react'
import { withTranslation } from 'react-i18next';
import { getUserRole } from '../../../utils/auth'

class AsideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homepage_active: "",
            profile_active: "",
            manage_posts_active: "",
            favorite_posts_active: ""
        }
    }
    componentDidMount() {
        let currentPath = window.location.pathname
        let currentPathEls = currentPath.split("/")
        if (currentPathEls[1] == "") {
            this.setState({
                homepage_active: "kt-menu__item--active",
                profile_active: "",
                manage_posts_active: "",
                favorite_posts_active: ""
            })
        } else if (currentPathEls[1] == "profile") {
            this.setState({
                homepage_active: "",
                profile_active: "kt-menu__item--active",
                manage_posts_active: "",
                favorite_posts_active: ""
            })
        } else if (currentPathEls[1] == "manage-posts") {
            this.setState({
                homepage_active: "",
                profile_active: "",
                manage_posts_active: "kt-menu__item--active",
                favorite_posts_active: ""
            })
        } else if (currentPathEls[1] == "saved-sell-rent-posts" || currentPathEls[1] == "saved-need-buy-rent-posts") {
            this.setState({
                homepage_active: "",
                profile_active: "",
                manage_posts_active: "",
                favorite_posts_active: "kt-menu__item--active"
            })
        }
    }
    render() {
        const { t } = this.props
        const {  homepage_active, profile_active, manage_posts_active, favorite_posts_active } = this.state
        return (
            <>
                <button className="kt-aside-close " id="kt_aside_close_btn"><i className="la la-close"></i></button>
                <div className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">
                    <div className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
                        <div id="kt_aside_menu" className="kt-aside-menu " data-ktmenu-vertical="1" data-ktmenu-scroll="1" data-ktmenu-dropdown-timeout="500" style={{ backgroundColor: "#1a223c" }}>
                            <ul className="kt-menu__nav ">
                                <li className={`kt-menu__item  ${homepage_active}`} aria-haspopup="true"><a href="/" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-protection"></i><span className="kt-menu__link-text">{t('home page')}</span></a></li>
                                {
                                    getUserRole() === 'admin' && <li className="kt-menu__item" aria-haspopup="true"><a href="/admin" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-checking"></i><span className="kt-menu__link-text">{t('admin page')}</span></a></li>
                                }
                                <li className={`kt-menu__item ${profile_active}`} aria-haspopup="true"><a href="/profile" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-user-outline-symbol"></i><span className="kt-menu__link-text">{t('profile')}</span></a></li>
                                <li className={`kt-menu__item ${manage_posts_active}`} aria-haspopup="true"><a href="/manage-posts" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-writing"></i><span className="kt-menu__link-text">{t('manage posts')}</span></a></li>
                                <li className={`kt-menu__item  kt-menu__item--submenu  ${favorite_posts_active}`} aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon-download"></i><span className="kt-menu__link-text">{t('favorite posts')}</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
                                    <div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
                                        <ul className="kt-menu__subnav">
                                            <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Tin đã lưu</span></span></li>
                                            <li className="kt-menu__item " aria-haspopup="true"><a href="/saved-sell-rent-posts" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">{t('sell')}/{t('rent')}</span></a></li>
                                            <li className="kt-menu__item " aria-haspopup="true"><a href="/saved-need-buy-rent-posts" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">{t('need buy')}/{t('need rent')}</span></a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withTranslation(['asideBar'])(AsideBar)
