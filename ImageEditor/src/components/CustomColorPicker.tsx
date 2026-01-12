import React, { useState } from 'react';
import { Popover, Box, Stack } from '@mui/material';
import { ColorPicker, ColorService, type IColor } from "react-color-palette";
import "react-color-palette/css";
import ToolBox from './ToolBox';

const INITIAL_COLOR_HISTORY = [
  '#000000', // Black
  '#B80000', // Dark Red
  '#DB3E00', // Dark Orange
  '#FCCB00', // Dark Gold
  '#008B02', // Dark Green
  '#006B76', // Teal
  '#00ebcc', // Dark Cyan
  '#1273DE', // Dark Blue
  '#5300EB', // Dark Purple
  '#eb00cc', // Dark Pink
];

interface ColorBoxProps {
  color: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, isSelected, onClick }) => {
  return (
    <ToolBox isSelected={isSelected} onClick={onClick} sx={{
      backgroundColor: color,
    }}>
    </ToolBox>
  );
}

interface CustomColorPickerProps {
  color: IColor;
  setColor: (color: IColor) => void;
  compact?: boolean;
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, setColor, compact }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [colorHistory, setColorHistory] = useState<string[]>(INITIAL_COLOR_HISTORY);

  const addToColorHistory = (newColor: string) => {
    setColorHistory((prevHistory) => {
      // Avoid duplicates and ensure the history doesn't exceed the maximum size
      const updatedHistory = [newColor, ...prevHistory.filter((color) => color !== newColor)];
      return updatedHistory.slice(0, INITIAL_COLOR_HISTORY.length);
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'brush-size-picker' : undefined;

  const griddedBoxes = (
    <Box style={{
      alignSelf: 'center',
      display: 'inline-grid',
      gridTemplateColumns: `repeat(5, 1fr)`,
      gap: 1,
    }}>
      {colorHistory.map((newColor) => {
        return (
          <ColorBox
            key={newColor}
            color={newColor}
            isSelected={color.hex === newColor}
            onClick={() => setColor(ColorService.convert("hex", newColor))}
          />
        );
      })}
    </Box>
  );

  const picker = (
    <Stack direction="column" spacing={1} sx={{
      p: 2,
    }}>
      {griddedBoxes}
      <ColorPicker hideAlpha color={color} onChange={setColor} onChangeComplete={(newColor) => addToColorHistory(newColor.hex)} />
    </Stack>
  );

  if(compact) {
    return (
      <div>
        <ColorBox 
          color={color.hex}
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
          {picker}
        </Popover>
      </div>
    );
  }
  else {
    return picker;
  }
};

export { ColorBox, CustomColorPicker };
