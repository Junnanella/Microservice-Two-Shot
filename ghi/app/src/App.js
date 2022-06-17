import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

// import components
import HatsList from "./HatsList";
import HatForm from "./HatForm";

function App(props) {
  const { hats } = props;

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatsList hats={hats} />} />
          <Route path="/hats/new" element={<HatForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
