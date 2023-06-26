import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './style.css'
import { useState, useEffect } from 'react';
import emerdata from './emerdata';


function Nav() {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = authToken !== null;

    const [data, setData] = useState(null);

    useEffect(() => {
        setData(emerdata); // Set the JSON data as the component's state
    }, []);

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
                <Link className="nav-link" to="/trackAid"><i class="fa-solid fa-person-drowning"></i> Emergency</Link>
                <Link className="nav-link" to="/tAid"><i class="fa-solid fa-kit-medical"></i> TrackAid</Link>
                <Link className="nav-link" to="/Graphs"><i class="fa-sharp fa-solid fa-chart-simple"></i> Grpahs</Link>
                <Link className="nav-link" to="/Complain"><i class="fa-sharp fa-solid fa-users"></i> Complain</Link>
                <Link className="nav-link" to="/emer"><i class="fa-sharp fa-solid fa-fire-extinguisher"></i> Emergency Contact</Link>

                {isLoggedIn ? (
                    <>
                        <Link className="nav-link" to="/AddData">
                            <i class="fa-solid fa-right-to-bracket"></i> Add Emergency Information
                        </Link>

                        <Link className="nav-link">
                            <button className='btn btn-danger' id='logout' onClick={logoutHandler}>Logout</button>
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
