import './App.css';
import CanvasEditor from './components/CanvasEditor';
import { Stack, useMediaQuery } from '@mui/material';

function App() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Stack direction="column" spacing={4} sx={{
      width: "100%",
      height: "100%",
      flexGrow: "1",
    }}>
      <h1>Canvas Editor</h1>
      <CanvasEditor compact={isSmallScreen} />
    </Stack>
  )
};

export default App;
