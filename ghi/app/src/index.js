import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// function to pull data from hats api
async function loadHats() {
  const response = await fetch("http://localhost:8090/api/hats/");
  const responseJson = await response.json();
  // return just the list of hats from the response
  return responseJson.hats;
}

const main = async () => {
  // Wait for hats
  const hats = await loadHats();

  // Render hats in an App
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App hats={hats} />
    </React.StrictMode>
  );
};

main().catch((err) => {
  console.error(err);
});
