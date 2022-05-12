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
    zoom(newCanvas);
    zoomDraging(newCanvas);

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

  const zoom = (canvas: any) => {
    canvas.on("mouse:wheel", function (opt: any) {
      let delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  };

  const zoomDraging = (canvas: any) => {
    canvas.on("mouse:down", (opt: any) => {
      let evt = opt.e;
      if (evt.altKey === true) {
        canvas.isDragging = true;
        canvas.selection = false;
        canvas.lastPosX = evt.clientX;
        canvas.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", (opt: any) => {
      if (canvas.isDragging) {
        let e = opt.e;
        let vpt = canvas.viewportTransform;
        vpt[4] += e.clientX - canvas.lastPosX;
        vpt[5] += e.clientY - canvas.lastPosY;
        canvas.requestRenderAll();
        canvas.lastPosX = e.clientX;
        canvas.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", (opt: any) => {
      canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = true;
    });
  };

  const pinPoint = (canvas: any) => {
    coordinates.map((data) => {
      fabric.Image.fromURL(marker, (img: any) => {
        const markerIcon = img.set({
          top: data.alpha2 === "AQ" ? data.latitude + 97 : data.latitude,
          left: data.alpha2 === "AQ" ? data.longitude + 481 : data.longitude,
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
