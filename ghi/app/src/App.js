import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

// import components
import HatsList from "./HatsList";
import HatForm from "./HatForm";
import ShoeForm from "./ShoeForm";
import ShoeList from "./ShoeList";

function App(props) {
  const { hats } = props;
  if (props.shoes === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatsList hats={hats} />} />
          <Route path="/hats/new" element={<HatForm />} />
          <Route path="shoes">
            <Route path="" element={<ShoeList shoes={props.shoes} />} />
            <Route path="new" element={<ShoeForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
