import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { OpenStreetMapProvider } from 'react-leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import { icon as leafletIcon } from 'leaflet'

const customIcon = leafletIcon({
  iconUrl: 'path/to/marker-icon.png', // Replace with the path to your custom marker icon image
  iconSize: [40, 40] // Adjust the size of the icon as needed
})

const BoardingLocation = ({ boardingPointLocation }) => {
  const handleDirectionsClick = () => {
    const currentLocation = navigator.geolocation

    if (currentLocation) {
      currentLocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${boardingPointLocation.lat},${boardingPointLocation.lng}`
        window.open(url, '_blank')
      })
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div>
      <MapContainer
        center={[boardingPointLocation.lat, boardingPointLocation.lng]} // Coordinates of the boarding point location
        zoom={20} // Initial map zoom level
        style={{ height: '400px', width: '100%' }} // Adjust the map height and width as needed
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <Marker
          title='mark'
          icon={customIcon}
          position={[boardingPointLocation.lat, boardingPointLocation.lng]}
        />
        {/* <MapClickHandler /> */}
      </MapContainer>
      <button onClick={handleDirectionsClick}>Get Directions</button>
    </div>
  )
}

export default BoardingLocation
