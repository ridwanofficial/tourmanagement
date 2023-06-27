import React, { useEffect, useState } from 'react'
import { Container, Box, Grid } from '@mui/material'

import TourDetailsCard from '../TourDetailsCard'
import { getAllTourDetails } from '../../api/admin'

const TourDetailsList = ({ tours, onDelete }) => {
  const [tourDetailsData, setTourDetailsData] = useState([])

  useEffect(() => {
    getAllTourDetails()
      .then(data => {
        setTourDetailsData(data)
      })
      .catch(err => {
        console.log('err:', err)
      })

    return () => {}
  }, [])

  return (
    <div className='layout'>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {tourDetailsData.length > 0 &&
            tourDetailsData.map(tour => (
              <Grid item key={tour.id} xs={12} sm={6} md={4}>
                <Box>
                  <TourDetailsCard tour={tour} />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default TourDetailsList
