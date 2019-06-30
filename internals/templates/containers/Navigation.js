import React from 'react';
import { connect } from 'react-redux';
import {
  // HashRouter as Router,
  // Route,
  Link
  // withRouter
} from 'react-router-dom';
import {
  Menu, Icon, Layout
} from 'antd';
import PropTypes from 'prop-types';
import '../styles/Navigation.less';
// import { deepCopy } from 'tools/toolFunctions.js';

const { SubMenu } = Menu;
const { Sider } = Layout;

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
export class Navigation extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
    defaultSelectedKeys: PropTypes.oneOfType([PropTypes.any]),
    defaultOpenKeys: PropTypes.oneOfType([PropTypes.any])
  }

  static defaultProps = {
    menu: [],
    defaultSelectedKeys: null,
    defaultOpenKeys: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline', // vertical
      theme: 'light', // dark
      collapsed: false
    };
  }

  componentWillMount() {
    const a = new Promise(((resolve) => {
      setTimeout(() => {
        resolve(4000);
      }, 4000);
    }));
    a.then((_data) => {
      // console.log(data);
    }).catch((err) => {
      window.console.log(err);
    });
    require.ensure(
      [],
      (require) => {
        const bundle = require('../test.ts');
        window.console.log(bundle);
      },
      'bundle222'
    );
    import('lodash')
      .then((_module) => {
        // console(module.default);
      })
      .catch((err) => {
        console(err.message);
      });

    async function test() {
      // console.log('start');
      await new Promise(((resolve) => {
        setTimeout(() => {
          resolve();
        }, 4000);
      }));
      // console.log('end');
      return 'the test is done';
    }
    test().then((_d) => {
      // console.log(d);
    });
  }

  componentDidMount() {
    const that = this;
    const { menu } = this.props;
    function matchMenu(data = [], parentId = []) {
      data.forEach((v, _i) => {
        if (window.location.hash.replace('#', '') === v.link) {
          // console.log(v);
          // console.log(parentId);
          that.props.matchMenu({
            defaultSelectedKeys: [v.id],
            defaultOpenKeys: [...parentId]
          });
          return;
        }
        if (v.children && v.children.length) {
          matchMenu(v.children, parentId.concat(`${v.id}`));
        }
      });
    }
    window.onhashchange = () => {
      matchMenu(menu);
    };
    matchMenu(menu);
  }

  toggle = () => {
    this.setState((prevState, _props) => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    function transMenu(data) {
      transMenu.navigation = data.map((v, _i) => {
        // console.log(v.icon);
        if (v.children && v.children.length) {
          return (
            <SubMenu
              key={v.id}
              title={(
                <span>
                  <Icon type={v.icon} />
                  <span>{v.linkName}</span>
                </span>
              )}
            >
              {transMenu(v.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={v.id}>
            <Link to={v.link}>
              <Icon type={v.icon} />
              <span>{v.linkName}</span>
            </Link>
          </Menu.Item>
        );
      });
      return transMenu.navigation;
    }

    const { mode, theme, collapsed } = this.state;
    const { menu, defaultSelectedKeys, defaultOpenKeys } = this.props;
    return (
      <div className="NavigationComponent">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <button type="button" onClick={this.toggle} id="collapse">
            <Icon
              type={!collapsed ? 'double-left' : 'double-right'}
              theme="outlined"
            />
          </button>
          <Menu
            key={`${defaultSelectedKeys}-${defaultOpenKeys}`}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            mode={mode}
            theme={theme}
          >
            {transMenu(menu)}
          </Menu>
        </Sider>
      </div>
    );
  }
}

Navigation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
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
    matchMenu: (obj) => {
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
