import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WatchListProvider from "./WatchListProvider";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./Utils/ErrorComponent"
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  // <React.StrictMode>
  <ErrorBoundary FallbackComponent={ErrorComponent} onError={(error, info) => console.log(error, info)}>
      <BrowserRouter>
        <WatchListProvider>
          <App />
        </WatchListProvider>
      </BrowserRouter>
     </ErrorBoundary> 
  // </React.StrictMode>
);
