import React, { Component } from 'react';
const FancyButton = React.forwardRef((props, ref) => {
    return (
        <div>
            <h1>这是一个测试</h1>
            <button ref={ref} className="FancyButton">
                {props.children}
            </button>
        </div>
    );
});
export default FancyButton;
