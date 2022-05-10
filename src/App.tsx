import { useState, useEffect } from "react";
import { fabric } from "fabric";
import "./App.css";
import marker from "../src/marker.png";
import background from "../src/background1.jpg";

const App = () => {
  const [canvas, setCanvas] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCanvas(initCanvas("canvas"));
  }, []);

  const initCanvas = (id: any) => {
    const newCanvas = new fabric.Canvas(id, {
      selectable: true,
      hasControls: true,
    });

    // newCanvas.setDimensions(
    //   { width: "100%", height: "100%" },
    //   { cssOnly: true }
    // );
    newCanvas.setHeight(1250);
    newCanvas.setWidth(1600);
    newCanvas.renderAll();

    setBackground(background, newCanvas);
    return newCanvas;
  };

  const setBackground = (url: any, canvas: any) => {
    fabric.Image.fromURL(url, (img: any) => {
      img.scaleToWidth(canvas.width);
      img.scaleToHeight(canvas.height);
      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  };

  // let [valHeight, setvalHeight] = useState("");
  // let [valWidth, setvalWidth] = useState("");
  let [valX, setvalX] = useState("");
  let [valY, setvalY] = useState("");

  // const generateRect = (e: any, canvi: any) => {
  //   e.preventDefault();
  //   if (
  //     parseInt(valHeight) <= 0 ||
  //     parseInt(valHeight) > 800 ||
  //     parseInt(valWidth) <= 0 ||
  //     parseInt(valWidth) > 800
  //   ) {
  //     alert("height and width must be bigger than 0 and smaller than 800");
  //   } else {
  //     const rect = new fabric.Rect({
  //       originX: "left",
  //       originY: "top",
  //       top: parseInt(valX),
  //       left: parseInt(valY),
  //       height: parseInt(valHeight),
  //       width: parseInt(valWidth),
  //       fill: "blue",
  //       selectable: true,
  //       hasControls: true,
  //     });
  //     canvi.add(rect);
  //     canvi.renderAll();
  //     console.log(rect);
  //   }
  // };

  const myImg = marker;

  const pinPoint = (e: any, canvas: any) => {
    e.preventDefault();
    fabric.Image.fromURL(myImg, (img: any) => {
      const markerIcon = img.set({
        top: parseInt(valX),
        left: parseInt(valY),
        height: img.height,
        width: img.width,
        // scaleY: -5,
      });
      canvas.add(markerIcon);
    });
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button className="sidebar-btn" onClick={() => handleToggle()}>
        {menuOpen ? "X" : "Menu"}
      </button>
      <form
        className={`menuNav ${menuOpen ? " showMenu" : ""}`}
        id="form"
        onSubmit={(e) => pinPoint(e, canvas)}
      >
        {/* <label htmlFor="height">Height </label>
        <input
          id="height"
          placeholder="Enter the height"
          onChange={(event) => setvalHeight(event.target.value)}
        />
        <label htmlFor="width"> Width </label>
        <input
          id="width"
          placeholder="Enter the width"
          onChange={(event) => setvalWidth(event.target.value)}
        /> */}
        <label htmlFor="y"> Y coordinate </label>
        <input
          id="y"
          placeholder="Enter the Y coordinate"
          onChange={(event) => setvalX(event.target.value)}
        />
        <label htmlFor="x"> X coordinate </label>
        <input
          id="x"
          placeholder="Enter the X coordinate"
          onChange={(event) => setvalY(event.target.value)}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <div className="full-screen">
        <canvas id="canvas" />
      </div>
    </div>
  );
};

export default App;
