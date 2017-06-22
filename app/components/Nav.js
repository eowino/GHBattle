const React = require('react');

// Used to change style of Nav link based on whether a route is active
// Composes Link and adds some extra properties
const NavLink = require('react-router-dom').NavLink;


function Nav() {
    return (
        <ul className="nav">
            <li><h2><NavLink exact activeClassName='active' to='/'>Home</NavLink></h2></li>
            <li><h2><NavLink activeClassName='active' to='/battle'>Battle</NavLink></h2></li>
            <li><h2><NavLink activeClassName='active' to='/popular'>Popular</NavLink></h2></li>
        </ul>
    )
}

module.exports = Nav;