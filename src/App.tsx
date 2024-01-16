import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
