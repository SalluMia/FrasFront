import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './style.css'
import { useState } from 'react';
function Nav() {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = authToken !== null;

    // const handleSignout=()=>{
    //     localStorage.removeItem('authToken');
    //     navigate('/login');
    // }
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    return (
        <div>
            <nav className="nav flex-column">
                <Link className="nav-link active" aria-current="page" to="/home"><i class="fa-solid fa-house"></i> Home</Link>
                <Link className="nav-link" to="/Map"><i class="fa-solid fa-map-location-dot"></i> Map</Link>
                <Link className="nav-link" to="/trackAid"><i class="fa-solid fa-kit-medical"></i> Track Aid</Link>
                <Link className="nav-link" to="/Graphs"><i class="fa-sharp fa-solid fa-chart-simple"></i> Grpahs</Link>
                <Link className="nav-link" to="/Complain"><i class="fa-sharp fa-solid fa-users"></i> Complain</Link>

                {isLoggedIn ? (
                    <>
                        <Link className="nav-link" to="/AddData">
                            <i class="fa-solid fa-right-to-bracket"></i> Add Emergency Information
                        </Link>

                        <Link className="nav-link">
                            <button className='btn btn-success' onClick={logoutHandler}>Logout <i class="fa-solid fa-arrow-up-left-from-circle"></i></button>
                        </Link>
                    </>

                ) : (
                    <>
                        <Link className="nav-link" to="/login">
                            <i class="fa-solid fa-right-to-bracket"></i> Sign in
                        </Link>

                        <Link className="nav-link" to="/register">
                            <i class="fa-solid fa-right-to-bracket"></i> Sign up
                        </Link>
                    </>
                )}

            </nav>
        </div>
    )
}

export default Nav
