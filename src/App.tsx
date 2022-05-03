import React, { useState } from "react";
import { fabric } from "fabric";
const App = () => {
  const canvas = new fabric.Canvas("canvas", {
    width: 800,
    height: 800,
    backgroundColor: "red",
  });

  let [valHeight, setvalHeight] = useState("");
  let [valWidth, setvalWidth] = useState("");
  let [valX, setvalX] = useState("");
  let [valY, setvalY] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const generateRect = () => {
    const rect = new fabric.Rect({
      originX: "top",
      originY: "left",
      top: parseInt(valX),
      left: parseInt(valY),
      height: parseInt(valHeight),
      width: parseInt(valWidth),
      fill: "blue",
    });
    canvas.add(rect);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={(event) => setvalHeight(event.target.value)} />
        <input onChange={(event) => setvalWidth(event.target.value)} />
        <input onChange={(event) => setvalX(event.target.value)} />
        <input onChange={(event) => setvalY(event.target.value)} />
        <button type="submit" onClick={() => generateRect()}>
          Submit
        </button>
      </form>

      <canvas id="canvas" />
    </div>
  );
};

export default App;
