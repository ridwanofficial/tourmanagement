import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Box, Typography, IconButton,CardActions,Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useNavigate } from "react-router-dom";
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
  overflow: 'hidden', // Hide overflow
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
//   height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
}));

const TourCard = ({ tour }) => {
    const history = useNavigate();
    const { name, summary, date, location, image, amount, place } = tour;
    
    const navigateToTourDetails = tourId => {
       history.push(`/tour-details/${tourId}`);
     };
  return (
    <StyledCard>
      <CardMedia component="img" image={image} alt={name} />
      <StyledCardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={1}>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">{summary}</Typography>
        <Box display="flex" alignItems="center" marginTop={1}>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
          <Typography variant="body2">{date}</Typography>
          <IconButton>
            <LocationOnIcon />
          </IconButton>
          <Typography variant="body2">{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginTop={2}>
          <Typography variant="body2" color="primary">
            {amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" marginLeft={1}>
            {place}
          </Typography>
        </Box>
      </StyledCardContent>
       <CardActions>
                  <Button variant="contained" onClick={() => navigateToTourDetails(tour.id)}>
                    View Details
                  </Button>
                </CardActions>
    </StyledCard>
  );
};

export default TourCard;
