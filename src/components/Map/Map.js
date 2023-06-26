import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';
import style from './style.css'
import Red_circle from '../images/Red_circle.gif'
import alert from '../images/alert.gif'
import axios from 'axios';
const AnyReactComponent = ({ text, onMouseEnter,onMouseLeave}) => (
  <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {text}
  </div>
);
function Map() {
  const [locations, setLocations] = useState([]);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/getData')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const defaultProps = {
    center: {
      lat: locations.length > 0 ? locations[0].lat : 33.5651,
      lng: locations.length > 0 ? locations[0].lng : 73.0169,
    },
    zoom: 11
  };
 
  const handleLocationMouseEnter = (location) => {
    setHoveredLocation(location);
  };

  const handleLocationMouseLeave = () => {
    setHoveredLocation(null);
  };
 
  
  return (
    <div>
      <div className="container p-2 bg-light">
        <div style={{ height: '80vh', width: '100%' }}>

        <GoogleMapReact
            bootstrapURLKeys={{ key:"AIzaSyBa9YLpZs2ugjnUsZ0WeOJSXm5sZ5bC4Lc" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {locations.map(location => (
              <AnyReactComponent
                key={location.id}
                lat={location.lat}
                lng={location.lng}
                text={
                  location.status === 'Donor' ?
                    <img src={Red_circle} alt="Red Circle" id='images' /> :
                    <img src={alert} alt="Red Circle" id='images' />
                }
                onMouseEnter={() => handleLocationMouseEnter(location)}
                onMouseLeave={handleLocationMouseLeave}
              />
            ))}
            {hoveredLocation && (
              <AnyReactComponent
                lat={hoveredLocation.lat}
                lng={hoveredLocation.lng}
                text={
                  <div className="marker-tooltip" id='marker-data'>
                    <h4>{hoveredLocation.locationname}</h4>
                    <p><b>Status:</b> {hoveredLocation.status}</p>
                    <p><b>Product: </b>{hoveredLocation.product}</p>
                    <p><b>Quantity:</b> {hoveredLocation.quantity}</p>
                  </div>
                }
              />
            )}
          </GoogleMapReact>
        

          
        </div>
      </div>
    </div>
  )
}

export default Map
