# React Image Fallback

React Image Fallback exists for those times that you're just not sure an image will be there.

### Required Props

#### `src`
A string represent the url to your primary image. 

#### `fallbackImage`
A string representing the image you want to fallback to if your primary image is not there.

### Optional Props

#### `initialImage`
The image to show before your `src` or `fallbackImage` load. 

#### `alt`
Alt text to show if none of your images load. 

#### `className`
optional classname to style your image

### Use

```js
import React From "react";
import ReactImageFallback from "react-image-fallback";
export default class ShowImage extends React.Component {
	render() {
		return (
			<div>
				<ReactImageFallback
					src="my-image.png"
					fallbackImage="my-backup.png"
					initialImage="loader.gif"
					alt="cool image should be here"
					className="my-image" />
			</div>
		);
	}
}
```