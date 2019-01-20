import React, { Component } from 'react';
import ThemeContext from 'contexts/test';
export default class Toolbar extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        console.log('---',this.context);
    }
    
    render() {
        return <div>toolbar</div>;
    }
}
