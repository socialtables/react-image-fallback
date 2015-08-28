# React Image Fallback

React Image Fallback exists for those times that you're just not sure an image will be there.

### Install
` npm install react-image-fallback`

### Required Props

#### `src`
A string represent the url to your primary image. 

#### `fallbackImage`
A string representing the image you want to fallback to if your primary image is not there.

### Optional Props

#### `initialImage`
The image to show before your `src` or `fallbackImage` load. 

### `shouldUpdateImage`
By default this will return false, a user can pass a function telling the componet to update state that controls the `src` of image

#### `spread props`
This component also utilizes jsx spread attributes to pass along custom image attributes such as alt tags and className

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