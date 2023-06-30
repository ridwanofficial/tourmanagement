import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { OpenStreetMapProvider } from 'react-leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import { DHAKA_ZERO_POINT } from '../constant'
const intialLatLng = {
  LatLng: { lat: 1, lng: 3 }
}
const ChooseBoardingPoint = ({ boardingPoint, setBoardingPoint }) => {
  console.log(
    'boardingPoint:',
    boardingPoint?.LatLng,
    boardingPoint.lat,
    [boardingPoint.lat, boardingPoint.lng],
    [DHAKA_ZERO_POINT.lat, DHAKA_ZERO_POINT.lng]
  )

  function MapClickHandler () {
    useMapEvents({
      click: e => {
        setBoardingPoint(e.latlng)
      }
    })
    return null
  }

  return (
    <div>
      <h2>Select Boarding Point</h2>
      <MapContainer
        center={[boardingPoint.lat, boardingPoint.lng]} // Initial map center coordinates
        zoom={13} // Initial map zoom level
        style={{ height: '400px', width: '100%' }} // Adjust the map height and width as needed
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {boardingPoint && <Marker position={boardingPoint} />}
        <MapClickHandler />
      </MapContainer>
    </div>
  )
}

export default ChooseBoardingPoint

// center={
//           boardingPoint !== null
//             ? [boardingPoint.lat, boardingPoint.lng]
//             : [DHAKA_ZERO_POINT.lat, DHAKA_ZERO_POINT.lng]
//         } // Initial map center coordinates
