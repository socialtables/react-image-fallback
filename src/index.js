import React, {Component, PropTypes} from "react";

class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayImage: props.initialImage
		};
		this.setImage = this.setImage.bind(this);
	}

	setImage(props) {
		let displayImage = new Image();
		displayImage.onerror = () => {
			this.setState({
				displayImage: props.fallbackImage
			});
		};
		displayImage.onload = () => {
			this.setState({
				displayImage: props.src
			});
		};
		displayImage.src = props.src;
	}
	componentDidMount() {
		this.setImage(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shouldUpdateImage(this.props, nextProps)) {
			this.setImage(nextProps);
		}
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
	src: PropTypes.string.isRequired,
	fallbackImage: PropTypes.string.isRequired,
	initialImage: PropTypes.string,
	shouldUpdateImage: PropTypes.func
};

ReactImageFallback.defaultProps = {
	initialImage: null,
	shouldUpdateImage: function(props, nextProps) {
		return props.src !== nextProps.src;
	}
};


module.exports = ReactImageFallback;