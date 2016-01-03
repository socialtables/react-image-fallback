import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import test from "tape-catch";
import ReactImageFallback from "../lib";

const initialImage = "http://i.imgur.com/4pjZbyA.png";
const srcImage = "http://i.imgur.com/52gMRxK.png";
const fallbackImage = "http://i.imgur.com/gh4u70G.png";

const node = document.createElement("div");
const renderComponent = (component) => ReactDOM.render(component, node);

test("is a React Component", (assert) => {
	const component = <ReactImageFallback src={srcImage} fallbackImage={fallbackImage} />;
	assert.ok(TestUtils.isElement(component), "ReactImageFallback is a react component");
	assert.end();
});

test("properly set state to src image", (assert) => {
	const component = <ReactImageFallback src={srcImage} fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(rendered.state.imageSource === srcImage, "state is properly set to src image");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 500);
});

test("properly fallback to fallbackImage when src is broken", (assert) => {
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(rendered.state.imageSource === fallbackImage, "state is properly set to fallback image");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 800);
});


test("src is correctly rendered in dom when src prop is a valid image", (assert) => {
	const component = <ReactImageFallback src={srcImage} fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "img");
		assert.ok(dom.src === srcImage, "rendered image has src prop as src");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 500);
});

test("properly set fallbackImage as src in dom when src prop is not valid", (assert) => {
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "img");
		assert.ok(dom.src === fallbackImage, "rendered image has fallbackImage prop as src");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 800);
});

test("initialImage prop is properly set as the initial state", (assert) => {
	const component = <ReactImageFallback src={srcImage} fallbackImage={fallbackImage} initialImage={initialImage} />;
	const rendered = renderComponent(component);
	assert.ok(rendered.state.imageSource === initialImage, "initialImage is properly set as initial state srcImage");
	ReactDOM.unmountComponentAtNode(node);
	assert.end();
});
