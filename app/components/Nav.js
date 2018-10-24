import  React  from 'react'
import  { NavLink }  from 'react-router-dom'
export default function Nav() {
	return (
	 <ul className='nav'>
	  <li><NavLink activeClassName='active'to="/" exact> Home</NavLink></li>
	  <li><NavLink activeClassName='active' to="/popular">Popular</NavLink></li>
	  <li><NavLink activeClassName='active' to="/battle">Battle</NavLink></li>
	 </ul>
	)
}