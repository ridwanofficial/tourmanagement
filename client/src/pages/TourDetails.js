import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Grid } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles
import BoardingLocation from '../components/BoardingLocation'

const TourDetails = () => {
  const { id } = useParams()
  const [tour, setTour] = useState(null)

  useEffect(() => {
    // Mock API call to fetch tour details
    const fetchTourDetails = async () => {
      try {
        // Simulating API response delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock tour details data based on the ID from the URL param
        const tourId = parseInt(id)
        const mockTour = {
          id: tourId,
          name: `Tour ${tourId}`,
          capacity: 100,
          bookingPerson: 10,
          remainingAvailability: 90,
          boardingPointLocation: {
            lat: 23.723404, // Sample latitude coordinate
            lng: 90.41305
            // Sample longitude coordinate
          },
          duration: '5 days',
          itinerary: 'Day 1: Lorem ipsum dolor sit amet...',
          pricing: '$500 per person',
          additionalInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          guideInfo: {
            name: 'John Doe',
            contact: 'john.doe@example.com'
          },
          returnTime: '6:00 PM',
          departureTime: '9:00 AM',
          imageUrls: [
            'https://picsum.photos/seed/picsum/800/600',
            'https://picsum.photos/seed/picsum/800/600',
            'https://picsum.photos/seed/picsum/800/600'
          ]
        }

        setTour(mockTour)
      } catch (error) {
        console.error('Error fetching tour details:', error)
      }
    }

    fetchTourDetails()
  }, [id])

  return (
    <div>
      {tour ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <h2>{tour.name}</h2>
            <ImageGallery
              items={tour.imageUrls.map(url => ({
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

                  {tour.additionalInfo}
                </Grid>
              </p>
              <p style={{ fontStyle: 'italic' }}>{tour.additionalInfo}</p>
              <p
                style={{
                  fontWeight: 'bold',
                  border: '1px solid black',
                  padding: '5px'
                }}
              >
                Guide: {tour.guideInfo.name} ({tour.guideInfo.contact})
              </p>
              <p variant='body1'>Capacity: {tour.capacity}</p>
              <p variant='body1'>Booking Persons: {tour.bookingPerson}</p>
              <p variant='body1'>
                Remaining Availability: {tour.remainingAvailability}
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
                  boardingPointLocation={tour.boardingPointLocation}
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

export default TourDetails
