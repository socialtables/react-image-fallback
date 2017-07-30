import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import test from "tape-catch";
import td from 'testdouble';
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
	}, 1500);
});

test("properly fallback to fallbackImage when src is broken", (assert) => {
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(rendered.state.imageSource === fallbackImage, "state is properly set to fallback image");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 1000);
});

test("properly fallback to fallbackImage when src is falsy", (assert) => {
	const component = <ReactImageFallback fallbackImage={fallbackImage} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(rendered.state.imageSource === fallbackImage, "state is properly set to fallback image");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 1000);
});

test("properly fallback to fallbackImage when fallbackImage contains a falsy value", (assert) => {
	const component = <ReactImageFallback src='http://brokenimage.com' fallbackImage={[undefined, fallbackImage]} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(rendered.state.imageSource === fallbackImage, "state is properly set to fallback image");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 800);
});

test("should not blow up if fallbackImage doesn't contain a truthy value", (assert) => {
	const component = <ReactImageFallback src='http://brokenimage.com' fallbackImage={[undefined, null]} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
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

test("onLoad function is called on successful src load if provided", (assert) => {
	const onLoad = td.function("onLoad");
	const component = <ReactImageFallback src={srcImage} fallbackImage={fallbackImage} onLoad={onLoad} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(td.verify(onLoad(srcImage)) === undefined, "onLoad called with srcImage");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 500);
});

test("onError function is called on failed src load if provided", (assert) => {
	const onError = td.function("onError");
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbackImage} onError={onError} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		assert.ok(td.verify(onError("http://brokenimage.com")) === undefined, "onError called with srcImage");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 1000);
});

test("should allow react element as fallback", (assert) => {
	const fallback = <div className="div-class">~**~</div>
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallback} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "div");
		assert.ok(dom.className === "div-class", "uses div as fallback");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 1000);
});

test("should allow react element as initialImage", (assert) => {
	const initial = <div className="div-class">~**~</div>
	const component = (
		<ReactImageFallback
			src="http://brokenimage.com"
			fallbackImage="http://brokenimage.com"
			initialImage={initial}
		/>
	);
	const rendered = renderComponent(component);
	const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "div");
	assert.ok(dom.className === "div-class", "uses div as fallback");
	ReactDOM.unmountComponentAtNode(node);
	assert.end();
});

test("should allow array of fallbacks", (assert) => {
	const fallbacks = ["http://broken.com", fallbackImage];
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbacks} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "img");
		assert.ok(dom.src === fallbackImage, "rendered image has fallbackImage prop as src");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 3000);
});

test("should allow array of fallbacks and should stop when hitting react element", (assert) => {
	const fallbackElement = <div className="div-class">~**~</div>
	const fallbacks = ["http://broken.com", fallbackElement, fallbackImage];
	const component = <ReactImageFallback src="http://brokenimage.com" fallbackImage={fallbacks} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "div");
		assert.ok(dom.className === "div-class", "uses div as fallback");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 3000);
});

test("should allow array of fallbacks and should stop when hitting react element and src is falsy", (assert) => {
	const fallbackElement = <div className="div-class">~**~</div>
	const fallbacks = [fallbackElement, fallbackImage];
	const component = <ReactImageFallback fallbackImage={fallbacks} />;
	const rendered = renderComponent(component);
	//use setTimeout so async action of state being set can happen
	setTimeout(() => {
		const dom = TestUtils.findRenderedDOMComponentWithTag(rendered, "div");
		assert.ok(dom.className === "div-class", "uses div as fallback");
		ReactDOM.unmountComponentAtNode(node);
		assert.end();
	}, 3000);
});
