import React from 'react' 
import PropTypes from 'prop-types'
import { fetchPopuparRepos } from '../utils/api.js'
import Loading from './Loading.js'

function SelectLanguage ({selectedLanguage, onSelect }) {
 const languages = [ "All", "Javascript", "Ruby", "Java", "CSS", "Python", "C#", "PHP"];

 return (
     <ul className="languages"> 
         {languages.map((lang) => (
               <li 
                style={lang === selectedLanguage ? {color: 'red'} : null}
                onClick={() =>onSelect(lang)} 
                key={lang}>
                {lang}
               </li>
       ))} 
     </ul>
 )
}

function RepoGrid ({ repos }) {
 return (
   <ul className='popular-list'>
      {repos.map(({name, stargazers_count, owner, html_url}, index) => (
         <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                 <img
                    className='avatar'
                    src={owner.avatar_url}
                    alt={'Avatar for ' + owner.login} />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li style={{color:'goldenrod'}}>{stargazers_count} stars</li>
            </ul>
         </li>
      ))}
   </ul>
  )
}

RepoGrid.propTypes = {
 repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
   selectedLanguage: PropTypes.string.isRequired,
   onSelect: PropTypes.func.isRequired
}



class Popular extends React.Component {
    constructor(props) {
        super();
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
        this.setState(() => ({
          selectedLanguage: lang,
          repos: null
        }));

     fetchPopuparRepos(lang)
      .then((repos) => this.setState(()=> console.log(lang, repos) || ({ repos })));
     }

    render(){
      const {selectedLanguage ,repos } = this.state;
        return (
         <div>
            <SelectLanguage 
                selectedLanguage={selectedLanguage}
                onSelect={this.updateLanguage}
            />
            {!this.state.repos
              ? <Loading text="Repos INCOMING" speed={200} />
              : <RepoGrid repos={repos}/>}
         </div>  
        )
    }
}

export default Popular;