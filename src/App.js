import './App.css';

import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { user, signOut } = useAuthenticator();
  return (
    <div className="App">
       <h1>{user?.signInDetails?.loginId}'s Dashboard</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default App;
