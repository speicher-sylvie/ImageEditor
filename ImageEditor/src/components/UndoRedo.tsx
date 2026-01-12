import { Button, Stack } from "@mui/material";
import { useCanvasEditorStore } from "../store";
import { useEffect } from "react";

interface UndoRedoProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const UndoRedo: React.FC<UndoRedoProps> = ({ canvasRef }) => {
  const undoStack = useCanvasEditorStore((state) => state.undoStack);
  const addUndoStack = useCanvasEditorStore((state) => state.addUndoStack);
  const redoStack = useCanvasEditorStore((state) => state.redoStack);
  const addRedoStack = useCanvasEditorStore((state) => state.addRedoStack);

  const undo = () => {
    if (undoStack.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = undoStack.pop()!;
    addRedoStack(canvas.toDataURL());

    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextState = redoStack.pop()!;
    addUndoStack(canvas.toDataURL());

    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === 'z') {
          if (e.shiftKey) {
            e.preventDefault();
            redo();
          }
          else {
            e.preventDefault();
            undo();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undoStack, redoStack]);

  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={undo}>
        Undo
      </Button>
      <Button onClick={redo}>
        Redo
      </Button>
    </Stack>
  );
}

export default UndoRedo;