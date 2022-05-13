import { useState, useEffect } from "react";
import { fabric } from "fabric";
import background from "../assets/background.png";
import marker from "../assets/marker.png";
import { coordinates } from "../assets/data";
import styles from "../components/Canvas.module.scss";
import Modal from "react-modal";

export default function Canvas() {
  const [canvas, setCanvas] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalshortName, setModalShortName] = useState("");
  const [isModalOpened, setisModalOpened] = useState(false);

  const countryInfo = (code: any) => {
    let names = "";
    let shortName = "";

    coordinates.map((data) => {
      if (data.alpha2 === code) {
        names = data.country;
        shortName = data.alpha2;
      }

      return setModalName(names), setModalShortName(shortName);
    });
  };

  useEffect(() => {
    setCanvas(initCanvas("canvas"));
  }, []);

  const initCanvas = (id: any) => {
    const newCanvas = new fabric.Canvas(id, {
      selectable: true,
      hasControls: true,
    });

    newCanvas.setHeight(window.innerHeight);
    newCanvas.setWidth(window.innerWidth);

    setBackground(background, newCanvas);
    zoom(newCanvas);
    zoomDraging(newCanvas);

    return newCanvas;
  };

  const setBackground = (url: any, canvas: any) => {
    fabric.Image.fromURL(url, (img: any) => {
      img.scaleX = 1;
      img.scaleY = 1;
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
          top: data.latitude * 20,
          left: data.longitude * 20,
          height: img.height,
          width: img.width,
          scaleX: 1,
          scaleY: 1,
          id: data.alpha2,
        });

        canvas.add(markerIcon);
        markerIcon.on("mousedown", function (e: any) {
          setisModalOpened(true);
          countryInfo(data.alpha2);
        });
      });
    });
  };

  pinPoint(canvas);

  return (
    <div>
      <Modal
        isOpen={isModalOpened}
        onRequestClose={() => setisModalOpened(false)}
        ariaHideApp={false}
      >
        <div>
          <p>Name of country: {modalName} </p>
          <p>Short name of the country: {modalshortName} </p>
        </div>
        <button onClick={() => setisModalOpened(false)}>Close</button>
      </Modal>
      <div className={styles.fullScreen}>
        <canvas id="canvas" />
      </div>
    </div>
  );
}
