import React, { Component, PropTypes } from "react";

function getImageArray(props) {
	const { src, fallbackImage } = props;
	const source = Array.isArray(src) ? src : [src];
	return source.concat(fallbackImage);
}

class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.displayImage = new Image();
		this.state = {
			imageSource: props.initialImage,
			imageIndex: 0,
			hasInitial: !!props.initialImage,
			images: getImageArray(props)
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	componentDidMount() {
		this.setDisplayImage();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({
				imageIndex: 0,
				images: getImageArray(nextProps)
			}, this.setDisplayImage);
		}
	}

	componentWillUnmount() {
		this.displayImage.onerror = null;
		this.displayImage.onload = null;
	}

	setDisplayImageSrc() {
		this.displayImage.src = this.state.imageSource;
	}

	setDisplayImage() {
		this.displayImage.onerror = () => {
			const { images, imageIndex } = this.state;
			this.setState({
				imageSource: images[imageIndex],
				imageIndex: imageIndex + 1
			}, this.setDisplayImageSrc);
		};

		this.displayImage.onload = () => {
			const { images, imageIndex, hasInitial } = this.state;
			const callback = hasInitial && this.setDisplayImageSrc;
			this.setState({
				imageSource: images[imageIndex - 1],
				hasInitial: false
			}, callback);
		};

		this.setDisplayImageSrc();
	}

	render() {
		const { imageSource } = this.state;
		return imageSource ? <img {...this.props} src={imageSource} /> : null;
	}
}
ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string
	]).isRequired,
	fallbackImage: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string
	]),
	initialImage: PropTypes.string
};

ReactImageFallback.defaultProps = {
	fallbackImage: null,
	initialImage: null
};


module.exports = ReactImageFallback;
