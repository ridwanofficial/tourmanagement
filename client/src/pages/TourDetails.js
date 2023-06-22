import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Grid } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles

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
            'https://via.placeholder.com/200x400',
            'https://via.placeholder.com/200x400',
            'https://via.placeholder.com/800x600'
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
                originalHeight: 300
              }))}
              showFullscreenButton={true}
              showPlayButton={false}
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
              <p style={{ fontWeight: 'bold' }}>
                Return Time: {tour.returnTime}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Departure Time: {tour.departureTime}
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
