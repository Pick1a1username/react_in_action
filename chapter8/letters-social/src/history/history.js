import createHistory from 'history/createBrowserHistory';
// Make a single instance of history library available to your app.
const history = createHistory();
const navigate = to => history.push(to);
export { history, navigate };
