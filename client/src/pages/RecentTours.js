import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Container, Box, Grid, Typography, TextField, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import TourCard from '../components/TourCard';


const RecentTours = () => {
    

  const [selectedDate, setSelectedDate] = useState(null);

const mockTours = [
  {
    id: 1,
    name: 'ভ্রমণ পর্যটন - ঢাকা টুর',
    summary: 'ঢাকা শহরের পরিমাণগুলো সীমাবদ্ধ না থাকে। এখানে এমন কোনো বৌদ্ধিক নগরী নেই যেখানে প্রতিবেশীরা নিজস্ব মতে জীবনযাত্রা চলাচল না করে অন্যের মতে চলে।',
    date: '2023-07-01',
    location: 'ঢাকা',
    image: 'https://via.placeholder.com/400x225',
    amount: '১০০০',
    place: 'ঢাকা',
  },
  {
    id: 2,
    name: 'সুন্দরবন জাফলং',
    summary: 'বাংলাদেশের সুন্দরবন অন্যতম বিশেষ স্থান। বিভিন্ন প্রজাতির হরিন ও শাপলা পাখি বা রাঙ্গামাটি মতো রঙিন পাখির জন্য এই জাফলং অনুসন্ধানগুলি খুবই প্রশংসিত হয়ে ওঠে।',
    date: '2023-07-02',
    location: 'সুন্দরবন',
    image: 'https://via.placeholder.com/400x225',
    amount: '১৫০০',
    place: 'সুন্দরবন',
  },
  // Add more tour objects as needed
];


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
