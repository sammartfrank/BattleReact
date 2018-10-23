import axios from 'axios';

var id = '0fa37c42a29594230c73';
var sec = '3c8647807d60187d9c6c008985f7232ee92ff498';
var params = "?client_id=" + id + "&client_secret=" + sec;

getProfile = (username) => {
	 axios.get('https://api.github.com/users/' + username + params)
		        .then((user) => {
		        	return user.data;
		 		});
}

getRepos = (username) => {
	 axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

 getStarCount = (repos) => {
	 repos.data.reduce((count, repo) => {
		 count + repo.stargazers_count;
	}, 0);
}

calculateScore = (profile, repos) => {
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	 (followers *3) + totalStars;
}
handleError = (error) => { 
	console.warn(error);
	 null;
}
 getUserData = (player) => {
	 axios.all([
		getProfile(player),
		getRepos(player)
	])
	.then((data) => {
		var profile= data[0];
		var repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	})
}
sortPlayers = (players) => {
	 players.sort((a,b) => {
		 b.score - a.score;
	})
}

export  default  {

	battle:  (players) => {
		axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)

	},
	fetchPopuparRepos: (language) => {
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

		axios.get(encodedURI)
            .then((response) => {
                return response.data.items;
        })
	}
}
