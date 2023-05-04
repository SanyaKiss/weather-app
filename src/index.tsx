import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss";
import { App } from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
