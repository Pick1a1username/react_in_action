import { PropTypes, Children, Component, cloneElement } from 'react';
import { navigate } from '../../history'

class Link extends Component {
    // to and children props will hold target URL and component you're Link-ifying, respectively.
    static propTypes = {
        to: PropTypes.string.isRequired,
        children: PropTypes.node,
    }

    render() {
        // Clone children of Link component to wrap only one node (it can have children).
        const { to, children } = this.props;
        // In props object, pass onClick handler that will navigate to URL using history.
        return cloneElement(Children.only(children), {
          onClick: () => navigate(to),
        });
    }
}

// import PropTypes from 'prop-types';
// import { Children, cloneElement } from 'react';
// import { navigate } from '../../history';

// function Link({ to, children }) {
//     return cloneElement(Children.only(children), {
//         onClick: () => navigate(to)
//     });
// }

// Link.propTypes = {
//     to: PropTypes.string,
//     children: PropTypes.node
// };

export default Link;


