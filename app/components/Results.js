const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');

function Profile(props) {
	const info = props.info;

	return (
		<PlayerPreview username={info.login} avatar={info.avatar_url}>
	    	<ul className='space-list-items'>
		        {info.name && <li>Name: {info.name}</li>}
		        {info.location && <li>Location: {info.location}</li>}
		        {info.company && <li>Company: {info.company}</li>}
		        <li>Followers: {info.followers}</li>
		        <li>Following: {info.following}</li>
		        <li>Public Repos: {info.public_repos}</li>
		        {info.blog && 
		        	<li><a href={info.blog}>{info.blog}</a></li>
		        }
	    	</ul>
	    </PlayerPreview>
	)
}



function Player(props) {
	return (
		<div>
			<h1 className='header'>{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			<Profile info={props.profile} />
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
};


class Results extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}

	componentDidMount() {
		const players = queryString.parse(this.props.location.search);
		
		api.battle([
			players.playerOneName,
			players.playerTwoName
		]).then(results => {
			if (results === null) {
				return this.setState(() => {
					return {
						error: 'It appears there was an error. Confirm that both users exist on Github.',
						loading: false
					}
				});
			}

			this.setState(() => {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false
				}
			})
		});
	}

	render() {
		const error = this.state.error;
		const winner = this.state.winner;
		const loser = this.state.loser;
		const loading = this.state.loading;
		
		if (loading === true) {
			return <Loading />
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile}
				/>
			</div>
		)
	}
}

module.exports = Results;

