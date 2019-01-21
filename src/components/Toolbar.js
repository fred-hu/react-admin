import React, { Component } from 'react';
import ThemeContext from 'contexts/test';
export default class Toolbar extends Component {
    // 上下文订阅方式一
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        console.log('---', this.context);
    };

    render() {
        return (
            // 上下文订阅方式二
            <ThemeContext.Consumer>
                {({ changeCtx, testCtx }) => (
                    <div onClick={changeCtx}>{testCtx}-{this.context.testCtx}</div>
                )}
            </ThemeContext.Consumer>
        );
    }
}
