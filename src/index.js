import React, { Component, PropTypes } from "react";
import filterDOMProps from "./lib/filter-dom-props";

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
		const domProps = filterDOMProps(this.props);
		return this.state.imageSource ? <img {...domProps} src={this.state.imageSource} /> : null;
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
