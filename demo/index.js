import React from "react";
import { render } from "react-dom";
import ImageFallback from "../lib";

function Demo() {
  return (
    <div>
      <h1> React Image Fallback</h1>
      <ImageFallback src="./works.jpg" fallbackImage="./fallback.jpg" /> 
      <h3>This image just worked</h3>
      <ImageFallback src="./doesnotwork.jpg" fallbackImage="./fallback.jpg" />
      <h3>This image had src image fail so it used fallback image</h3>
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
