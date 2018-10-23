import React from 'react'
import PropTypes from 'prop-types'


PlayerPreview = (props) => {
	 return (
	 		<div>
	 			<div className='column'>
	 				<img 
	 					className='avatar'
	 					src= {props.avatar}
	 					alt= {'Avatar of ' + props.username}
	 				/>
	 				<h2 className='username' style={{color:'darkblue'}}>@{props.username}</h2>
	 			</div>
	 			{props.children}
	 		</div>
	 )
}
PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}

export default PlayerPreview;