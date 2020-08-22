import React from 'react';
import './style.css';
import { withTranslation } from 'react-i18next';

class NeedBuyRentIntroCard extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickOnCard=this.handleClickOnCard.bind(this)
    }

    handleClickOnCard(){
        window.location.href=`/need-buy-rent-post/detail/${this.props.postId}`
    }

    render() {
        let { type, title, price, lat, lon, radius, area, num_floor, num_bathroom, num_bedroom, direction, createdAt, t } = this.props

        return (
            <div className="col-md-4" style={{ padding: "0px 10px" }}>
                <div className="gou-intro-card" onClick={this.handleClickOnCard}>
                    <div className="gou-intro-card-type gou-intro-card-item">
                        {type} - {title}: <span className="gou-intro-card-price">{price}:</span>
                    </div>
                    <div className="gou-intro-card-location gou-intro-card-item">
                        <span><i class="fa fa-dollar-sign"></i></span>
                        <span style={{ padding: "0px 6px" }}>{t('common:location')}: ({lat},{lon}), R: {radius} km</span>
                    </div>
                    <div className="gou-intro-card-info-container gou-intro-card-item">
                        <div>
                            <span><i className="fa fa-expand"></i></span>
                            <span style={{ padding: "0px 6px" }}>{area}</span>
                        </div>
                        <div>
                            <span><i className="socicon-buffer"></i></span>
                            <span style={{ padding: "0px 6px" }}>{num_floor}</span>
                        </div>
                        <div>
                            <span><i className="fa fa-bath"></i></span>
                            <span style={{ padding: "0px 6px" }}>{num_bathroom}</span>
                        </div>
                        <div>
                            <span><i className="fa fa-bed"></i></span>
                            <span style={{ padding: "0px 6px" }}>{num_bedroom}</span>
                        </div>
                        <div>
                            <span><i className="fa fa-compass"></i></span>
                            <span style={{ padding: "0px 6px" }}>{direction}</span>
                        </div>
                    </div>
                    <div className="gou-intro-card-item">
                        {t('common:created at')}: <span>{createdAt}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation(['common'])(NeedBuyRentIntroCard)