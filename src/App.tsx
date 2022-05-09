import { useState, useEffect } from "react";
import { fabric } from "fabric";
import "./App.css";

const App = () => {
  const [canvas, setCanvas] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCanvas(initCanvas("canvas"));
  }, []);

  const initCanvas = (id: any) =>
    new fabric.Canvas(id, {
      // backgroundColor: "red",
      // width: fabric.util.parseUnit("100in"),
      // height: fabric.util.parseUnit("100in"),
      selectable: true,
      hasControls: true,
    });

  const setBackground = (url: any, canvas: any) => {
    fabric.Image.fromURL(url, (img: any) => {
      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  };

  setBackground(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/A_large_blank_world_map_with_oceans_marked_in_blue.svg/1200px-A_large_blank_world_map_with_oceans_marked_in_blue.svg.png?20190530212301",
    canvas
  );

  let [valHeight, setvalHeight] = useState("");
  let [valWidth, setvalWidth] = useState("");
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

  const myImg =
    "https://cdn-icons.flaticon.com/png/512/2776/premium/2776067.png?token=exp=1652083972~hmac=2ecef23ad8668e83abefe142c16cd866";

  const pinPoint = (e: any, canvas: any) => {
    e.preventDefault();
    fabric.Image.fromURL(myImg, (img: any) => {
      const _me = img.set({
        top: parseInt(valX),
        left: parseInt(valY),
        height: parseInt(valHeight),
        width: parseInt(valWidth),
      });
      canvas.add(_me);
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
        <label htmlFor="height">Height </label>
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
        />
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
          Generate Rectangle
        </button>
      </form>
      <div className="full-screen">
        <canvas id="canvas" />
      </div>
    </div>
  );
};

export default App;
