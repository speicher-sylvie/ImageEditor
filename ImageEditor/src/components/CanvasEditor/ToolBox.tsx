
import React from 'react';
import { Stack } from '@mui/material';

interface ToolBoxProps {
  children?: React.ReactNode;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: object;
}

const ToolBox: React.FC<ToolBoxProps> = ({ children, isSelected, onClick, sx = {} }) => {
  return (
    <Stack onClick={onClick} sx={{
      width: "3em",
      height: "3em",
      p: 0.5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      borderColor: isSelected ? "primary.main" : "black",
      borderWidth: 3,
      borderStyle: "solid",
      borderRadius: 1,
      cursor: "pointer",
      ...sx,
    }}>
      {children}
    </Stack>
  );
}

export default ToolBox;
