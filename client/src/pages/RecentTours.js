import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Container, Box, Grid, Typography, TextField, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import TourCard from '../components/TourCard';
import { mockTours } from '../constant';


const RecentTours = () => {
    

  const [selectedDate, setSelectedDate] = useState(null);




  const handlePrevDay = () => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const prevDay = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
      const formattedPrevDay = prevDay.toISOString().split('T')[0];
      setSelectedDate(formattedPrevDay);
    }
  };

  const handleNextDay = () => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      const formattedNextDay = nextDay.toISOString().split('T')[0];
      setSelectedDate(formattedNextDay);
    }
  };

  const filteredTours = selectedDate ? mockTours.filter(tour => tour.date === selectedDate) : mockTours;

  const handleDateChange = e => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Recent Tours
        </Typography>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <IconButton onClick={handlePrevDay}>
            <ChevronLeft />
          </IconButton>
          <TextField type="date" value={selectedDate || ''} onChange={handleDateChange} />
          <IconButton onClick={handleNextDay}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {filteredTours.map(tour => (
            <Grid item key={tour.id} xs={12} sm={6} md={4}>
             <Box>

             <TourCard
            tour={tour}
            />
            </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RecentTours;
