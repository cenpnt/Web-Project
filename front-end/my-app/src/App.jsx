import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthHeader from './components/AuthHeader';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UStudent from './pages/uStudent/UStudent';
import Glasgow from './pages/glasgow/Glasgow';
import Queensland from './pages/queensland/Queensland';
import ScrollToTop from './components/ScrollToTop';
import Contact from './pages/contact/Contact';
import SEAcademy from './pages/SEAcademy';
import Coworkingspace from './pages/coworkingspace/Coworkingspace';
import theme from './components/theme';
import EditProfile from './pages/editProfile/EditProfile';
import AcceptInvitation from './pages/acceptInvitation/AcceptInvitation';

function App() {
  return (
    <Router>
      <AuthProvider>
          <ChakraProvider theme={theme}>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<AuthHeader theme='dark'><Home /></AuthHeader>} />
                <Route path="/login" element={<Login />} />
                <Route path="/u_student" element={<AuthHeader theme='dark'><UStudent /></AuthHeader>} />
                <Route path="/glasgow-doubledegree" element={<AuthHeader theme='dark'><Glasgow /></AuthHeader>} />
                <Route path="/queensland-doubledegree" element={<AuthHeader theme='dark'><Queensland /></AuthHeader>} />
                <Route path="/contact" element={<AuthHeader theme='dark'><Contact /></AuthHeader>}/>
                <Route path="/se_academy" element={<AuthHeader theme='dark'><SEAcademy /></AuthHeader>}/>
                <Route path="/coworkingspace" element={<AuthHeader theme='dark'><Coworkingspace /></AuthHeader>} />
                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="accept_invitation" element={<AcceptInvitation />}/>
              </Routes>
            </ScrollToTop>
          </ChakraProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;