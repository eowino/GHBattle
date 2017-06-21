const React = require('react');

// Used to change style of Nav link based on whether a route is active
// Composes Link and adds some extra properties
const NavLink = require('react-router-dom').NavLink;


function Nav() {
    return (
        <ul className="nav">
            <li>
                <NavLink exact activeClassName='active' to='/'>Home</NavLink>
                <NavLink activeClassName='active' to='/battle'>Battle</NavLink>
                <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav;