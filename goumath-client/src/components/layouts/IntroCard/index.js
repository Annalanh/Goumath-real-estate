import React from 'react';
import './style.css'

class IntroCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="col-md-3" style={{padding: "0px 10px"}}>
                <div className="gou-intro-card">
                    <img className="gou-intro-card-img" src="https://image.plo.vn/w653/Uploaded/2020/xpckxpiu/2020_06_06/jung-kook-plo-4_enou.jpg"/>
                    <div className="gou-intro-card-title">Ban nha</div>
                    <div className="gou-intro-card-des">Kẹt tiền cần bán gấp. Kẹt tiền cần bán gấp. Kẹt tiền cần bán gấp Kẹt tiền cần bán gấp</div>
                    <div className="gou-intro-card-info">
                        <div style={{display:"flex"}}>
                            <i className="socicon-buffer" style={{width: "12px"}}></i>
                            <div style={{padding: "0px 6px"}}>Diện tích:</div>
                        </div>
                        <div style={{fontWeight: 500}}>120</div>
                    </div>
                    <div className="gou-intro-card-info">
                        <div style={{display:"flex"}}>
                            <i className="fa fa-map-marker-alt" style={{width: "12px"}}></i>
                            <div style={{padding: "0px 6px"}}>Địa chỉ:</div>
                        </div>
                        <div style={{fontWeight: 500}}>120</div>
                    </div>
                    <div className="gou-intro-card-info">
                        <div style={{display:"flex"}}>
                            <i className="fa fa-dollar-sign" style={{width: "12px"}}></i>
                            <div style={{padding: "0px 6px"}}>Giá:</div>
                        </div>
                        <div style={{fontWeight: 500}}>120</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IntroCard