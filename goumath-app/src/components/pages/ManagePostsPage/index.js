import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';
import { Table, Space, Button, Select, Dropdown, Menu } from 'antd';
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

  componentDidMount() {
    const { pagination, filters } = this.state
    this.fetch({ pagination, filters })
  }

  fetch = (params = {}) => {
    let userId = localStorage.getItem('userId')
    this.setState({
      loading: true
    })
    axios.get(`http://localhost:8081/post/my-posts?current=${params.pagination.current}&pageSize=${params.pagination.pageSize}&type=${params.filters.type}&publish_status=${params.filters.publish_status}&userId=${userId}`).then(data => {
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

  handleFilterNeedBuy = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      ...this.state.filters,
      type: 'need buy'
    }
    this.fetch({ pagination, filters })
  }

  handleFilterNeedRent = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    let filters = {
      ...this.state.filters,
      type: 'need rent'
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
    const { t } = this.props

    const uploadMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/manage-posts/create/sell-rent">
            {t('common:sell')}/{t('common:rent')}
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/manage-posts/create/need-buy-rent">
            {t('common:need buy')}/{t('common:need rent')}
          </a>
        </Menu.Item>
      </Menu>
    );

    let columns = [
      {
        title: t('post type'),
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: t('category'),
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: t('title'),
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: t('created at'),
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: t('publish status'),
        dataIndex: 'publish_status',
        key: 'publish_status'
      },
      {
        title: t('action'),
        dataIndex: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a href={record.type == 'sell' || record.type == 'rent'?`/manage-posts/update/sell-rent/${record._id}`:`/manage-posts/update/need-buy-rent/${record._id}`}><i class="flaticon-edit"></i></a>
            <a onClick={() => {
              swal("Do you want to delete this post?", {
                buttons: {
                  cancel: "Cancel",
                  delete: {
                    text: "Yes, delete",
                    value: "delete",
                  },
                },
              })
                .then((value) => {
                  if (value == 'delete') {
                    axios({
                      method: 'delete',
                      url: 'http://localhost:8081/post/delete',
                      data: { postId: record._id }
                    }).then(res => {
                      let resData = res.data
                      if (resData.status) {
                        swal("Deleted!", "Post is deleted!", "success").then(value => {
                          if (value) window.location.reload()
                        })
                      }
                      else {
                        swal("Error!", resData.message, "error")
                      }
                    })
                  }
                });
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
                          <Button onClick={this.handleFilterSell} className="gou-toolbar-item">{t('common:sell')}</Button>
                          <Button onClick={this.handleFilterRent} className="gou-toolbar-item">{t('common:rent')}</Button>
                          <Button onClick={this.handleFilterNeedBuy} className="gou-toolbar-item">{t('common:need buy')}</Button>
                          <Button onClick={this.handleFilterNeedRent} className="gou-toolbar-item">{t('common:need rent')}</Button>
                          <Select defaultValue="null" onChange={this.handleFilterPublishStatus} className="gou-toolbar-item" style={{ width: 120 }}>
                            <Option value="null">{t('common:all')}</Option>
                            <Option value="pending">{t('common:pending')}</Option>
                            <Option value="approved">{t('common:approved')}</Option>
                            <Option value="refused">{t('common:refused')}</Option>
                            <Option value="expired">{t('common:expired')}</Option>
                          </Select>
                          <Button onClick={this.handleClearFilters} className="gou-toolbar-item">{t('common:clear filter')}</Button>
                          <Dropdown overlay={uploadMenu} placement="bottomRight">
                            <button className="btn gou-new-post-btn">{t('common:upload')}</button>
                          </Dropdown>
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

export default withTranslation(['common'])(ManagePostsPage);