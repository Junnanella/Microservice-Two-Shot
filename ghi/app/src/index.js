import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// function to pull data from hats api
async function loadHats() {
  const response = await fetch("http://localhost:8090/api/hats/");
  const responseJson = await response.json();
  // return just the list of hats from the response
  return responseJson.hats;
}

async function loadShoes() {
  const response = await fetch("http://localhost:8080/api/shoes");
  const data = await response.json();
  return data.shoes;
}

const main = async () => {
  // Wait for hats
  const hats = await loadHats();
  const shoes = await loadShoes();

  // Render hats in an App
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App hats={hats} shoes={shoes} />
    </React.StrictMode>
  );
};

main().catch((err) => {
  console.error(err);
});
