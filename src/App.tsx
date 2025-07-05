import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TalksList from "./pages/Talks/TalksList";
import { TalksDetailes } from "./pages/Talks/TalksDetailes";
import Login from "./pages/Login";
import { Favorites } from "./pages/Favorites";
import { RequiredAuth } from "./routes/RequiredAuth";
import { SpeakersList } from "./pages/Speakers/SpeakersList";
import { SpeakersProfile } from "./pages/Speakers/SpeakersProfile";
import { TopicsView } from "./pages/Topics/TopicsView";
import { SearchResults } from "./pages/SearchResults";
import { RequiredAdmin } from "./routes/RequiredAdmin";
import { AdminPanel } from "./pages/AdminPanel";
import { NotFound } from "./pages/NotFound";
import { ProtectedPage } from "./pages/ProtectedPage";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talks" element={<TalksList />}>
            <Route path=":id" element={<TalksDetailes />} />
          </Route>
          <Route path="/speakers" element={<SpeakersList />}>
            <Route path=":id" element={<SpeakersProfile />} />
          </Route>
          <Route
            path="/favorites"
            element={
              <RequiredAuth>
                <Favorites />
              </RequiredAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequiredAdmin>
                <AdminPanel />
              </RequiredAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="topics/:tagName" element={<TopicsView />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
