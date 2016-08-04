import React, { Component, PropTypes } from "react";

export default class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.displayImage = new window.Image();
		this.state = {
			imageSource: props.initialImage
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	componentDidMount() {
		this.setDisplayImage(this.props.src, this.props.fallbackImage);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src){
			this.setDisplayImage(nextProps.src, nextProps.fallbackImage);
		}
	}

	componentWillUnmount() {
		this.displayImage.onerror = null;
		this.displayImage.onload = null;
	}

	setDisplayImage(image, fallback) {
		this.displayImage.onerror = () => {
			this.setState({
				imageSource: fallback
			}, () => {
				if (this.props.onError) {
					this.props.onError(image);
				}
			});
		};
		this.displayImage.onload = () => {
			this.setState({
				imageSource: image
			}, () => {
				if (this.props.onLoad) {
					this.props.onLoad(image);
				}
			});
		};
		this.displayImage.src = image;
	}

	render() {
		// so non-kosher HTML attributes not passed to <img />
		const props = Object.assign({}, this.props, {
			fallbackImage: null,
			initialImage: null
		})
		return this.state.imageSource ? <img {...props} src={this.state.imageSource} /> : null;
	}
}
ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: PropTypes.string.isRequired,
	fallbackImage: PropTypes.string.isRequired,
	initialImage: PropTypes.string,
	onLoad: PropTypes.func,
	onError: PropTypes.func
};

ReactImageFallback.defaultProps = {
	initialImage: null
};
