import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from 'tools/config';
import request from 'tools/request';
import { Button } from 'antd';
import axios from 'axios';
import img from 'static/logo.png';
// console.log(img);
import Toolbar from 'components/Toolbar';
import ThemeContext from 'contexts/test';
import Ref from 'components/ref';

import jsonp from 'jsonp';
import {
    Table,
    Divider,
    Form,
    Modal,
    Icon,
    Input,
    Checkbox,
    message,
    Popconfirm
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
            page: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            testCtx:1,
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
                            <a
                                href="javascript:;"
                                onClick={this.getDetail.bind(
                                    this,
                                    record['_id']
                                )}
                            >
                                编辑
                            </a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="确认删除?"
                                onConfirm={this.delete.bind(
                                    this,
                                    record['_id']
                                )}
                                onCancel={() => {}}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            ],
            datas: [],
            detail: {},
            changeCtx:()=>{
                this.setState({
                    'testCtx':2
                })
            }
        };
        // ref用例
        this.myRef = React.createRef();
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
        document.addEventListener('click',function(){
            // jsonp(config.host+'/curd/jsonp',{
            //     param:'callback',
            //     name:'test'
            // },function(error,data){
            //     console.log(data);
            // })
            var callback = 'jsonp' + +new Date();
            window[callback] = function(d){
                console.log('jsonp-------->',d);
                delete window[callback];
                // alert(d);
            }
            var script = document.createElement('script');
            script.src = config.host+'/curd/jsonp?callback='+callback;
            document.documentElement.appendChild(script);
        },false)


        
    }
    test = () => {
        // console.log(1111);
    };
    ajaxList() {
        let _this = this;
        let { pageSize, current } = this.state.page;
        request
            .get('/curd/list', {
                params: {
                    pageSize,
                    current
                }
            })
            .then(function(response) {
                let data = response.data;
                data.data.forEach(v => {
                    v.key = v['_id'];
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
            .catch(function(err) {
                // console.log(err);
            });
    }
    getDetail(id) {
        let _this = this;
        request
            .get('/curd/list/detail', {
                params: {
                    id
                }
            })
            .then(function(response) {
                _this.setState(
                    {
                        detail: response.data.data,
                        visible: true
                    },
                    () => {
                        let { name, url } = _this.state.detail;
                        _this.props.form.setFieldsValue({
                            name,
                            url
                        });
                    }
                );
            })
            .catch(function(err) {
                // console.log(err);
            });
    }
    handleOk() {
        let _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (_this.state.detail['_id']) {
                    values['id'] = _this.state.detail['_id'];
                    request
                        .post('/curd/update', values)
                        .then(function(response) {
                            message.success(response.data.description);
                            _this.ajaxList();
                        })
                        .catch(function(err) {
                            // console.log(err);
                        });
                    this.setState(
                        {
                            visible: false
                        },
                        () => {
                            this.props.form.resetFields();
                        }
                    );
                } else {
                    request
                        .post('/curd/add', values)
                        .then(function(response) {
                            message.success(response.data.description);
                            _this.ajaxList();
                        })
                        .catch(function(err) {
                            // console.log(err);
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
            visible: true,
            detail: {}
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
                // console.log(err);
            });
    }
    pageChange(page) {
        this.setState(
            (state, props) => {
                return (state.page.current = page.current);
            },
            function() {
                this.ajaxList();
            }
        );
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
                <ThemeContext.Provider value={this.state}>
                    <Toolbar />
                </ThemeContext.Provider>
                <Ref ref={this.myRef}>
                    222
                </Ref>
                <div style={{ marginTop: '20px' }}>
                    <div className="btns">
                        <Button
                            type="primary"
                            onClick={this.ajaxAdd.bind(this)}
                        >
                            增加数据
                        </Button>
                    </div>
                    <div className="lists">
                        <Table
                            onChange={this.pageChange.bind(this)}
                            columns={columns}
                            dataSource={datas}
                            pagination={{
                                total: +this.state.page.total,
                                current: +this.state.page.current
                            }}
                        />
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
                                rules: [
                                    { required: true, message: '请输入name!' }
                                ]
                            })(<Input placeholder="请输入name" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="url">
                            {getFieldDecorator('url', {
                                rules: [
                                    { required: true, message: '请输入url!' }
                                ]
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
                        // console.log(err);
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
