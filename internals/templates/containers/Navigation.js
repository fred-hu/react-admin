/*
 *
 * Navigation
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import {Menu, Icon, Switch, Layout} from 'antd';
const {SubMenu} = Menu;
const {Sider} = Layout;
import 'styles/Navigation.less';
import {shuffle} from 'tools/toolFunctions.js';
// console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
export class Navigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',//vertical
      theme: 'light',//dark
      collapsed: false,
    };
  }

  componentWillMount() {

    let obj = {
      "test":1,
      "test2":2
    };
    console.log(Object.values(obj))
    console.log(Object.entries(obj))
    for(let [key,value] of Object.entries(obj)) {
      console.log(`key: ${key} value: ${value}`);
    }
    let Car = {
      name: 'BMW',
      price: 1000000,
      set discount(x) {
        this.d = x;
      },
      get discount() {
        return this.d;
      },
    };
    console.log(Car);
    Car.discount = 3;
    console.log(Car);
  }
  componentDidMount() {
    const _this = this;
    window.onhashchange = function (e) {
      matchMenu(_this.props.menu)
    };
    function matchMenu(data=[],parentId=[]) {
      data.forEach((v,i)=>{
        if (location.hash.replace('#','')===v.link){
          // console.log(v);
          // console.log(parentId);
          _this.props.matchMenu({
            defaultSelectedKeys:[v.id],
            defaultOpenKeys:[...parentId]
          });
          return;
        }
        v.children && v.children.length && matchMenu(v.children,parentId.concat(v.id+''))
      })
    }
    matchMenu(this.props.menu)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    function transMenu(data) {
      transMenu.navigation = data.map((v, i) => {
        if (v.children && v.children.length) {
          return (<SubMenu key={v.id} title={

            <span>
              <Icon type="mail"/>
              <span>
                {v.linkName}
                </span>
            </span>}>
            {
              transMenu(v.children)
            }
          </SubMenu>)
        } else {
          return (
            <Menu.Item key={v.id}>
              <Link to={v.link}>
                <Icon type="mail"/>
                <span>{v.linkName}</span>
              </Link>
            </Menu.Item>
          )
        }
      });
      return transMenu.navigation;
    }
    const {collapsed} = this.state;
    const {menu,defaultSelectedKeys,defaultOpenKeys} = this.props;
    return (
      <div className="NavigationComponent">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu
            key={`${defaultSelectedKeys}-${defaultOpenKeys}`}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            mode={this.state.mode}
            theme={this.state.theme}
          >
            {transMenu(menu)}
          </Menu>
          <div id='collapse'>
            <div className="pretty p-switch p-slim" style={{fontSize: 14}}>
              <input checked={!collapsed} type="checkbox" onChange={this.toggle}/>
              <div className="state">
                <label>{collapsed ? '' : '收缩菜单'}</label>
              </div>
            </div>
          </div>
        </Sider>

      </div>
    );
  }
}

Navigation.propTypes = {
  //dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    menu: state.menuReducer.menu,
    defaultSelectedKeys: state.menuReducer.defaultSelectedKeys,
    defaultOpenKeys: state.menuReducer.defaultOpenKeys,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    matchMenu:(obj)=>{
      dispatch({
        type:'MENU',
        data:obj
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
