import { useState } from 'react';
import './App.css';
import CanvasEditor from './components/CanvasEditor/CanvasEditor';
import { MoonIcon, SunIcon } from './components/Icons';
import RadialTreeSelector from './components/RadialTreeSelector';
import { Stack, Typography, useMediaQuery } from '@mui/material';

function App() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const people = ["Alice", "Bob", "Charlie", "Diana"];
  const tree = {
    "hello": {
      label: "Hello",
      icon: <SunIcon />,
      children: Object.fromEntries(people.map((person) => (
        [
          person,
          {
            label: person,
            value: person,
            icon: <SunIcon />,
          }
        ]
      ))),
    },
    "goodbye": {
      label: "Goodbye",
      icon: <MoonIcon />,
      children: Object.fromEntries(people.map((person) => (
        [
          person,
          {
            label: person,
            value: person,
            icon: <MoonIcon />,
          }
        ]
      ))),
    },
  };

  const [selectedPath, setSelectedPath] = useState<string[]>(["hello", "Alice"]);

  return (
    <Stack direction="column" spacing={4} sx={{
      width: "100%",
      height: "100%",
      flexGrow: "1",
    }}>
      <h1>Radial Tree Selector</h1>
      <Stack direction="row" sx={{
        justifyContent: "center",
      }}>
        <Stack direction="column" spacing={1}>
          <RadialTreeSelector tree={tree} selectedPath={selectedPath} setSelectedPath={setSelectedPath} />
          <Stack direction="row" spacing={0.5}>
            {selectedPath.map((nodeKey) => (
              <Typography>
                {nodeKey}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <h1>Canvas Editor</h1>
      <CanvasEditor compact={isSmallScreen} />
    </Stack>
  )
};

export default App;
