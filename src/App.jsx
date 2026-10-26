import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Bookings from './pages/Bookings'
import Home from './pages/Home'
import Trains from './pages/Trains'
import Meals from './pages/Meals'
import Navbar from './components/Navbar'


const App = () => {
  return (
        <BrowserRouter>
            <ScrollToTop/>
            <Navbar/>

            <Routes> 
                <Route path='/' element={<Home/>}/>  
                <Route path='/trains' element={<Trains/>}/>
                <Route path='/meals' element={<Meals/>}/>
                <Route path="/bookings" element={<Bookings />} />
                <Route path='/bookings' element={<Bookings/>}/>  
            </Routes> 

            <Trains/>
            <Meals/>
        </BrowserRouter>
  )
}

export default App