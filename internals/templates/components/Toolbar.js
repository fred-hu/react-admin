import React, { Component } from 'react';
import ThemeContext from '../contexts/test';

export default class Toolbar extends Component {
    // 上下文订阅方式一
    static contextType = ThemeContext;

    // constructor(props) {
    //   super(props);
    // }

    componentDidMount = () => {
      // console.log('---', this.context);
    };

    render() {
      const { testCtx: testCtxC } = this.context;
      return (
      // 上下文订阅方式二
        <ThemeContext.Consumer>
          {({ changeCtx, testCtx }) => (
            <button type="button" onClick={changeCtx}>
              {testCtx}
-
              {testCtxC}
            </button>
          )}
        </ThemeContext.Consumer>
      );
    }
}
