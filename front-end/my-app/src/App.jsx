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
import CancelReservation from './pages/cancelReservation/CancelReservation';
import Admission from './pages/admission/Admission';
import Curriculum from './pages/curriculum/Curriculum';
import About from './pages/about/About';

function App() {
  return (
    <Router>
      <AuthProvider>
          <ChakraProvider theme={theme}>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/u_student" element={<AuthHeader theme='dark'><UStudent /></AuthHeader>} />
                <Route path="/glasgow-doubledegree" element={<AuthHeader theme='dark'><Glasgow /></AuthHeader>} />
                <Route path="/queensland-doubledegree" element={<AuthHeader theme='dark'><Queensland /></AuthHeader>} />
                <Route path="/contact" element={<AuthHeader theme='dark'><Contact /></AuthHeader>}/>
                <Route path="/se_academy" element={<AuthHeader theme='dark'><SEAcademy /></AuthHeader>}/>
                <Route path="/coworkingspace" element={<AuthHeader theme='dark'><Coworkingspace /></AuthHeader>} />
                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="/accept_invitation" element={<AcceptInvitation />}/>
                <Route path="/cancel_reservation" element={<CancelReservation />}/>
                <Route path="/admission" element={<AuthHeader theme='dark'><Admission /></AuthHeader>}/>
                <Route path="/curriculum" element={<AuthHeader theme='dark'><Curriculum /></AuthHeader>}/>
                <Route path="/about" element={<AuthHeader theme='dark'><About /></AuthHeader>} />
              </Routes>
            </ScrollToTop>
          </ChakraProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;