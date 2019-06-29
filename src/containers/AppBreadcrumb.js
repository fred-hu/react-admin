/*
 *
 * AppBreadcrumb
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HashRouter as Router, Route, Switch, Link, withRouter
} from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';
import 'styles/AppBreadcrumb.less';
import { Navigation } from 'containers/Navigation';

const AppBreadcrumb = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {props.breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    (
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )
  ].concat(extraBreadcrumbItems);
  return (
    <div className="AppBreadcrumb">
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
});
export default AppBreadcrumb;
