import React from 'react';
import { auth, provider } from '../firebase';
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      // ✅ Set persistent session BEFORE login
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Welcome to Receipt Tracker</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
