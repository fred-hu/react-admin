/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import jsonp from 'jsonp';
import config from '../tools/config';
import request from '../tools/request';
import {
  Button,
  Table,
  Divider,
  Form,
  Modal,
  // Icon,
  Input,
  // Checkbox,
  message,
  Popconfirm
} from 'antd';
import axios from 'axios';
// import img from 'static/logo.png';
// console.log(img);
import Toolbar from '../components/Toolbar';
import ThemeContext from '../contexts/test';
import Ref from '../components/ref';

import '../styles/ExampleContainer.less';
const FormItem = Form.Item;
// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.focus = this.focus.bind(this);
//   }
//   componentDidMount() {}
//   focus() {
//     // alert();
//   }
//   render() {
//     return <input placeholder="hello" />;
//   }
// }
class CompExampleContainer extends React.Component {
  static propTypes = {
    form: PropTypes.oneOfType([PropTypes.any]),
    count: PropTypes.oneOfType([PropTypes.any]),
    data: PropTypes.oneOfType([PropTypes.any]),
    IncreaseCount: PropTypes.oneOfType([PropTypes.any]),
    loadData: PropTypes.oneOfType([PropTypes.any]),
    count1: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    form: null,
    count: null,
    data: null,
    IncreaseCount: null,
    loadData: null,
    count1: null
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      // testCtx: 1,
      columns: [
        {
          title: 'id',
          dataIndex: '_id',
          key: '_id',
          className: 'hide'
        },
        {
          title: '名字',
          dataIndex: 'name',
          key: 'name',
          width: 400
        },
        {
          title: '地址',
          dataIndex: 'url',
          key: 'url',
          width: 400
        },
        {
          title: '操作',
          key: 'operation',
          width: 200,
          render: (text, record) => {
            const _this = this;
            return (
              <span>
                <Button type="button" onClick={this.getDetail.bind(this, record._id)}>
                  编辑
                </Button>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={_this.deleteOpt.bind(_this, record._id)}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="button">删除</Button>
                </Popconfirm>
              </span>
            );
          }
        }
      ],
      datas: []
      // detail: {},
      // changeCtx: () => {
      //   this.setState({
      //     testCtx: 2
      //   });
      // }
    };
    // ref用例
    this.myRef = React.createRef();
    this.ajaxAdd = this.ajaxAdd.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
    this.test();
    this.ajaxList();
  }

  componentDidMount() {
    // console.log(this.myRef)
    // this.inp.focus();

    // jsonp源码
    // var id = opts.name || (prefix + (count++));
    // window[id] = function(data){  //重写挂载在全局上的回调函数（防止被更改）
    //     debug('jsonp got', data);
    //     cleanup();// 执行回调函数后消除挂载在全局上的回调函数（防止被暴露）
    //     if (fn) fn(null, data);// 自定义回调函数
    // };

    // jsonp(config.host+'/curd/jsonp',{
    //     param:'callback',
    //     name:'test'
    // },function(error,data){
    //     console.log(data);
    // })
    const callback = `jsonp${+new Date()}`;
    window[callback] = _d => {
      // window.console.log('jsonp-------->', d);
      delete window[callback];
      // alert(d);
    };
    const script = document.createElement('script');
    script.setAttribute('class', 'jsonp');
    script.src = `${config.host}/curd/jsonp?callback=${callback}`;
    document.documentElement.appendChild(script);
  }

  test = () => {
    // console.log(1111);
  };

  ajaxList() {
    const _this = this;
    const { page } = this.state;
    const { pageSize, current } = page;
    request
      .get('/curd/list', {
        params: {
          pageSize,
          current
        }
      })
      .then(response => {
        const { data } = response;
        data.data.forEach(v => {
          v.key = v._id;
        });
        _this.setState({
          datas: data.data,
          page: {
            pageSize: data.pageSize,
            current: data.current,
            total: data.total
          }
        });
      })
      .catch(_err => {
        // console.log(err);
      });
  }

  getDetail(id) {
    const _this = this;
    request
      .get('/curd/list/detail', {
        params: {
          id
        }
      })
      .then(response => {
        _this.setState(
          {
            detail: response.data.data,
            visible: true
          },
          () => {
            const { name, url } = _this.state.detail;
            _this.props.form.setFieldsValue({
              name,
              url
            });
          }
        );
      })
      .catch(_err => {
        // console.log(err);
      });
  }

  handleOk() {
    const _this = this;
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (_this.state.detail && _this.state.detail._id) {
          values.id = _this.state.detail._id;
          request
            .post('/curd/update', values)
            .then(response => {
              message.success(response.data.description);
              _this.ajaxList();
            })
            .catch(_err => {
              // console.log(err);
            });
          this.setState(
            {
              visible: false
            },
            () => {
              form.resetFields();
            }
          );
        } else {
          request
            .post('/curd/add', values)
            .then(response => {
              message.success(response.data.description);
              _this.ajaxList();
            })
            .catch(_err => {
              // console.log(err);
            });
          this.setState(
            {
              visible: false
            },
            () => {
              form.resetFields();
            }
          );
        }
      }
    });
  }

  handleCancel() {
    const { form } = this.props;
    this.setState(
      {
        visible: false
      },
      () => {
        form.resetFields();
      }
    );
  }

  ajaxAdd() {
    this.setState({
      visible: true
      // detail: {}
    });
  }

  deleteOpt(id) {
    const _this = this;
    request
      .post('/curd/delete', {
        id
      })
      .then(response => {
        if (response.data.success) {
          message.success(response.data.description);
          _this.ajaxList();
        }
      })
      .catch(_err => {
        // console.log(err);
      });
  }

  pageChange(page) {
    this.setState(
      (state, _props) => {
        state.page.current = page.current;
        return state;
      },
      () => {
        this.ajaxList();
      }
    );
  }

  render() {
    const {
      form
      // count,
      // data,
      // IncreaseCount,
      // loadData,
      // count1
    } = this.props;
    const { columns, datas, page, visible } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const { ajaxAdd, pageChange, handleOk, handleCancel } = this;
    return (
      <div className="ExampleContainer">
        {/* <Test
          ref={inp => {
            this.inp = inp;
          }}
        />
        <Button type="primary">Primary</Button>
        <button onClick={IncreaseCount}>点我</button>
        <h1>
          {count}
          ----
          {count1}
        </h1>
        <button onClick={loadData}>加载数据</button>
        <h1>{JSON.stringify(data)}</h1> */}
        <ThemeContext.Provider value={this.state}>
          <Toolbar />
        </ThemeContext.Provider>
        <Ref ref={this.myRef}>222</Ref>
        <div style={{ marginTop: '20px' }}>
          <div className="btns">
            <Button type="primary" onClick={ajaxAdd}>
              增加数据
            </Button>
          </div>
          <div className="lists">
            <Table
              onChange={pageChange}
              columns={columns}
              dataSource={datas}
              pagination={{
                total: +page.total,
                current: +page.current
              }}
            />
          </div>
        </div>
        <Modal title="新增数据" visible={visible} onOk={handleOk} onCancel={handleCancel}>
          <Form className="first-form">
            <FormItem {...formItemLayout} label="name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入name!' }]
              })(<Input placeholder="请输入name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="url">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入url!' }]
              })(<Input placeholder="请输入url" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

CompExampleContainer.defaultProps = {};
CompExampleContainer.propTypes = {};
function mapStateToProps(state) {
  return {
    count: state.exampleReducer.count,
    count1: state.ajaxReducer.count,
    data: state.ajaxReducer.data
  };
}
function mapDispatchToProps(dispatch) {
  return {
    IncreaseCount: () => {
      dispatch({
        type: 'TEST',
        namespace: 'ajaxReducer'
      });
    },
    loadData: () => {
      dispatch(() =>
        axios
          .get(config.staticlist)
          .then(response => {
            dispatch({
              type: 'AJAX',
              data: response.data
            });
          })
          .catch(_err => {
            // console.log(err);
          })
      );
    }
  };
}
const WrappedNormalForm = Form.create()(CompExampleContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalForm);
