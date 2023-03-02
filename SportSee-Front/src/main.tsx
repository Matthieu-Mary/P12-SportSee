import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter , Routes, Route, Navigate} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/user/:id" element={<App />} />
        <Route path="*" element={ <Navigate to='/user/12' replace /> } />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
