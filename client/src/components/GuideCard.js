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
  navigateToGuidesEdit,
  navigateToTourDetails,
  navigateToTourDetailsEdit
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

const GuideCard = ({ guide }) => {
  const navigate = useNavigate()
  const { name } = guide

  return (
    <StyledCard>
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
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='contained'
            //   onClick={() => navigateToTourDetails(navigate, guide.id)}
          >
            View Details
          </Button>

          <Button
            onClick={() => {
              navigateToGuidesEdit(navigate, guide.id)
            }}
          >
            Edit
          </Button>
        </div>
      </StyledCardContent>
    </StyledCard>
  )
}

export default GuideCard
