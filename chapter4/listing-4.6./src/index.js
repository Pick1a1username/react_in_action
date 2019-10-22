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

        this.oops = this.oops.bind(this);
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

    componentWillUnmount() {
        console.log('ChildComponent: componentWillUnmount');
    }

    /**
     * This method will trigger an error.
     */
    oops() {
        this.setState(() => ({ oops: true }));
    }

    render() {
        console.log('ChildComponent: render');

        if (this.state.oops) {
            throw new Error('Something went wrong');
        }

        return [
            <div key="name">Name: {this.props.name}</div>,
            <button key="error" onClick={this.oops}>
                Create error
            </button>
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

    componentWillUnmount() {
        console.log('ParentComponent: componentWillUnmount');
    }

    componentDidCatch(err, errorInfo) {
        console.log('componentDidCatch');
        console.error(err);
        console.error(errorInfo);
        this.setState(() => ({ err, errorInfo }));
    }

    render() {
        console.log('ParentComponent: render');

        if (this.state.err) {
            return (
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
            );
        }

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