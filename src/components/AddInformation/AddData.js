import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import  style from './style.css'
import { useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';


const AnyReactComponent = ({ text }) => (
  <div>
    {text}
  </div>
);
const AddData = () => {

  const [locations, setLocations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [status, setstatus] = useState('');
  const [product, setproduct] = useState('')
  const [quantity, setquantity] = useState('')
  const [editId, setEditId] = useState(null);
  const isDone= false;
  
  const defaultProps = {
    center: {
      lat: 33.5651,
      lng: 73.0169
    },
    zoom: 11
  };

  const [markerPosition, setMarkerPosition] = useState({
    lat: null,
    lng: null
  });

  const handleDoneClick = (index) => {
    // Make API call to update the status of the corresponding item
    // ...

    // Update the status of the corresponding item
    const updatedLocations = [...locations];
    updatedLocations[index].isDone = true;
    setLocations(updatedLocations);
};
  const handleMapClick = (event) => {
    const lat = parseFloat(event.lat);
    const lng = parseFloat(event.lng);
    setMarkerPosition({ lat, lng });
    console.log(lat,lng)
  };

  const handleSub = (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem('authToken');
      axios.post('http://localhost:5000/api/auth/addData',{
        status,
        product,
        quantity,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(()=>{
        const alertContainer = document.getElementById('alert-container');
        const alert = `
          <div class="alert alert-primary alert-dismissible fade show" role="alert">
            Data is Inserted successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertContainer.innerHTML = alert;
      
      })
    } catch(e) {
      console.log(e)
    }
  }
 

  useEffect(() => {

    const fetchdata=async ()=>{
      const token = localStorage.getItem('authToken');
  
      if (token) {
        axios.get('http://localhost:5000/api/auth/getSingleData', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setLocations(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
            console.log('Something wrong')
          });
      }
    }
     
    fetchdata();
  }, []);

  const handleEditClick = (index) => {
    const locationToEdit = locations[index];
    setMarkerPosition({ lat: locationToEdit.lat, lng: locationToEdit.lng });
    setproduct(locationToEdit.product);
    setquantity(locationToEdit.quantity);
    setstatus(locationToEdit.status);
    setIsEdit(true);
    setEditId(locationToEdit._id);
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    const alertContainer = document.getElementById('alert-container');
    const alert = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Data is deleted successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    alertContainer.innerHTML = alert;
    const token = localStorage.getItem('authToken');

    axios
      .patch(
        `http://localhost:5000/api/auth/updateData/${editId}`,
        {
          status,
          product,
          quantity,
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedLocation = response.data.data;
        const updatedLocations = locations.map((location) => {
          if (location._id === updatedLocation._id) {
            return updatedLocation;
          }
          return location;
        });
        setLocations(updatedLocations);
        setIsEdit(false);
        setEditId(null);
        const alertContainer = document.getElementById('alert-container');
        const alert = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            Data is updated successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertContainer.innerHTML = alert;
        
      })
      .catch((error) => {
        console.error(error);
        window.alert('Something went wrong');
      });
  };
  

  const handleDeleteClick = (index) => {
    const token = localStorage.getItem('authToken');
    const locationToDelete = locations[index];
    axios.delete(`http://localhost:5000/api/auth/deleteData/${locationToDelete._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // Remove the corresponding item from the state
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
        const alertContainer = document.getElementById('alert-container');
        const alert = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Data is Deleted successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertContainer.innerHTML = alert;
      })
      .catch(error => {
        console.error(error);
        console.log('Something wrong')
      });
  };

  return (
      <div>
        
        <div className="container bg-light px-2 py-5">
          <h5 className='text-center py-3'><b>Hey there's you can just simply click on the Map and add the location</b></h5>
          <div style={{ height: '50vh', width: '100%' }}>
           
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBa9YLpZs2ugjnUsZ0WeOJSXm5sZ5bC4Lc" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              onClick={handleMapClick}
            >
              {markerPosition.lat && markerPosition.lng && (
                <AnyReactComponent
                  lat={markerPosition.lat}
                  lng={markerPosition.lng}
                  text={<i class="fa-sharp fa-solid fa-location-dot" style={{
                    color: 'white', 
                    fontSize:'30px',
                 
                  }}></i>}

                />
              )}
            </GoogleMapReact>
          </div>
          <div className="row mt-2" id="inputs">
            <h5 className='mt-5 bold text-center'><b>Add Location and Emergency Details</b></h5>
            <hr />
             <div className="col-sm-12">

            {!isEdit ? (  <form action="" className='form' onSubmit={handleSub} id='AddDetails'>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lat"><i class="fa-solid fa-hurricane"></i> Lat</label>
                  <input
                    type="number"
                    className="form-control"
                    id="lat"
                    name='lat'
                    value={markerPosition.lat || ''}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-solid fa-circle-nodes"></i> Lng</label>
                  <input
                    type="number"
                    className="form-control"
                    id="lng"
                    name='lng'
                    value={markerPosition.lng || ''}
                    readOnly
                  />
                </div>
              </div>
            
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-brands fa-product-hunt"></i> Enter Detail of Product</label>
                  <input
                    type="text"
                    className="form-control"
                    name='product'
                    value={product}
                    onChange={(e) => setproduct(e.target.value)}
                    
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-sharp fa-solid fa-bolt"></i> Enter Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name='quantity'
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    
                  />
                </div>
              </div>
            
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="address"><i class="fa-solid fa-shield-heart"></i> status</label>
                  <input
                    type="text"
                    className="form-control"
                    name='status'
                    value={status}
                    onChange={(e) => { setstatus(e.target.value) }}
                  />

                    <input type="submit" className='btn btn-success w-100 mt-3' value='ADD DETAILS' />
                </div>
              </div>
              <br />
            
              {/* <button className='btn btn-success' type='submit'>Send</button> */}
            </form>
           
           ) : (


            <form action="" className='form' id='UpdateForm'>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lat"><i class="fa-solid fa-hurricane"></i> Lat</label>
                  <input
                    type="number"
                    className="form-control"
                    id="lat"
                    name='lat'
                    value={markerPosition.lat || ''}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-solid fa-circle-nodes"></i> Lng</label>
                  <input
                    type="number"
                    className="form-control"
                    id="lng"
                    name='lng'
                    value={markerPosition.lng || ''}
                    readOnly
                  />
                </div>
              </div>
            
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-brands fa-product-hunt"></i> Enter Detail of Product</label>
                  <input
                    type="text"
                    className="form-control"
                    name='product'
                    value={product}
                    onChange={(e) => setproduct(e.target.value)}
                    
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="lng"><i class="fa-sharp fa-solid fa-bolt"></i> Enter Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name='quantity'
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    
                  />
                </div>
              </div>
            
              <div className="col-md-12">
                <div className="form-group m-3">
                  <label htmlFor="address"><i class="fa-solid fa-shield-heart"></i> status</label>
                  <input
                    type="text"
                    className="form-control"
                    name='status'
                    value={status}
                    onChange={(e) => { setstatus(e.target.value) }}
                  />

                    {/* <input type="submit" className='btn btn-primary w-100 mt-3' style={{fontWeight:'bold'}} value='UPDATE DATA'
                    
                   /> */}
                    <button className='btn btn-primary mt-2 w-100'  onClick={(e) => handleUpdate(e, editId._id)} 
                   >
                         UPDATE DATA
                    </button>
                </div>
                
              </div>
              <br />
            
              {/* <button className='btn btn-success' type='submit'>Send</button> */}
            </form>
            )}
            <div id="alert-container"></div>
             </div>

           
          </div>

          <div className="slider">
          <table className='table table-striped table-hover table-bordered'>
                    <thead className='table-head'>
                        <tr>
                            {/* <th>Location Name</th> */}
                            <th><i class="fa-brands fa-product-hunt"></i> Product</th>
                            {/* <th><i class="fa-solid fa-shield-heart"></i> Donors &amp; Recipients</th> */}
                            <th><i class="fa-sharp fa-solid fa-bolt"></i> Quantity</th>
                            <th>Status</th>
                            <th>#----------------------------------------#</th>
                        </tr>
                    </thead>
                    <tbody id='tbd'>
                    {locations && locations.map((item, index) => (
                      <tr key={index} className={item.isDone ? 'strike' : ''}> 
                        <td>{item.product}</td>
                        {/* <td>{item.status}</td> */}
                        <td>{item.quantity}</td>
                        <td>
                            {item.status}
                        
                    
                        </td>
                        <td >
                             <button style={{marginLeft:'60px'}} className='btn btn-danger' id='Del' onClick={() => handleDeleteClick(index)}>Delete <i class="fa-solid fa-trash"></i></button>
                             <button className='btn btn-success mx-3' id='Edit' onClick={() => handleEditClick(index)}>Edit <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                        </td>
                      </tr>
                    ))}




                    </tbody>
                </table>
          </div>

        </div>



      </div>
    );
  };

  export default AddData;
