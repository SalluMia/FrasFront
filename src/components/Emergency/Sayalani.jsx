import React, { useState, useEffect } from 'react';
import resc from './res.js';

export default function Sayalani() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      setData(resc["Saylani Welfare"]);
    }, []);
  
    const filteredData = data.filter((item) => {
      return (
        item.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  return (
    <div>
        <div className="container-fluid bg-light mt-1">
       
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
               <button className="btn btn-outline-secondary" type="submit">
                 <i className="fa-solid fa-magnifying-glass"></i>
               </button>
             </div>
           </form>
         </div>
         <div className="scrl" >
         <h6><b>"Edhi Welfare Centers"</b></h6>
         <table className="table table-striped table-bordered" >
           <thead>
             <tr>
             <th><b><i class="fa-solid fa-city"></i> City</b></th>
                <th><b><i class="fa-solid fa-location-crosshairs"></i> Address</b></th>
                <th><b><i class="fa-solid fa-phone"></i> Phone</b></th>
             </tr>
           </thead>
           <tbody>
             {filteredData.map((item, index) => (
               <tr key={index}>
                 <td>{item.City}</td>
                 <td>{item.Address}</td>
                 <td>{item.Phone}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
       </div>
       
     </div>
    </div>
  )
}


