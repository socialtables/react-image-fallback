import PropTypes from "prop-types"
import React, { Component } from "react";
import filterInvalidDOMProps from "filter-invalid-dom-props";

export default class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageSource: props.initialImage
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	componentDidMount() {
		this.displayImage = new window.Image();
		this.setDisplayImage({ image: this.props.src, fallbacks: this.props.fallbackImage });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src){
			this.setDisplayImage({ image: nextProps.src, fallbacks: nextProps.fallbackImage });
		}
	}

	componentWillUnmount() {
		if (this.displayImage) {
			this.displayImage.onerror = null;
			this.displayImage.onload = null;
			this.displayImage = null;
		}
	}

	setDisplayImage({ image, fallbacks }) {
		const imagesArray = [image].concat(fallbacks).filter(fallback => !!fallback)
		this.displayImage.onerror = () => {
			if (imagesArray.length > 2 && typeof imagesArray[1] === "string") {
				const updatedFallbacks = imagesArray.slice(2);
				this.setDisplayImage({ image: imagesArray[1], fallbacks: updatedFallbacks });
				return;
			}
			this.setState({
				imageSource: imagesArray[1] || null
			}, () => {
				if (this.props.onError) {
					this.props.onError(this.props.src);
				}
			});
		};
		this.displayImage.onload = () => {
			this.setState({
				imageSource: imagesArray[0]
			}, () => {
				if (this.props.onLoad) {
					this.props.onLoad(imagesArray[0]);
				}
			});
		};
		if (typeof imagesArray[0] === "string") {
			this.displayImage.src = imagesArray[0];
		}
		else {
			this.setState({
				imageSource: imagesArray[0]
			}, () => {
				if (this.props.onLoad) {
					this.props.onLoad(imagesArray[0]);
				}
			});
		}
	}

	render() {
		return (
			typeof this.state.imageSource === "string"
			?
			<img {...filterInvalidDOMProps(this.props)} src={this.state.imageSource} />
			:
			this.state.imageSource
		);
	}
}
ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: PropTypes.string,
	fallbackImage: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]).isRequired,
	initialImage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	onLoad: PropTypes.func,
	onError: PropTypes.func
};

ReactImageFallback.defaultProps = {
	initialImage: null
};
