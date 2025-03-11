import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Reset default styles and add necessary global styles
const style = document.createElement("style");
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    overflow: hidden;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
