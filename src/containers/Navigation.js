/*
 *
 * Navigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import { Menu, Icon, Switch, Layout } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
import 'styles/Navigation.less';
import { deepCopy } from 'tools/toolFunctions.js';

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
export class Navigation extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline', //vertical
      theme: 'light', //dark
      collapsed: false
    };
  }

  componentWillMount() {
    let a = new Promise(function(resolve) {
      setTimeout(() => {
        resolve(4000);
      }, 4000);
    });
    a.then(function(data) {
      // console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
    require.ensure(
      [],
      function(require) {
        let bundle = require('../test');
        console.log(bundle);
      },
      'bundle222'
    );
    import('lodash')
      .then(module => {
        // console(module.default);
      })
      .catch(err => {
        console(err.message);
      });

    async function test() {
      // console.log('start');
      await new Promise(function(resolve) {
        setTimeout(() => {
          resolve();
        }, 4000);
      });
      // console.log('end');
      return 'the test is done';
    }
    test().then(d => {
      // console.log(d);
    });
  }

  componentDidMount() {
    const _this = this;
    window.onhashchange = function(e) {
      matchMenu(_this.props.menu);
    };

    function matchMenu(data = [], parentId = []) {
      data.forEach((v, i) => {
        if (location.hash.replace('#', '') === v.link) {
          // console.log(v);
          // console.log(parentId);
          _this.props.matchMenu({
            defaultSelectedKeys: [v.id],
            defaultOpenKeys: [...parentId]
          });
          return;
        }
        v.children &&
          v.children.length &&
          matchMenu(v.children, parentId.concat(v.id + ''));
      });
    }

    matchMenu(this.props.menu);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    function transMenu(data) {
      transMenu.navigation = data.map((v, i) => {
        // console.log(v.icon);
        if (v.children && v.children.length) {
          return (
            <SubMenu
              key={v.id}
              title={
                <span>
                  <Icon type={v.icon} />
                  <span>{v.linkName}</span>
                </span>
              }
            >
              {transMenu(v.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={v.id}>
              <Link to={v.link}>
                <Icon type={v.icon} />
                <span>{v.linkName}</span>
              </Link>
            </Menu.Item>
          );
        }
      });
      return transMenu.navigation;
    }

    const { collapsed } = this.state;
    const { menu, defaultSelectedKeys, defaultOpenKeys } = this.props;
    return (
      <div className="NavigationComponent">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <a onClick={this.toggle} id="collapse">
            <Icon
              type={!collapsed ? 'double-left' : 'double-right'}
              theme="outlined"
            />
          </a>
          <Menu
            key={`${defaultSelectedKeys}-${defaultOpenKeys}`}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            mode={this.state.mode}
            theme={this.state.theme}
          >
            {transMenu(menu)}
          </Menu>
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
    defaultOpenKeys: state.menuReducer.defaultOpenKeys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    matchMenu: obj => {
      dispatch({
        type: 'MENU',
        data: obj
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
