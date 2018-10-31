import React  from 'react'
import PropTypes  from 'prop-types'
const styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px',
		color: 'indigo',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
};

class Loading extends React.Component {

	static propTypes = {
		text: PropTypes.string.isRequired,
		speed: PropTypes.number.isRequired,
	}
	static defaultProps = {
		text: 'Repositories Loading',
		speed: 300,
	}
	
	state = {
		text: this.props.text
	}
	
	componentDidMount() {

		const {text, speed} = this.props
		const stopper = text + '....';
		
		this.interval = window.setInterval(() => {
			this.state.text === stopper
            ? this.setState(() => ({ text: this.props.text }))
            : this.setState((prevState) => ({ text: prevState.text + '.' }))
		}, speed)
	}
	componentWillUnmount() {
		console.log('Clear the interval');
		window.clearInterval(this.interval);
	}
	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)
	}
}
export default Loading;

