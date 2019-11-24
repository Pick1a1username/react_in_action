import React from 'react';
import { render } from 'react-dom';

import App from './app';
import { Home } from './pages/Home';
import SinglePost from './pages/Post';
// import Login from './pages/login';
import Router from './components/router/Router';
import Route from './components/router/Route';
import { history } from './history/history';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
// NOTE: this isn't ES*-compliant/possible, but works because we use Webpack as a build tool
import './styles/styles.scss';

/**
 * Create a function you'll call to render your app;
 * wrap React DOM's render method so you can pass location data and a callback.
 * @param {*} state 
 * @param {*} callback 
 */
export const renderApp = (state, callback = () => {}) => {
    render(
        // Use JSX spread operator to "fill in" location state as props for your Router.
        <Router {...state}>
            {/* Create route for App and Home component */}
            <Route path="" component={App}>
                <Route path="/" component={Home} />
                <Route path="/posts/:postId" component={SinglePost} />
                {/* <Route path="/login" component={Login} /> */}
                {/* <Route path="*" component={NotFound} /> */}
            </Route>
        </Router>,
        // Render app to target DOM element in index.html.
        document.getElementById('app'),
        callback
    );
};

// Create a state object to keep track of location and user.
let state = {
    location: window.location.pathname,
};

// Fire when location changes and update router, causing application to re-render with new state data.
history.listen(location => {
    state = Object.assign({}, state, {
        location: location.pathname
    });
    renderApp(state);
});

// Render the app.
renderApp(state);