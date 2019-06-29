/*
 *
 * Home
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'styles/Home.less';
import Example from 'containers/ExampleContainer';

export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="HomeComponent">
        <Example />
      </div>
    );
  }
}

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    // prop:state.property
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // someEvent:()=>{
    // dispatch(action)
    // }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
