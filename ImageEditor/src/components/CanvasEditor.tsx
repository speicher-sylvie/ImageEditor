import { Stack } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { useColor } from "react-color-palette";
import "react-color-palette/css";

import { useCanvasEditorStore } from '../store';
import { BrushSizePicker } from './BrushSizePicker';
import { CustomColorPicker } from './CustomColorPicker';
import DrawableCanvas from './DrawableCanvas';
import UndoRedo from './UndoRedo';

interface CanvasEditorProps {
  compact?: boolean;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({ compact }) => {
  const [color, setColor] = useColor("#000000");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack direction="column" spacing={1} sx={{
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <UndoRedo canvasRef={canvasRef} />
      <Stack direction={compact ? "column" : "row"} spacing={1} ref={canvasContainerRef} sx={{
        width: "100%"
      }}>
        {!compact && (<Stack direction="column" spacing={1}>
          <BrushSizePicker color={color.hex} compact={compact} />
        </Stack>)}
        <DrawableCanvas color={color} containerRef={canvasContainerRef} ref={canvasRef} />
        {compact && (<Stack direction="row" spacing={1}>
          <CustomColorPicker color={color} setColor={setColor} compact />
          <BrushSizePicker color={color.hex} compact />
        </Stack>)}
        {!compact && (<Stack direction="column" spacing={1}>
          <CustomColorPicker color={color} setColor={setColor} />
        </Stack>)}
      </Stack>
    </Stack>
  );
};

export default CanvasEditor;