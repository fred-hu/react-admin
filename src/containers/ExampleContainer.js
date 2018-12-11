import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from 'tools/config';
import request from 'tools/request';
import { Button } from 'antd';
import axios from 'axios';
import 'static/logo.png';
import {
  Table,
  Divider,
  Form,
  Modal,
  Icon,
  Input,
  Checkbox,
  message
} from 'antd';
const FormItem = Form.Item;
import 'styles/ExampleContainer.less';
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
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
          render: (text, record) => (
            <span>
              <a href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={this.delete.bind(this, record['_id'])}
              >
                删除
              </a>
            </span>
          )
        }
      ],
      datas: []
    };
  }
  componentWillMount() {
    this.test();
    this.ajaxList();
  }
  componentDidMount() {
    // this.inp.focus();
  }
  test = () => {
    console.log(1111);
  };
  ajaxList() {
    let _this = this;
    request
      .get('/curd/list')
      .then(function(response) {
        response.data.data.forEach(v => {
          v.key = v['_id'];
        });
        _this.setState({
          datas: response.data.data
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  handleOk() {
    let _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        request
          .post('/curd/add', values)
          .then(function(response) {
            _this.ajaxList();
            console.log(response);
          })
          .catch(function(err) {
            console.log(err);
          });
        this.setState(
          {
            visible: false
          },
          () => {
            this.props.form.resetFields();
          }
        );
      }
    });
  }
  handleCancel() {
    this.setState(
      {
        visible: false
      },
      () => {
        this.props.form.resetFields();
      }
    );
  }
  ajaxAdd() {
    this.setState({
      visible: true
    });
  }
  delete(id) {
    let _this = this;
    request
      .post('/curd/delete', {
        id
      })
      .then(function(response) {
        if (response.data.success) {
          message.success(response.data.description);
          _this.ajaxList();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    const { count, data, IncreaseCount, loadData, count1 } = this.props;
    let { columns, datas } = this.state;
    const { getFieldDecorator } = this.props.form;
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
        <div style={{ marginTop: '20px' }}>
          <div className="btns">
            <Button type="primary" onClick={this.ajaxAdd.bind(this)}>
              增加数据
            </Button>
          </div>
          <div className="lists">
            <Table columns={columns} dataSource={datas} />
          </div>
        </div>
        <Modal
          title="新增数据"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
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
      dispatch(() => {
        return axios
          .get(config.staticlist)
          .then(function(response) {
            dispatch({
              type: 'AJAX',
              data: response.data
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    }
  };
}
const WrappedNormalForm = Form.create()(CompExampleContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalForm);
