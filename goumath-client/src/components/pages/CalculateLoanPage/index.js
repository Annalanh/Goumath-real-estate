import React from 'react';
import './style.css'
import { Formik } from 'formik';
import { Select, Table, Space } from 'antd';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import 'antd/dist/antd.css';

import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

let columns = [
    {
        title: 'Tháng',
        dataIndex: 'month',
        key: 'month',
        width: '25%'
    },
    {
        title: 'Gốc còn lại',
        dataIndex: 'left_balance',
        key: 'left_balance',
        width: '25%'
    },
    {
        title: 'Gốc',
        dataIndex: 'balance',
        key: 'balance',
        width: '25%'
    },
    {
        title: 'Lãi',
        dataIndex: 'interest',
        key: 'interest',
        width: '25%'
    },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class CalculateLoanPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '40', '80', '100'],
                showSizeChanger: true,
                total: ''
            },
            filters: {
                type: null,
                publish_status: null
            },
            loading: false,
        }
    }

    render() {
        let initialProfile = {}
        let { data, pagination, loading } = this.state
        let jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';
        const data_chart = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];
        return (
            <>
                <MobileNavBar />
                <div className="kt-grid kt-grid--hor kt-grid--root" style={{ height: "100%" }}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page" style={{ height: "100%" }}>
                        <AsideBar />

                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                            <NavBar />

                            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
                                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                                    <div className="row gou-title-container">
                                        <h1>TÍNH TIỀN VAY</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="kt-portlet">
                                                <Formik
                                                    initialValues={initialProfile}
                                                    onSubmit={(values, actions) => {
                                                        setTimeout(() => {
                                                            alert(JSON.stringify(this.state.fileList, null, 2));
                                                            actions.setSubmitting(false);
                                                        }, 1000);
                                                    }}
                                                    validate={(values) => {
                                                        const errors = {};
                                                        return errors;
                                                    }}
                                                >
                                                    {props => (
                                                        <form className="kt-form" onSubmit={props.handleSubmit}>
                                                            <div className="kt-portlet__body">
                                                                <div className="kt-section__body">
                                                                    <div className="form-group row">
                                                                        <div className="col-lg-4 gou-input-container">
                                                                            <h5>Số tiền vay:</h5>
                                                                            <input type="number" name="fullname" className="form-control gou-input" />
                                                                        </div>
                                                                        <div className="col-lg-4 gou-input-container">
                                                                            <h5>Thời gian vay:</h5>
                                                                            <input type="number" name="fullname" className="form-control gou-input" />
                                                                            <input type="number" name="fullname" className="form-control gou-input" />
                                                                        </div>
                                                                        <div className="col-lg-4 gou-input-container">
                                                                            <h5>Lãi suất vay:</h5>
                                                                            <input type="number" name="fullname" className="form-control gou-input" />
                                                                            <input type="number" name="fullname" className="form-control gou-input" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )}
                                                </Formik>

                                                <div className="kt-portlet__body">
                                                    <div className="kt-section__body">
                                                        <div className="row">
                                                            <div className="col-lg-4 gou-chart-container">
                                                                <PieChart width={240} height={300}>
                                                                    <Pie
                                                                        data={data_chart}
                                                                        innerRadius={60}
                                                                        outerRadius={80}
                                                                        fill="#8884d8"
                                                                        paddingAngle={5}
                                                                        dataKey="value"
                                                                    >
                                                                        {
                                                                            data_chart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                                        }
                                                                    </Pie>
                                                                
                                                                </PieChart>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div class="kt-portlet kt-portlet--tabs" style={{ boxShadow: 'none' }}>
                                                                    <div class="kt-portlet__head">
                                                                        <div class="kt-portlet__head-toolbar">
                                                                            <ul class="nav nav-tabs nav-tabs-line nav-tabs-line-brand nav-tabs-line-2x nav-tabs-line-right nav-tabs-bold" role="tablist">
                                                                                <li class="nav-item">
                                                                                    <a class="nav-link" data-toggle="tab" href="#kt_portlet_base_demo_3_3_tab_content" role="tab" aria-selected="false">
                                                                                        Tháng đầu tiên
                                                                                    </a>
                                                                                </li>
                                                                                <li class="nav-item">
                                                                                    <a class="nav-link active" data-toggle="tab" href="#kt_portlet_base_demo_3_2_tab_content" role="tab" aria-selected="true">
                                                                                        Tổng phải trả
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div class="kt-portlet__body">
                                                                        <div class="tab-content">
                                                                            <div class="tab-pane" id="kt_portlet_base_demo_3_3_tab_content" role="tabpanel">
                                                                                <div className="row">
                                                                                    <div className="col-4">
                                                                                        <i class="fa fa-money-bill-wave" style={{ color: '#39b54a', marginRight: '6px' }}></i>
                                                                                        0 VND
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                        <i class="fa fa-money-bill-wave" style={{ color: '#ffb901', marginRight: '6px' }}></i>
                                                                                        0 VND
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="tab-pane active" id="kt_portlet_base_demo_3_2_tab_content" role="tabpanel">
                                                                                <div className="row">
                                                                                    <div className="col-4">
                                                                                        <i class="fa fa-money-bill-wave" style={{ color: '#39b54a', marginRight: '6px' }}></i>
                                                                                        10 VND
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                        <i class="fa fa-money-bill-wave" style={{ color: '#ffb901', marginRight: '6px' }}></i>
                                                                                        10 VND
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="kt-portlet">
                                                <div class="kt-portlet__head">
                                                    <div class="kt-portlet__head-label">
                                                        <h3 class="kt-portlet__head-title">Số tiền phải trả hàng tháng</h3>
                                                    </div>
                                                </div>
                                                <Table
                                                    columns={columns}
                                                    dataSource={data}
                                                    pagination={pagination}
                                                    loading={loading}
                                                    onChange={this.handleTableChange}
                                                    rowKey={record => record.key}
                                                    scroll={{ x: 'fit-content' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CalculateLoanPage;
