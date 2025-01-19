import React from "react";
import "./App.css";
//import "./DrawingApp.js";

function App() {
  return (
    <div class="tablet-container">
      <div class="toolbar">
        <button id="clear">🧼 Clear</button>
        <button id="save">💾 Save</button>
        <button id="share">🌼 Send to the Garden</button>
        <div class="color-picker">
          <input type="color" id="colorPicker" value="#000000" />
        </div>
        <div class="stroke-size">
          <label for="strokeSize">Stroke Size:</label>
          <input type="range" id="strokeSize" min="1" max="20" value="5" />
        </div>
      </div>
      <div class="canvas-wrapper">
        <canvas id="drawingCanvas"></canvas>
      </div>
    </div>
  );
}

export default App;
