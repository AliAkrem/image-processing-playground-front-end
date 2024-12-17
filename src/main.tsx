import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppLayout from "./layout.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppLayout>
      <App />
    </AppLayout >

  </React.StrictMode>
);
