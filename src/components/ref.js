import React from 'react';
import PropTypes from 'prop-types';

const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <h1>这是一个测试</h1>
    <button type="button" ref={ref} className="FancyButton">
      {props.children}
    </button>
  </div>
));
FancyButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any])
};

FancyButton.defaultProps = {
  children: null
};
export default FancyButton;
