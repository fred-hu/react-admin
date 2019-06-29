import { hot } from 'react-hot-loader';
import React from 'react';
import { connect } from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Link,
    withRouter,
    Switch,
    Redirect
} from 'react-router-dom';
import Navigation from './containers/Navigation';
import TopBar from './containers/TopBar';
import { Breadcrumb } from 'antd';
import AppBreadcrumb from 'containers/AppBreadcrumb';
import Home from 'containers/Home';

export class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {}
    trans = (data = [], obj = {}) => {
        data.forEach((v, i) => {
            obj[v.link] = v.linkName;
            v.children && v.children.length && this.trans(v.children, obj);
        });
        return obj;
    };
    render() {
        let breadcrumbNameMap = this.trans(this.props.menu) || {};

        return (
            <Router>
                <div id="app-container">
                    <div id="app-header">
                        <TopBar />
                    </div>
                    <div id="app-main">
                        <div
                            id="app-main-slider"
                            style={{ display: 'inline-block' }}
                        >
                            <Navigation />
                        </div>
                        <div
                            id="app-main-content"
                            style={{
                                display: 'inline-block',
                                verticalAlign: 'top',
                                padding: 20
                            }}
                        >
                            <AppBreadcrumb
                                breadcrumbNameMap={breadcrumbNameMap}
                            />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={props => (
                                        <Redirect
                                            to={{
                                                pathname: '/one',
                                                state: { from: props.location }
                                            }}
                                        />
                                    )}
                                />
                                <Route path="/one" exact component={Home} />
                            </Switch>
                        </div>
                    </div>
                    <div id="app-footer" />
                </div>
            </Router>
        );
    }
}
function mapStateToProps(state) {
    return {
        menu: state.menuReducer.menu
    };
}
function mapDispatchToProps(dispatch) {
    return {
        //someEvent:()=>{
        //dispatch(action)
        //}
    };
}
export default hot(process.env.NODE_ENV==='development'?module:null)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppRouter)
);
