const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Switch = ReactRouter.Switch;

// change to ReactRouter.HashRouter
// things changed in v4 of Router
const Route = ReactRouter.Router;
const Popular = require('./Popular');
const Nav = require('./Nav');
const Home = require('./Home');

class App extends React.Component {
    render() {
        return (
            <Router history={{}}>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route path='/' component={Home} />
                        <Route path='/popular' component={Popular} />
                        <Route render={ () => <p>Not Found</p> }/>
                    </Switch>
                </div>
            </Router>
        );
    }
}


module.exports = App;