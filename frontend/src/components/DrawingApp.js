import React, { useRef, useEffect, useState } from "react";
import "./DrawingApp.css"; // External CSS file for styling

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeSize, setStrokeSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const wrapper = wrapperRef.current;
      canvas.width = wrapper.clientWidth * 0.95;
      canvas.height = wrapper.clientHeight * 0.9;

      ctx.putImageData(imageData, 0, 0);
      
      ctx.lineWidth = strokeSize;
      ctx.lineCap = "round";
      ctx.strokeStyle = strokeColor;
    };

    resizeCanvas();

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [strokeColor, strokeSize]);

  const startDrawing = (e) => {
    const coords = getCoords(e);
    setIsDrawing(true);
    setLastPosition(coords);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const coords = getCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPosition(coords);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "my_drawing.png";
    link.click();
  };

  const shareDrawing = () => {
    const userResponse = window.confirm(
      "Do you want to send your drawing to the garden?"
    );
    if (userResponse) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      fetch("https://example.com/garden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: dataURL }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Your drawing is now in the garden!");
          } else {
            alert(
              "Failed to send the drawing to the garden. Please try again."
            );
          }
        })
        .catch(() => {
          alert("An error occurred while sending the drawing to the garden.");
        });
    } else {
      alert("Your drawing stays on this page.");
    }
  };

  return (
    <div className="tablet-container">
      <div className="toolbar">
        <button onClick={clearCanvas}>🧼 Clear</button>
        <button onClick={saveDrawing}>💾 Save</button>
        <button onClick={shareDrawing}>🌼 Send to the Garden</button>
        <div className="color-picker">
          <label htmlFor="colorPicker">Color:</label>
          <input
            type="color"
            id="colorPicker"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
        <div className="stroke-size">
          <label htmlFor="strokeSize">Stroke Size:</label>
          <input
            type="range"
            id="strokeSize"
            min="1"
            max="20"
            value={strokeSize}
            onChange={(e) => setStrokeSize(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="canvas-wrapper" ref={wrapperRef}>
        <canvas
          id="drawingCanvas"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        ></canvas>
      </div>
    </div>
  );
};

export default DrawingApp;
