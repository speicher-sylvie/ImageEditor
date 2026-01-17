import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import "react-color-palette/css";

import { useCanvasEditorStore } from '../../store';
import type { IColor } from 'react-color-palette';

interface DrawableCanvasProps {
  color: IColor;
  containerRef: React.RefObject<HTMLDivElement | null>;
  initialColor?: string;
}

const DrawableCanvas = forwardRef<HTMLCanvasElement, DrawableCanvasProps>(({ color, containerRef, initialColor="#FFFFFF" }, forwardedRef) => {
  const brushSize = useCanvasEditorStore((state) => state.brushSize);
  const isDrawing = useCanvasEditorStore((state) => state.isDrawing);
  const setIsDrawing = useCanvasEditorStore((state) => state.setIsDrawing);
  const addUndoStack = useCanvasEditorStore((state) => state.addUndoStack);
  const clearRedoStack = useCanvasEditorStore((state) => state.clearRedoStack);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useImperativeHandle(forwardedRef, () => canvasRef.current as HTMLCanvasElement);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const canvasContainer = containerRef.current;
    if (!canvas || !canvasContainer) return;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.alignSelf = "stretch";
    canvas.style.flexGrow = "1";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;


    /*const { clientWidth, clientHeight } = canvasContainer;

    canvas.width = clientWidth;
    canvas.height = clientHeight;*/

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = initialColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, []);
  
  /*useLayoutEffect(() => {
    // Initial resize when the component mounts
    clearCanvas();

    const container = containerRef.current;

    // Use ResizeObserver to detect changes in the container's size
    const resizeObserver = new ResizeObserver(() => {
      clearCanvas();
    });

    if (container) {
      resizeObserver.observe(container);
    }

    // Cleanup function
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, [clearCanvas]);*/

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    addUndoStack(canvas.toDataURL());
    clearRedoStack();

    ctx.strokeStyle = color.hex;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();
    setIsDrawing(false);
  };
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid black',
        cursor: 'crosshair',
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  )
});

export default DrawableCanvas;
