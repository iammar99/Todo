import React from 'react'
import { Route , Routes } from 'react-router-dom'

import Home from './Home'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer/Footer'
export default function Dashboard() {
  return (
    <>
    <Header/>
    <Routes>
         <Route path="/" element={<Home />} /> 
    </Routes>
    <Footer/>
    </>
  )
}
