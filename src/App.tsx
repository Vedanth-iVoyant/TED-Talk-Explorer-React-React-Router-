import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TalksList from "./pages/Talks/TalksList";
import { TalksDetailes } from "./pages/Talks/TalksDetailes";
import Login from "./pages/Login";
import { Favorites } from "./pages/Favorites";
import { RequiredAuth } from "./routes/RequiredAuth";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talks" element={<TalksList />}>
            <Route path=":id" element={<TalksDetailes />} />
          </Route>
          <Route
            path="/favorites"
            element={
              <RequiredAuth>
                <Favorites />
              </RequiredAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
