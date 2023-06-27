import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Grid } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles
import BoardingLocation from '../components/BoardingLocation'
import { getTourById } from '../api/admin'

const SingleTour = () => {
  const { id } = useParams()
  const [tour, setTour] = useState(null)

  useEffect(() => {
    // Mock API call to fetch tour details
    const fetchTourDetails = async () => {
      try {
        getTourById(id).then(data => {
          setTour(data[0])
        })
      } catch (error) {
        console.error('Error fetching tour details:', error)
      }
    }

    fetchTourDetails()
  }, [id])
  const imageUrls = [
    'https://picsum.photos/seed/picsum/800/600',
    'https://picsum.photos/seed/picsum/800/600',
    'https://picsum.photos/seed/picsum/800/600'
  ]

  if (tour === null) return <p>Loading..</p>
  return (
    <div>
      {tour ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <h2>{tour.name}</h2>
            <ImageGallery
              items={imageUrls.map(url => ({
                original: url,
                thumbnail: url,
                thumbnailHeight: '40px'
              }))}
              showFullscreenButton={true}
              showPlayButton={true}
              style={{ objectFit: 'cover', maxHeight: '50vh' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} direction='column'>
              <p
                style={{
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Grid container spacing={2} direction='column'>
                  <h3
                    style={{
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    Additional Info:
                  </h3>
                  <ReactQuill id='tourSummary' value={tour.summary} />
                </Grid>
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  border: '1px solid black',
                  padding: '5px'
                }}
              >
                Guide: {tour.guideName} ({tour.guideContact})
              </p>
              <p variant='body1'>Capacity: {tour.capacity}</p>
              <p variant='body1'>Booking Persons: {tour.bookingPerson}</p>
              <p variant='body1'>
                Remaining Availability: {tour.capacity - tour.bookingPerson}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Return Time: {tour.returnTime}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Departure Time: {tour.departureTime}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                boarding point:
                <BoardingLocation
                  boardingPointLocation={{
                    lat: tour.boardingPointLat,
                    lng: tour.boardingPointLng
                  }}
                />
              </p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sx={{ alignSelf: 'flex-start' }}>
            <div>
              <Grid item>
                <p style={{ fontWeight: 'bold' }}>Duration: {tour.duration}</p>
              </Grid>
              <Grid item>
                <p style={{ fontWeight: 'bold' }}>
                  Itinerary: {tour.itinerary}
                </p>
              </Grid>
              <Grid item>
                <p style={{ fontWeight: 'bold' }}>Pricing: {tour.pricing}</p>
              </Grid>
            </div>
          </Grid>
        </Grid>
      ) : (
        <p>Loading tour details...</p>
      )}
    </div>
  )
}

export default SingleTour
