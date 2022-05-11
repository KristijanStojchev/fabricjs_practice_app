import { useState, useEffect } from "react";
import { fabric } from "fabric";
import background from "../assets/background.png";
import marker from "../assets/marker.png";
import { coordinates } from "../assets/data";
import styles from "../components/Canvas.module.scss";

export default function Canvas() {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas("canvas"));
  }, []);

  const initCanvas = (id: any) => {
    const newCanvas = new fabric.Canvas(id, {
      selectable: true,
      hasControls: true,
    });

    newCanvas.setHeight(680);
    newCanvas.setWidth(1700);

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

  const myImg = marker;

  const pinPoint = (canvas: any) => {
    coordinates.map((data) => {
      fabric.Image.fromURL(myImg, (img: any) => {
        const markerIcon = img.set({
          top: data.latitude,
          left: data.longitude,
          height: img.height,
          width: img.width,
        });
        canvas.add(markerIcon);
        console.log(markerIcon);
      });
    });
  };

  pinPoint(canvas);

  return (
    <div className={styles.fullScreen}>
      <canvas id="canvas" />
    </div>
  );
}
