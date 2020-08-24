import React from 'react';
import './style.css';
import { withTranslation } from 'react-i18next';

class SellRentIntroCard extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickOnCard=this.handleClickOnCard.bind(this)
    }

    handleClickOnCard(){
        window.location.href=`/sell-rent-post/detail/${this.props.postId}`
    }

    render() {
        let { title, area, price, address, type, list_img, t } = this.props
        let img_url = 'assets/uploads/house-default-avatar.png'
        if(list_img.length !== 0){
            img_url = list_img[0]
        }

        return (
            <div className="col-md-3" style={{ padding: "0px 10px" }}>
                <div className="gou-intro-card" onClick={this.handleClickOnCard}>
                    <img alt="picture" className="gou-intro-card-img" src={img_url} />
                    <div className="gou-intro-card-title">{t(`common:${type}`)}</div>
                    <div className="gou-intro-card-des">{title}</div>
                    <div className="gou-intro-card-info">
                        <span><i className="fa fa-expand"></i></span>
                        <span style={{ padding: "0px 6px" }}>{t('common:area')}: <strong>{area}</strong></span>
                    </div>
                    <div className="gou-intro-card-info">
                        <span><i className="fa fa-map-marker-alt"></i></span>
                        <span style={{ padding: "0px 6px" }}>{t('common:address')}: <strong>{address}</strong></span>
                    </div>
                    <div className="gou-intro-card-info">
                        <span><i className="fa fa-dollar-sign"></i></span>
                        <span style={{ padding: "0px 6px" }}>{t('common:price')}: <strong>{price}</strong></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation(['common'])(SellRentIntroCard)