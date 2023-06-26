import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Floodjson from '../Data/Floodjson';

const Track = () => {
  const [floodData, setFloodData] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    setFloodData(Floodjson);
    const { flood_magnitude } = Floodjson;
    if (flood_magnitude.length > 0) {
      const { longitude, latitude } = flood_magnitude[0];
      setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    }
  }, []);

  const renderMarkers = (map, maps) => {
    const { flood_magnitude } = floodData;
    const circleRadius = 10000; // in meters
    const circleOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    };
    const bounds = new maps.LatLngBounds();
    const markers = [];
  
    if (flood_magnitude.length > 0) {
      flood_magnitude.forEach(({ latitude, longitude,title,amount,unit,location,start_date,end_date }, index) => {
        const marker = new maps.Marker({
          position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          map,
          key: index
        });
  
        const tooltipContent = `
          <div>
             <p style='font-weight:400'><b style='font-weight:bold'>Title:</b> ${title}</p>
             <p style='font-weight:400'><b style='font-weight:bold'>Location:</b> ${location}</p>
             <p style='font-weight:400'><b style='font-weight:bold'>Amount:</b> ${amount}</p>
             <p style='font-weight:400'><b style='font-weight:bold'>Unit:</b> ${unit}</p>
             <p style='font-weight:400'><b style='font-weight:bold'>Start_date:</b> ${start_date}</p>
             <p style='font-weight:400'><b style='font-weight:bold'>End_date:</b> ${end_date}</p>
          </div>
        `;
  
        const tooltip = new maps.InfoWindow({
          content: tooltipContent
        });
  
        marker.addListener('mouseover', () => {
          tooltip.open(map, marker);
        });
  
        marker.addListener('mouseout', () => {
          tooltip.close();
        });
  
        const circle = new maps.Circle({
          ...circleOptions,
          map,
          center: marker.getPosition(),
          radius: circleRadius,
        });
        markers.push(marker, circle);
        bounds.extend(marker.getPosition());
      });
    }
  
    map.fitBounds(bounds);
  };
  

  return (
     <div className="container bg-light px-3 py-3">
         <div style={{ height: '100vh', width: '100%' }}>
      {center && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBa9YLpZs2ugjnUsZ0WeOJSXm5sZ5bC4Lc' }}
          defaultCenter={center}
          defaultZoom={18}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        />
      )}
    </div>
     </div>
  );
};

export default Track;
