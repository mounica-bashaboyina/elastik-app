import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

import "./App.css";

function App({ authToken }) {
  console.log("Auth Token:", authToken);
  const { user, signOut } = useAuthenticator();
  
  return (
    <div className="App">
      <h1>{user?.signInDetails?.loginId}'s Dashboard</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default App;
