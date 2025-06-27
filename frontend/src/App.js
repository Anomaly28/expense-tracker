// src/App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Firebase sign out
      setUser(null);        // Clear user from state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} /> // ✅ pass onLogout to Dashboard
  ) : (
    <Login setUser={setUser} />
  );
}

export default App;
