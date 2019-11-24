import enroute from 'enroute';
import invariant from 'invariant';

export default class Router extends Component {
    static propTypes = {
        // children: this.propTypes.object,
        // location: this.propTypes.string.isRequired
        children: this.propTypes.element.isRequired,
        location: this.propTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.routes = {};

        this.router = enroute(this.routes);
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    /**
     * Ensure that parent and child routes get created as the right 
     * strings with a forward slash if and where necessary.
     * @param {*} path 
     * @param {*} parent 
     */
    normalizeRoute(path, parent) {
        if (path[0] === '/') {
            return path;
        }

        if (parent == null) {
            return path;
        }

        return `${parent.route}/${path}`;
    }

    /**
     * addRoutes method gets used in addRoute any time there are additional children to iterate over.
     * @param {*} routes 
     * @param {*} parent 
     */
    addRoutes(routes, parent) {
        // Use React.Children.forEach utility ot iterate over each of the children, then invoke addRoute for each child Route component.
        React.Children.forEach(routes, route => this.addRoute(route, parent));
    }

    addRoute(element, parent) {
        // Use destructuring to get component, path, and children props.
        const { component, path, children } = element.props;

        // Make sure every Route has a path and component prop or throw an error.
        invariant(component, `Route ${path} is missing the "path" property`);
        invariant(typeof path === 'string', `Route ${path} is not a string`);

        // render is a function you'll give to enroute that takes route-related params and additional data.
        const render = (params, renderProps) => {
            // Merge together props from parent with child component.
            const finalProps = Object.assign({ params }, this.props, renderProps);

            // Create a new component with merged props.
            const children = React.createElement(component, finalProps);

            // If there's a parent, invoke render method of parent parameter but with children you've created.
            return parent ? parent.render(params, { children }) : children;
        }

        // Use normalizeRoute helper to make sure the URL path gets set up right.
        const route = this.normalizeRoute(path, parent);

        // If there are more nested children on current Route component, repeat process and pass in route and parent component.
        if (children) {
            this.addRoutes(children, { route, render });
        }

        // Use cleanPath utility to create path on routes object and assign your finished function to it.
        this.routes[this.cleanPath(route)] = render;
    }


    render() {
        const { location } = this.props;
        invariant(location, '<Router/> needs a location to work');
        return this.router(location);
    }
}
