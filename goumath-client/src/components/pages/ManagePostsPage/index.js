import React from 'react';
import axios from 'axios';
import { Table, Space, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import MobileNavBar from '../../layouts/MobileNavbar'
import NavBar from '../../layouts/NavBar'
import AsideBar from '../../layouts/AsideBar'
import Footer from '../../layouts/Footer'

const { Option } = Select;

class ManagePostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5','10', '20', '40', '80', '100'],
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

  componentDidMount() {
    const { pagination, filters } = this.state

    this.fetch({ pagination, filters })
  }

  fetch = (params = {}) => {
    console.log(params)
    console.log(this.state)
    this.setState({
      loading: true
    })
    axios.get(`http://localhost:8000/my-posts?current=${params.pagination.current}&pageSize=${params.pagination.pageSize}&type=${params.filters.type}&publish_status=${params.filters.publish_status}`).then(data => {
      console.log(data)
      this.setState({
        loading: false,
        data: data.data.results,
        pagination: {
          ...params.pagination,
          total: data.data.totalCount,
        },
        filters: {
          ...params.filters
        }
      });
    });
  }

  handleFilterSell = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      ...this.state.filters,
      type: 'sell'
    }
    this.fetch({ pagination, filters })
  }

  handleFilterRent = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      ...this.state.filters,
      type: 'rent'
    }
    this.fetch({ pagination, filters })
  }

  handleClearFilters = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      type: null,
      publish_status: null
    }
    this.fetch({ pagination, filters })
  }

  handleFilterPublishStatus = (value) => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      ...this.state.filters,
      publish_status: value
    }
    this.fetch({ pagination, filters })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      filters: this.state.filters,
    });
  };

  render() {
    let { data, pagination, loading } = this.state

    let columns = [
      {
        title: 'Loại nhà',
        dataIndex: 'type',
        width: '20%',
        key: 'type',
      },
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: 'Tình trạng',
        dataIndex: 'publish_status',
        key: 'publish_status'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a href="/manage-posts/update"><i class="flaticon-edit"></i></a>
            <a onClick={() => {
              console.log('delete')
            }}><i class="flaticon-delete"></i></a>
          </Space>
        ),
      },
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
                  <div className="row">
                    <div className="col-12">
                      <div class="kt-portlet" style={{ marginTop: "25px" }}>
                        <div className="gou-toolbar">
                          <Button onClick={this.handleFilterSell} className="gou-toolbar-item">Bán</Button>
                          <Button onClick={this.handleFilterRent} className="gou-toolbar-item">Cho thuê</Button>
                          <Button className="gou-toolbar-item">Tin cần mua/thuê</Button>
                          <Select defaultValue="all" onChange={this.handleFilterPublishStatus} className="gou-toolbar-item" style={{width: 120}}>
                            <Option value="all">Tất cả</Option>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="refused">Bị từ chối</Option>
                            <Option value="expired">Hết hạn</Option>
                          </Select>
                          <Button onClick={this.handleClearFilters} className="gou-toolbar-item">Xoá lọc</Button>
                          <Button className="gou-new-post-btn" href="/manage-posts/create">Đăng tin</Button>
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

export default ManagePostsPage;
