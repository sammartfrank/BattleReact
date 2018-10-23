// Components
import React from  'react'
import Popular from  './Popular'
import Nav from  './Nav.js'
import Home from  './Home.js'
import Battle from  './Battle.js'
import Results from  './Results.js'
//React Router
import {ReactRouter, Router, Route, Switch } from 'react-router-dom'



class App extends React.Component {
	render() {
		return (
		 <Router>
			<div className="container">
                <Nav />
                <Switch>
	                <Route path='/' exact component={Home} />
	                <Route path='/popular' component={Popular} />	                
	                <Route path='/battle' exact component={Battle} />
	                <Route path='/battle/results' component={Results} />
	                <Route render={() => {
	                	return <p>404 - Not Found </p>
	                }} />
                </Switch>
			</div>
        </Router>
		)
	}
}

export default App;