import React from 'react';
import './style.css';
import { withTranslation } from 'react-i18next';

class SellRentIntroCard extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickOnCard = this.handleClickOnCard.bind(this)
    }

    handleClickOnCard() {
        window.location.href = `/sell-rent-post/detail/${this.props.postId}`
    }

    render() {
        let { title, area, price, address, type, list_img, num_bathroom, num_bedroom, t } = this.props
        console.log(num_bathroom)
        console.log(num_bedroom)
        let img_url = 'assets/uploads/house-default-avatar.png'
        if (list_img.length !== 0) {
            img_url = list_img[0]
        }

        return (
            <div className="col-md-3" style={{ padding: "0px 10px" }}>
                <div className="gou-intro-card" onClick={this.handleClickOnCard}>
                    <div className="gou-intro-card-img-container">
                        <img alt="picture" className="gou-intro-card-img" src={img_url} />
                        <div className="gou-intro-card-img-note">
                            <div className="gou-intro-card-img-note-type">{t("house for")} {t(`common:${type}`)}</div>
                            <div className="gou-intro-card-img-note-price">${price}</div>
                        </div>
                    </div>
                    <div className="gou-intro-card-des">{title}</div>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div>
                            <span><i className="fa fa-expand gou-intro-card-icon"></i></span>
                            <span style={{ padding: "0px 6px" }}><strong>{area} m<sup>2</sup></strong></span>
                        </div>
                        <div>
                            <span><i class="fa fa-bath gou-intro-card-icon"></i></span>
                            <span style={{ padding: "0px 6px" }}><strong>{num_bathroom}</strong></span>
                        </div>
                        <div>
                            <span><i className="fa fa-bed gou-intro-card-icon"></i></span>
                            <span style={{ padding: "0px 6px" }}><strong>{num_bedroom}</strong></span>
                        </div>
                    </div>
                    <div className="gou-intro-card-info gou-intro-card-info-address">
                        <span><i className="fa fa-map-marker-alt gou-intro-card-icon"></i></span>
                        <span style={{ padding: "0px 6px" }}><strong>{address}</strong></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation(['common'])(SellRentIntroCard)