import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Grid, Paper } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles
import BoardingLocation from '../components/BoardingLocation'
import { getTourById } from '../api/admin'
import Title from '../styles/Title'

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
          <Grid item xs={12} md={6} height={200}>
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
            <hr />
            <Paper
              elevation={5}
              style={{
                padding: '20px'
              }}
            >
              <Grid item xs={12} md={3} sx={{ alignSelf: 'flex-start' }}>
                <div>
                  <Grid item>
                    <Title style={{ fontWeight: 'bold' }}>
                      Duration: {tour.duration}
                    </Title>
                  </Grid>
                  <Grid item>
                    <Title style={{ fontWeight: 'bold' }}>
                      Itinerary: {tour.itinerary}
                    </Title>
                  </Grid>
                  <Grid item>
                    <Title style={{ fontWeight: 'bold' }}>
                      Pricing: {tour.pricing}
                    </Title>
                  </Grid>
                </div>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={2}
              direction='column'
              style={{ padding: '15px' }}
            >
              <Paper
                elevation={5}
                style={{
                  padding: '20px'
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
              </Paper>

              <Paper elevation={5} style={{ padding: '20px' }}>
                <Title
                  style={{
                    fontWeight: 'bold',
                    border: '1px solid black',
                    padding: '20px'
                  }}
                >
                  Guide: {tour.guideName} ({tour.guideContact})
                </Title>
                <Title variant='body1'>Capacity: {tour.capacity}</Title>
                <Title variant='body1'>
                  Booking Persons: {tour.bookingPerson}
                </Title>
                <Title variant='body1'>
                  Remaining Availability: {tour.capacity - tour.bookingPerson}
                </Title>
                <Title style={{ fontWeight: 'bold' }}>
                  Return Time: {tour.returnTime}
                </Title>
                <Title style={{ fontWeight: 'bold' }}>
                  Departure Time: {tour.departureTime}
                </Title>
              </Paper>
              <Paper style={{ padding: '20px' }}>
                <Title style={{ fontWeight: 'bold' }}>
                  boarding point:
                  <BoardingLocation
                    boardingPointLocation={{
                      lat: tour.boardingPointLat,
                      lng: tour.boardingPointLng
                    }}
                  />
                </Title>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>Loading tour details...</p>
      )}
    </div>
  )
}

export default SingleTour
