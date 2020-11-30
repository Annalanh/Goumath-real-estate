import React from 'react'
import { withTranslation } from 'react-i18next';
import './style.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="gou-footer" style={{ backgroundColor: "#718c9e", padding: "20px", color: "white" }}>
                <h1 style={{ textAlign: "center", color: "white" }}>GOUMATH</h1>
                <div className="row">
                    <div className="col-md-3 gou-footer-section">
                        <div className="gou-footer-section-title">About</div>
                        <div style={{ textAlign: "justify" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                    </div>
                    <div className="col-md-3 gou-footer-section">
                        <div>
                            <div className="gou-footer-section-title">Contact</div>
                            <div className="gou-footer-key-val">
                                <div className="gou-footer-key">Email:</div>
                                <div>thaonp@gmail.com</div>
                            </div>
                            <div className="gou-footer-key-val">
                                <div className="gou-footer-key">Phone:</div>
                                <div>+04 099070897</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 gou-footer-section">
                        <div>
                            <div className="gou-footer-section-title">Address</div>
                            <div>
                                <div>No 8, Ton That Thuyet Street, Cau Giay District, Hanoi</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="gou-footer-section-title">Social Media</div>
                        <div style={{ padding: "0px 30px", display: "flex", justifyContent: "space-between" }}>
                            <i className="flaticon-facebook-logo-button"></i>
                            <i className="flaticon-twitter-logo-button"></i>
                            <i className="flaticon-instagram-logo"></i>
                            <i className="flaticon-linkedin"></i>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default Footer