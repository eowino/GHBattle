const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');

// A Stateless Functional Component
// Stateless because this function doesn't have state
// Functional because its just a function thats returns a UI
function SelectLanguage({ selectedLanguage, onSelect }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    const styles = {
        'borderBottom': '3px double orange'
    };

    return (
        <ul className="languages">
            {languages.map(lang => {
                return (
                    <li 
                        key={ lang }
                        style={ lang === selectedLanguage ? styles : null } 
                        onClick={ onSelect.bind(null, lang)} > {lang}
                    </li>
                )
            })}
        </ul> 
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

function RepoGrid({ repos }) {
    return (
        <ul className="popular-list">
            { repos.map((repo, index) => {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <a target="_blank" href={repo.html_url}>
                                <li>
                                    <img 
                                        className="avatar"
                                        src={repo.owner.avatar_url} 
                                        alt={`Avatar for ${repo.owner.login}`}
                                    />
                                </li>
                                <li>{repo.name}</li>
                                <li className="info">@{repo.owner.login}</li>
                                <li className="info">{repo.stargazers_count} stars</li>
                            </a>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
};


class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            };
        });

        api.fetchPopularRepos(lang)
            .then(res => this.setState(() => {
                return {
                    repos: res
                }
            }));
    }

    render() {
        return (
             <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/>
                { !this.state.repos
                  ? <Loading />
                  : <RepoGrid repos={this.state.repos} /> }
             </div>
        )
    }
}


module.exports = Popular;