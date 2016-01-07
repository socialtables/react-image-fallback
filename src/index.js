import React, { Component, PropTypes } from "react";

function getImageArray(props) {
	const { src, fallbackImage } = props;
	const source = Array.isArray(src) ? src : [src];
	return source.concat(fallbackImage).filter(x => !!x);
}

export default class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.displayImage = new Image();
		this.state = {
			imageSource: props.initialImage,
			imageArray: getImageArray(props),
			imageIndex: -1,
			hasInitial: !!props.initialImage,
			broken: false
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	componentDidMount() {
		this.setDisplayImage();
	}

	componentWillReceiveProps(nextProps) {
		const { imageSource, imageArray } = this.state;
		const nextArray = getImageArray(nextProps);
		if (!imageArray.every((image, index) => nextArray[index] === image))
			this.setState({
				imageSource: nextProps.initialImage,
				imageArray: nextArray,
				imageIndex: -1,
				hasInitial: !!nextProps.initialImage
			}, this.setDisplayImage);
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
			const { imageArray, imageIndex } = this.state;
			const nextIndex = imageIndex + 1;
			const callback = imageIndex < imageArray.length && this.setDisplayImageSrc
			this.setState({
				imageSource: imageArray[nextIndex],
				imageIndex: nextIndex,
				broken: true
			}, callback);
		};

		this.displayImage.onload = () => {
			const { imageArray, imageIndex, hasInitial } = this.state;
			const callback = hasInitial && this.setDisplayImageSrc
			this.setState({
				imageSource: imageArray[imageIndex],
				hasInitial: false,
				broken: false
			}, callback);
		};

		this.setDisplayImageSrc();
	}

	render() {
		const { imageSource, broken, hasInitial } = this.state;
		return imageSource ? <img {...this.props} src={broken ? this.props.initialImage : imageSource} /> : null;
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
