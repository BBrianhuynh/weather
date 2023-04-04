import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import ExtraDetails from './Pages/ExtraDetails'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ExtraDetails" element={<ExtraDetails />}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
