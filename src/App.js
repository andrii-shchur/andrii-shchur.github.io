import React from 'react';
import { Route, Routes } from "react-router-dom";
import './style.css';
import Auth from './components/auth';
import Admin from "./components/admin";
import User from "./components/user";
import Home from "./components/home";
import Logout from "./components/logout";
import Chat from "./components/chat";

function App() {
  return (
      <Routes>
        <Route path='/' element={ <Auth /> } />
        <Route path='/adminpage' element={ <Admin /> } />
        <Route path='/userpage' element={ <User /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/chat' element={ <Chat /> } />
        <Route path='/logout' element={ <Logout /> } />
      </Routes>
  );
}

export default App;
