import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeDashboard from './components/Home/HomeDashboard';
import AuthForm from './components/SignUp/AuthForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/auth" element={<AuthForm />} />

      </Routes>
    </Router>
  );
}

export default App;
