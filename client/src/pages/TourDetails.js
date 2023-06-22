import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Mock API call to fetch tour details
    const fetchTourDetails = async () => {
      try {
        // Simulating API response delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock tour details data based on the ID from the URL param
        const tourId = parseInt(id);
        const mockTour = {
          id: tourId,
          name: `Tour ${tourId}`,
          duration: '5 days',
          itinerary: 'Day 1: Lorem ipsum dolor sit amet...',
          pricing: '$500 per person',
          additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          // Add more mock tour details
        };

        setTour(mockTour);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    };

    fetchTourDetails();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        {tour ? (
          <div>
            <Typography variant="h4" gutterBottom>
              {tour.name}
            </Typography>
            <Typography variant="body2">Duration: {tour.duration}</Typography>
            <Typography variant="body2">Itinerary: {tour.itinerary}</Typography>
            <Typography variant="body2">Pricing: {tour.pricing}</Typography>
            <Typography variant="body2">Additional Info: {tour.additionalInfo}</Typography>
            {/* Add more tour details */}
          </div>
        ) : (
          <Typography variant="body2">Loading tour details...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default TourDetails;
