import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import awsconfig from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";
import { AuthProvider } from "./AuthContext";
import LayoutPage from "./pages/LayoutPage";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Authenticator>
    <AuthProvider>
      <LayoutPage />
    </AuthProvider>
  </Authenticator>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
