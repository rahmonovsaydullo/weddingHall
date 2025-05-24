import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NoPage from './pages/NotFound/NoPage';
import VenueDetail from './components/VenueDetail/VenueDetail';



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/venues/:id' element={<VenueDetail/>}/>
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
