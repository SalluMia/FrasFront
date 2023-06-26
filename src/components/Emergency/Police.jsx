import React from 'react'
import axios from 'axios';
import emerdata from './emerdata';
import { Link } from 'react-router-dom';
import style from './style.css'
import { useState, useEffect } from 'react';
function Police() {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setData(emerdata);
    }, []);


    useEffect(() => {
        if (data) {
            const filtered = {};
            for (const key in data) {
                if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filtered[key] = data[key];
                } else {
                    const subKeys = Object.keys(data[key]);
                    const subFiltered = {};
                    for (let i = 0; i < subKeys.length; i++) {
                        const subKey = subKeys[i];
                        if (subKey.toLowerCase().includes(searchTerm.toLowerCase())) {
                            subFiltered[subKey] = data[key][subKey];
                        }
                    }
                    if (Object.keys(subFiltered).length > 0) {
                        filtered[key] = subFiltered;
                    }
                }
            }
            setFilteredData(filtered);
        }
    }, [data, searchTerm]);
    return (
        <div>
            <div className="container bg-light p-2 mt-1" id='RescContainer'>
                <div className="row">
                  
                      <div className="col-sm-4"></div>  
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control search-input"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-outline-secondary" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </form>
                        </div>
                      
                    
                    <div className="col-sm-12">
                        {filteredData ? (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3" id='search-data'>
                                {Object.keys(filteredData).map((key, index) => (
                                    <div className="col" key={index}>
                                        <div className="card">
                                            <div className="card-header"><i class="fa-solid fa-building-shield"></i> <b>{key}</b></div>
                                            <div className="card-body">
                                                <ul className="list-unstyled">
                                                    {Object.keys(filteredData[key]).map((subKey, subIndex) => (
                                                        <li className='m-1' key={subIndex}>{subKey}: {filteredData[key][subKey]}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Police
