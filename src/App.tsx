import { Container } from "@mui/material";
import { Home } from "./pages/Home";

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  minWidth: "600px",
  margin: "0 auto",
  background: "none",
};

function App() {
  return (
    <>
      <Container style={layoutStyle}>
        <Home />
      </Container>
    </>
  );
}

export default App;
