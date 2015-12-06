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

- - -

Copyright (C) 2015 Social Tables, Inc. (https://www.socialtables.com) All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.