import React from "react";

class ReactImageFallback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayImage: props.initialImage
		};
	}

	componentDidMount() {
		let displayImage = new Image();
		displayImage.onerror = () => {
			this.setState({
				displayImage: this.props.fallbackImage
			});
		};
		displayImage.onload = () => {
			this.setState({
				displayImage: this.props.src
			});
		};
		displayImage.src = this.props.src;
	}

	render() {
		let image = this.state.displayImage ? <img {...this.props} src={this.state.displayImage} /> : null;
		return (
			<span>{image}</span>
		);
	}
}
ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: React.PropTypes.string.isRequired,
	fallbackImage: React.PropTypes.string.isRequired,
	initialImage: React.PropTypes.string,
};

ReactImageFallback.defaultProps = {
	initialImage: null
};


module.exports = ReactImageFallback;