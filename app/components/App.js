const React = require('react');
const PropTypes = require('prop-types');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;

// change to ReactRouter.HashRouter
// things changed in v4 of Router
const Route = ReactRouter.Router;
const Nav = require('./Nav');
const Home = require('./Home');

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Route path='/' component={Home} />
                    <Route path='/popular' component={Popular} />
                </div>
            </Router>
        );
    }
}


module.exports = App;