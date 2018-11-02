/*
 *
 * TopBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'styles/TopBar.less';
export class TopBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      string:''
    };
  }
  componentWillMount(){


  }
  componentDidMount(){
    let data=[
      {
        label:'h1',
        content:'内容1',
        children:[{
          label:'strong',
          content:'内容1-1',
          children:[{
            label:'span',
            content:'内容1-1-1',
          }]
        }]
      },
      {
        label:'h2',
        content:'内容2'
      }
    ];
    let string = '';
    function trans(data) {
      data.forEach((v,i)=>{
        string = string+'<'+v.label+'>'+(v.children?v.content+trans(v.children):v.content)+'</'+v.label+'>';
      });
      return string;
    }
    trans(data);
    this.setState({
      string
    })
  }
  render() {
    return (
      <div className="TopBarComponent">
        {this.state.string}
      </div>
    );
  }
}

TopBar.propTypes = {
  //dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        //prop:state.property
    };
}
function mapDispatchToProps(dispatch) {
  return {
    //someEvent:()=>{
        //dispatch(action)
    //}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
