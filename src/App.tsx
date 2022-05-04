import { useState, useEffect } from "react";
import { fabric } from "fabric";
const App = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "red",
      selectable: true,
      hasControls: true,
    });

  let [valHeight, setvalHeight] = useState("");
  let [valWidth, setvalWidth] = useState("");
  let [valX, setvalX] = useState("");
  let [valY, setvalY] = useState("");

  const generateRect = (e: any, canvi: any) => {
    e.preventDefault();
    if (
      parseInt(valHeight) <= 0 ||
      parseInt(valHeight) > 800 ||
      parseInt(valWidth) <= 0 ||
      parseInt(valWidth) > 800
    ) {
      alert("height and width must be bigger than 0 and smaller than 800");
    } else {
      const rect = new fabric.Rect({
        originX: "left",
        originY: "top",
        top: parseInt(valX),
        left: parseInt(valY),
        height: parseInt(valHeight),
        width: parseInt(valWidth),
        fill: "blue",
        selectable: true,
        hasControls: true,
      });
      canvi.add(rect);
      canvi.renderAll();
      console.log(rect);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => generateRect(e, canvas)}>
        <label htmlFor="height">Height: </label>
        <input
          id="height"
          onChange={(event) => setvalHeight(event.target.value)}
        />
        <label htmlFor="width"> Width: </label>
        <input
          id="width"
          onChange={(event) => setvalWidth(event.target.value)}
        />
        <label htmlFor="y"> Y coordinate: </label>
        <input id="y" onChange={(event) => setvalX(event.target.value)} />
        <label htmlFor="x"> X coordinate: </label>
        <input id="x" onChange={(event) => setvalY(event.target.value)} />
        <button type="submit">Generate Rectangle</button>
      </form>
      <canvas id="canvas" />
    </div>
  );
};

export default App;
