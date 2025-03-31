import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

import "./App.css";
import StudentTable from "./StudentTable";

const App = ({ authToken }) => {

  const { user, signOut } = useAuthenticator();
  
  return (
    <div className="App">
      <h1>{user?.signInDetails?.loginId}'s Dashboard</h1>
      <button onClick={signOut}>Sign out</button>
      <StudentTable  authToken={authToken} />
    </div>
  );
}

export default App;
