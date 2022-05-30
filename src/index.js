import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routers } from './Routes/Routers';
import { NavbarDefault } from './Assets/Components/Navbar/NavbarDefault';
import { SignIn } from './pages/SignIn';
import { FooterDefault } from './Assets/Components/Footer/FooterDefault';
import { CardFilter } from './Assets/Components/Card/CardFilter';
import { AddCar } from './Assets/Components/Card/AddCar';
import { Layout } from './pages/Layout';




ReactDOM.render(
  <React.StrictMode>
    <NavbarDefault/>
    {/* <CardFilter/> */}
    {/* <AddCar/> */}
    <Layout/>
    <FooterDefault/>
  </React.StrictMode>,
  document.getElementById('root')
);  