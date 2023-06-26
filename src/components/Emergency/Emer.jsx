import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emerdata from './emerdata';
import { NavLink,Outlet,Route,Routes } from 'react-router-dom';
import Police from './Police';
import style from './style.css'

function Emer() {


  return (
    <div className='container bg-light p-5' >
     <div className="row">
        <div className="col-sm-12">
            <div className="links">
                <NavLink to="police" id="link-1"><i class="fa-solid fa-building-shield"></i> Police Stations</NavLink>
                <NavLink to="hospitals" id="link-1"><i class="fa-solid fa-hospital"></i> Hospitals</NavLink>
                <NavLink to="rescue" id="link-1"><i class="fa-solid fa-kit-medical"></i> Rescue Teams</NavLink>
            </div>
        </div>
        <div className="col-sm-12">
               <Outlet/>
        </div>
     </div>
    
    </div>
  );
}

export default Emer;
