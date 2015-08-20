"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ReactImageFallback = (function (_React$Component) {
	_inherits(ReactImageFallback, _React$Component);

	function ReactImageFallback(props) {
		_classCallCheck(this, ReactImageFallback);

		_get(Object.getPrototypeOf(ReactImageFallback.prototype), "constructor", this).call(this, props);
		this.state = {
			displayImage: props.initialImage
		};
	}

	_createClass(ReactImageFallback, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this = this;

			var displayImage = new Image();
			displayImage.onerror = function () {
				_this.setState({
					displayImage: _this.props.fallbackImage
				});
			};
			displayImage.onload = function () {
				_this.setState({
					displayImage: _this.props.src
				});
			};
			displayImage.src = this.props.src;
		}
	}, {
		key: "render",
		value: function render() {
			var image = this.state.displayImage ? _react2["default"].createElement("img", { className: this.props.className, src: this.state.displayImage, alt: this.props.alt }) : null;
			return _react2["default"].createElement(
				"span",
				null,
				image
			);
		}
	}]);

	return ReactImageFallback;
})(_react2["default"].Component);

ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: _react2["default"].PropTypes.string.isRequired,
	fallbackImage: _react2["default"].PropTypes.string.isRequired,
	initialImage: _react2["default"].PropTypes.string,
	alt: _react2["default"].PropTypes.string,
	className: _react2["default"].PropTypes.string
};

ReactImageFallback.defaultProps = {
	initialImage: null,
	className: "",
	alt: ""
};

module.exports = ReactImageFallback;
