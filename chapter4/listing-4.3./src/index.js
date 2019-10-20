import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';

class ChildComponent extends Component {
    static propTypes = {
        name: Proptypes.string
    };

    static defaultProps = (function() {
        console.log('ChildComponent : defaultProps')
        return {};
    })();

    constructor(props) {
        super(props);
        console.log('ChildComponent: state');
        this.state = {
            name: 'Mark',
        };
    }

    componentWillMount() {
        console.log('ChildComponent: componentWillMount')
    }

    componentDidMount() {
        console.log('ChildComponent: componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('ChildComponent: componentWillReceiveProps');
        console.log('nextProps: ', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('<ChildComponent/> - shouldComponentUpdate');
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('<ChildComponent/> - componentWillUpdate');
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
        return true;
    }

    componentDidUpdate(nextProps, nextState) {
        console.log('<ChildComponent/> - componentDidUpdate');
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
        return true;
    }

    render() {
        if (this.state.oops) {
            throw new Error('Something went wrong');
        }

        console.log('ChildComponent: render');

        return [
            <div key="name">Name: {this.props.name}</div>
        ];
    }
};

class ParentComponent extends Component {
    static defaultProps = (function() {
        console.log('ParentComponent: defaultProps');
        return {
            true: false
        };
    })();

    constructor(props) {
        super(props);
        console.log('ParentComponent: state');
        this.state = { name: '' };
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillMount() {
        console.log('ParentComponent: componentWillMount');
    }

    componentDidMount() {
        console.log('ParentComponent: componentDidMount');
    }
    
    onInputChange(e) {
        const text = e.target.value;
        this.setState(() => ({ text: text }));
    };

    render() {
        console.log('ParentComponent: render');
        return [
            <h2 key="h2">Learn about rendering and lifecycle methods!</h2>,
            <input key="input" value={this.state.text} onChange={this.onInputChange} />,
            <ChildComponent key="ChildComponent" name={this.state.text} />
        ];
    };
};

render(
    <ParentComponent />,
    document.getElementById('container')
);