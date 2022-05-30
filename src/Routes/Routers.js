import React from 'react'
import { Route, Routes } from 'react-router'
import { AddCar } from '../Assets/Components/Card/AddCar'


import { CardFilter } from '../Assets/Components/Card/CardFilter'
import { FooterDefault } from '../Assets/Components/Footer/FooterDefault'
import { NavbarDefault } from '../Assets/Components/Navbar/NavbarDefault'
import { SignIn } from '../pages/SignIn'



export const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={ <CardFilter/>} />
        <Route path="/addcar" element={ <AddCar/>} />
        
        <Route path="/login" element={
<>
            <NavbarDefault/>

<SignIn/>
            <FooterDefault/>

</>} />
        
    </Routes>
  )
}
