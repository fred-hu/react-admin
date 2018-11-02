
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from 'tools/config';
import request from 'tools/request';
import { Button } from 'antd';
import axios from 'axios';
import 'static/logo.png';
class CompExampleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {
    this.test()
  }
  test = ()=>{
    console.log(1111)
  };
  render() {
    const {count,data,IncreaseCount,loadData} = this.props;
    return (
      <div>
        <Button type="primary">Primary</Button>
        <button onClick={IncreaseCount}>点我</button>
        <h1>{count}</h1>
        <button onClick={loadData}>加载数据</button>
        <h1>{JSON.stringify(data)}</h1>
      </div>
    );
  }
}

CompExampleContainer.defaultProps = {};
CompExampleContainer.propTypes = {};
function mapStateToProps(state) {
  return {
    count:state.exampleReducer.count,
    data:state.ajaxReducer.data
  };
}
function mapDispatchToProps(dispatch) {
  return {
    IncreaseCount:()=>{
      dispatch({
        type: 'TEST'
      })
    },
    loadData:()=>{
      dispatch(()=>{
        return axios.get(config.staticlist).then(function (response) {
          
          dispatch({
            type:"AJAX",
            data:response.data
          });
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CompExampleContainer);