import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from 'tools/config';
import request from 'tools/request';
import { Button } from 'antd';
import axios from 'axios';
import 'static/logo.png';
import { Table, Divider, Tag } from 'antd';
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }
  componentDidMount() {}
  focus() {
    // alert();
  }
  render() {
    return <input placeholder="hello" />;
  }
}
class CompExampleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '名字',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '地址',
          dataIndex: 'url',
          key: 'url',
        }
      ],
      datas: []
    };
  }
  componentWillMount() {
    this.test();
  }
  componentDidMount() {
    this.inp.focus();
  }
  test = () => {
    console.log(1111);
  };
  ajaxList() {
    let _this = this;
    request
      .get('/curd/list')
      .then(function(response) {
        response.data.forEach(v=>{
          v.key= v['_id']
        })
        _this.setState({
          datas:response.data
        })
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  ajaxAdd() {
    let _this = this;
    request
      .post('/curd/add')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    const { count, data, IncreaseCount, loadData, count1 } = this.props;
    let { columns, datas } = this.state;
    return (
      <div>
        <Test
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
        <h1>{JSON.stringify(data)}</h1>
        <Button type="primary" onClick={this.ajaxList.bind(this)}>
          请求数据
        </Button>
        <Button type="primary" onClick={this.ajaxAdd.bind(this)}>
          增加数据
        </Button>
        <Table columns={columns} dataSource={datas} />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompExampleContainer);
