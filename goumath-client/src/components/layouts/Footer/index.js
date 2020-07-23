import React from 'react'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="kt-footer  kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop" id="kt_footer">
                <div className="kt-container  kt-container--fluid ">
                    <div className="kt-footer__copyright">
                        2020&nbsp;&copy;&nbsp;<a href="http://keenthemes.com/metronic" target="_blank" className="kt-link">Keenthemes</a>
                    </div>
                    <div className="kt-footer__menu">
                        <a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">About</a>
                        <a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">Team</a>
                        <a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">Contact</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer