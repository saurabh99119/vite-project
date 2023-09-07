import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Videoplayer from './Videoplayer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <React.StrictMode>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/player' element={<Videoplayer/>}/>
    </Routes>
  </React.StrictMode>
</Router>
)
