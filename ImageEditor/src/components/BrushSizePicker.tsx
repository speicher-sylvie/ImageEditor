import React, { useState } from 'react';
import { Popover, Box, Stack } from '@mui/material';
import ToolBox from './ToolBox';
import { useCanvasEditorStore } from '../store';

const BRUSH_SIZES = [1, 3, 5, 7, 11, 15, 19, 25];

interface BrushSizeBoxProps {
  size: number;
  color: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const BrushSizeBox: React.FC<BrushSizeBoxProps> = ({ size, color, isSelected, onClick }) => {
  return (
    <ToolBox isSelected={isSelected} onClick={onClick}>
      <div style={{
        height: `${size*2}px`,
        width: `${size*2}px`,
        backgroundColor: color,
        borderRadius: '50%',
      }}/>
    </ToolBox>
  );
}

interface BrushSizePickerProps {
  color: string;
  compact?: boolean;
}

const BrushSizePicker: React.FC<BrushSizePickerProps> = ({ color, compact }) => {
  const brushSize = useCanvasEditorStore((state) => state.brushSize);
  const setBrushSize = useCanvasEditorStore((state) => state.setBrushSize);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'brush-size-picker' : undefined;

  const griddedBoxes = (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 1,
    }}>
      {BRUSH_SIZES.map((size) => (
        <BrushSizeBox 
          key={size}
          size={size}
          color={color}
          isSelected={size === brushSize}
          onClick={() => {
            setBrushSize(size);
            handleClose();
          }}
        />
      ))}
    </Box>
  );

  if(compact) {
    return (
      <div>
        <BrushSizeBox 
          size={brushSize}
          color={color}
          isSelected
          onClick={handleClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{
            p: 2,
          }}>
            {griddedBoxes}
          </Box>
        </Popover>
      </div>
    );
  }
  else {
    return griddedBoxes;
  }
};

export { BrushSizeBox, BrushSizePicker };
