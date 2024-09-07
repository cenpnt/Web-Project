import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthHeader from './components/AuthHeader';
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UStudent from './pages/uStudent/UStudent';
import Glasgow from './pages/glasgow/Glasgow';
import Queensland from './pages/queensland/Queensland';


function App() {
  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthHeader theme='dark'><Home /></AuthHeader>} />
          <Route path="/login" element={<Login />} />
          <Route path="/u_student" element={<AuthHeader><UStudent /></AuthHeader>} />
          <Route path="/glasgow-doubledegree" element={<AuthHeader theme='glasgow'><Glasgow /></AuthHeader>} />
          <Route path="/queensland-doubledegree" element={<AuthHeader><Queensland /></AuthHeader>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;