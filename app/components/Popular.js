import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api.js'
import Loading from './Loading.js'

SelectLanguage = (props) => {
 var languages = [ "All", "Javascript", "Ruby", "Java", "CSS", "Python", "C#", "PHP"]

 return (
     <ul className="languages"> 
         {languages.map((lang) =>{
           return (
               <li 
                style={lang === props.selectedLanguage ? {color: 'red'} : null}
                onClick={props.onSelect.bind(null,lang)} 
                key={lang}>
                {lang}
               </li>
           ) 
         })} 
     </ul>
 )
}

RepoGrid = (props) => {
 return (
   <ul className='popular-list'>
      {props.repos.map((repo, index) => {
       return (
         <li key={repo.name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                 <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login} />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li style={{color:'goldenrod'}}>{repo.stargazers_count} stars</li>
            </ul>
         </li>
        )
         
      })}
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
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
     api.fetchPopuparRepos(lang)
     .then((repos) => {
       
       this.setState(()=> console.log(lang, repos) || ({
          repos: repos
        }));
       });
    }
    render(){
        return (
         <div>
            <SelectLanguage 
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage}
            />
            {!this.state.repos
              ? <Loading text="Repos INCOMING" speed={200} />
              : <RepoGrid repos={this.state.repos}/>}
        </div>  
        )
    }
}

export default Popular;