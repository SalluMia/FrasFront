import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './style.css';

function TAid() {
    const [locations, setLocations] = useState([]);
    const status = ["Pending..", "Completed"];


   

    const orderstat = (_id, e) => {
        const status = e.target.value;
        console.log(_id, status);
        axios.post(`http://localhost:5000/api/auth/updateStatus/${_id}`, { status })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/getData')
            .then(response => {
                const transformedData = response.data.map(item => ({
                    _id: item._id, // Add _id to the transformed data
                    locationname: item.locationname,
                    product: item.product,
                    status: item.status,
                    quantity: item.quantity,
                    isDone: false,
                }));
                setLocations(transformedData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="container bg-light p-5">
                <h3><b>Track Aid Details</b></h3>
                <div className="scroller">
                    <table className='table table-striped table-hover table-bordered' id='tb'>
                        <thead className='table-head'>
                            <tr>
                                <th><i class="fa-brands fa-product-hunt"></i> Product</th>
                                {/* <th><i class="fa-solid fa-shield-heart"></i> Donors &amp; Recipients</th> */}
                                <th><i class="fa-sharp fa-solid fa-bolt"></i> Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id='tbd'>
                            {locations.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product}</td>
                                    {/* <td>{item.status}</td> */}
                                    <td>{item.quantity}</td>
                                    <td>
                                        

                                        { <select className={'form-control'} onChange={(e) => orderstat(item._id, e)} id='selections'  >
                                            {status.map((status, index) => {
                                                const isCompleted = item.status === "Completed";
                                                return (
                                                    <option key={index} selected={item.status === status} disabled={isCompleted && status === "Completed"} value={status}>{status}</option>
                                                )
                                            })}
                                        </select> 
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TAid;
