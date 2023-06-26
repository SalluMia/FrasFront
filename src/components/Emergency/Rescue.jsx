import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from './style.css'
import resc from './res';
function Rescue() {


  return (
    <div>
      <div className="container bg-light mt-3" id='RescContainer'>
        <div className="row">
            <div className="col-sm-3">
            <ul id='rescue-links'>
                 <li> <NavLink to='oott' id='res-item'><b><i class="fa-solid fa-parachute-box"></i> Rescue 1122</b></NavLink></li>
                 <li> <NavLink to='eidhi' id='res-item'><b><i class="fa-solid fa-door-open"></i> Edhi</b></NavLink></li>
                 <li> <NavLink  to='chippa' id='res-item'><b><i class="fa-sharp fa-solid fa-spa"></i> Chhipa Welfare</b></NavLink></li>
                 <li> <NavLink to='alkhid' id='res-item'><b><i class="fa-solid fa-trowel-bricks"></i> Alkhidmat-Found</b></NavLink></li>
                 <li> <NavLink to='sayalani'  id='res-item'><b><i class="fa-brands fa-wolf-pack-battalion"></i> Saylani Welfare</b></NavLink></li>
            </ul>
            </div>
            <div className="col-sm-9">
              <Outlet/>
            </div>
        </div>
           
           
           
      </div>
    </div>
  );
}

export default Rescue;

