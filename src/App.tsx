import React from "react";
import "./App.css";
import { useAuth, AuthProvider } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const { user, logout } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp logout={logout} /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
