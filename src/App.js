import "./App.css";
import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Segment from "./components/Segment";

function App() {
  return (
    <div>
      <Header title="View Audience" />
      <Box sx={{ m: "40px" }}>
        <Drawer>
          <Segment />
        </Drawer>
      </Box>
    </div>
  );
}

export default App;
