import React from 'react'
import { getUserRole } from '../../../utils/auth'

class AsideBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <button className="kt-aside-close " id="kt_aside_close_btn"><i className="la la-close"></i></button>
                <div className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">
                    <div className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
                        <div id="kt_aside_menu" className="kt-aside-menu " data-ktmenu-vertical="1" data-ktmenu-scroll="1" data-ktmenu-dropdown-timeout="500">
                            <ul className="kt-menu__nav ">
                                <li className="kt-menu__item  kt-menu__item--active" aria-haspopup="true"><a href="/" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-protection"></i><span className="kt-menu__link-text">Trang chủ</span></a></li>
                                {
                                    getUserRole() === 'admin' && <li className="kt-menu__item" aria-haspopup="true"><a href="/admin" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-checking"></i><span className="kt-menu__link-text">Quản trị</span></a></li>
                                }
                                <li className="kt-menu__item" aria-haspopup="true"><a href="/profile" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-user-outline-symbol"></i><span className="kt-menu__link-text">Thông tin cá nhân</span></a></li>
                                <li className="kt-menu__item " aria-haspopup="true"><a href="/manage-posts" className="kt-menu__link "><i className="kt-menu__link-icon flaticon2-writing"></i><span className="kt-menu__link-text">Quản lý tin đăng</span></a></li>
                                <li className="kt-menu__item " aria-haspopup="true"><a href="/saved-posts" className="kt-menu__link "><i className="kt-menu__link-icon flaticon-download"></i><span className="kt-menu__link-text">Tin đã lưu</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AsideBar
