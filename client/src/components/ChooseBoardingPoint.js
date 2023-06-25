import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { OpenStreetMapProvider } from 'react-leaflet-geosearch'
import 'leaflet/dist/leaflet.css'

const ChooseBoardingPoint = () => {
  const [boardingPoint, setBoardingPoint] = useState(null)
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
        center={[51.505, -0.09]} // Initial map center coordinates
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
