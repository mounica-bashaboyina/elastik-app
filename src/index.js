import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import awsconfig from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import {  AuthProvider } from "./AuthContext";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Authenticator>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Authenticator>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
