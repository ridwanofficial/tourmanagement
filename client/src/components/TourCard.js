import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  IconButton,
  CardActions,
  Button
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import { useNavigate } from 'react-router-dom'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  navigateToTourDetails,
  navigateToTourEdit,
  navigateToTourInfo
} from '../util/navigations'

const provider = new OpenStreetMapProvider()

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
  overflow: 'hidden' // Hide overflow
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  //   height: 0,
  paddingTop: '56.25%' // 16:9 aspect ratio
}))

const TourCard = ({ tour, isAdmin }) => {
  console.log('tour:', tour)
  const [dialogOpen, setDialogOpen] = useState(false)

  const navigate = useNavigate()
  const {
    name,
    summary,
    date,
    location,
    // image,
    amount,
    place,
    guideName,
    returnTime,
    departureTime,
    capacity,
    bookingPerson
  } = tour
  const openDialog = () => {
    setDialogOpen(true)
  }
  const closeDialog = () => {
    setDialogOpen(false)
  }

  const remainingAvailability = capacity - bookingPerson
  const [address, setAddress] = useState('')
  console.log('address:', address)
  const image = 'https://picsum.photos/seed/picsum/800/600'
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${tour.boardingPointLat}&lon=${tour.boardingPointLng}`
        )
        if (response.data && response.data.display_name) {
          setAddress(response.data.display_name)
        }
      } catch (error) {
        console.error('Error retrieving address:', error)
      }
    }

    getAddress()
  }, [tour.boardingPointLocation])

  function handleViewDetails () {
    navigateToTourInfo(navigate, tour.tourId)
  }

  return (
    <StyledCard>
      <CardMedia component='img' image={image} alt={name} />
      <StyledCardContent>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          marginBottom={1}
        >
          <Typography variant='h6' gutterBottom>
            {name}
          </Typography>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Box>
        <Box display='flex' alignItems='center' marginTop={1}>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
          <Typography variant='body2'>{date}</Typography>
          <IconButton>
            <LocationOnIcon />
          </IconButton>
          <Typography variant='body2'>{location}</Typography>
        </Box>

        <Box display='flex' alignItems='center' marginTop={2}>
          <Typography variant='body2' color='primary'>
            {amount}
          </Typography>
          <Typography variant='body2' color='textSecondary' marginLeft={1}>
            {place}
          </Typography>
        </Box>
        <Typography variant='body1'>Capacity: {capacity}</Typography>
        <Typography variant='body1'>
          Booking Persons: {bookingPerson}
        </Typography>

        <IconButton onClick={openDialog}>
          <span
            style={{ color: '#1b73a6', fontWeight: '700', fontSize: '16px' }}
          >
            See More...
          </span>
          {/* <ExpandMoreIcon /> */}
        </IconButton>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>Additional Details</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>
              Remaining Availability: {remainingAvailability}
            </Typography>
            <Box display='flex' alignItems='center' marginTop={1}>
              <Typography variant='body2'>Guide: {guideName}</Typography>
            </Box>
            <Box display='flex' alignItems='center' marginTop={1}>
              <Typography variant='body2'>Return Time: {returnTime}</Typography>
            </Box>
            <Box display='flex' alignItems='center' marginTop={1}>
              <Typography variant='body2'>
                Departure Time: {departureTime}
              </Typography>
            </Box>
            <p>
              <span style={{ fontWeight: '700' }}>Boarding Point:</span>
              {address}
            </p>

            <div style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                onClick={() => navigateToTourInfo(navigate, tour.tourId)}
              >
                View Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </StyledCardContent>
      <CardActions>
        <div style={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={handleViewDetails}>
            View Details
          </Button>
          {isAdmin && (
            <Button
              onClick={() => {
                navigateToTourEdit(navigate, tour.tourId)
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </CardActions>
    </StyledCard>
  )
}

export default TourCard
