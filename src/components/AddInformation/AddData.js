import React, { useState } from 'react';
import { Input } from 'antd';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const { Search } = Input;
const AddData = () => {
  const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [zoom, setZoom] = useState(11);

  const handleSearch = (value) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: value }, (results, status) => {
      if (status === 'OK') {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
        setZoom(15);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
  
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

  const [address, setAddress] = useState('');

  const handleMapClick = (event) => {
    const lat = event.lat;
    const lng = event.lng;
    setMarkerPosition({ lat, lng });
    getAddress(lat, lng);
  };

  const getAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);
    geocoder.geocode({ latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        }
      }
    });
  };

  return (
    <div>
      <div className="container bg-light mt-5 p-5">
        <h5>Add Information</h5>
        <div style={{ height: '50vh', width: '100%' }}>
        <Search
            placeholder="Search location"
            onSearch={handleSearch}
            enterButton
            style={{ width: '100%', marginBottom: 10 }}
          />
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
                text="My Marker"
               
              />
            )}
          </GoogleMapReact>
        </div>
        <div className="row mt-5">
           <h5 className='mt-5 bold'>Add Location Details</h5>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="lat">Lat</label>
              <input
                type="text"
                className="form-control"
                id="lat"
                value={markerPosition.lat || ''}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="lng">Lng</label>
              <input
                type="text"
                className="form-control"
                id="lng"
                value={markerPosition.lng || ''}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">Location</label>
              <input
                type="text"
                className="form-control"
                id="address"
                // value={address}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">status</label>
              <input
                type="text"
                className="form-control"
                id="address"
                // value={address}
              />
            </div>
          </div>
        </div>
              

              {/* Emergency Items Included  */}

              <div className="row mt-5">
           <h5 className='mt-5 bold'>Emergency Requirements</h5>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="lat">First Aid</label>
              <input
                type="text"
                className="form-control"
               
               
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="lng"></label>
              <input
                type="text"
                className="form-control"
                id="lng"
                value={markerPosition.lng || ''}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">Location</label>
              <input
                type="text"
                className="form-control"
                id="address"
                // value={address}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="address">status</label>
              <input
                type="text"
                className="form-control"
                id="address"
                // value={address}
              />
            </div>
          </div>
        </div>
      
      {/* End of EMRG  */}

      </div>
    </div>
  );
};

export default AddData;
