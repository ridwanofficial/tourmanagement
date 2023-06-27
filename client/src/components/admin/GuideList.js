import React, { useEffect, useState } from 'react'
import { Container, Box, Grid, Button } from '@mui/material'

import TourDetailsCard from '../TourDetailsCard'
import { getAllGuides, getAllTourDetails } from '../../api/admin'
import { navigateToCreateTourDetails } from '../../util/navigations'
import { useNavigate } from 'react-router-dom'
import GuideCard from '../GuideCard'

const GuideList = ({ tours, onDelete }) => {
  const navigate = useNavigate()

  const [guideData, setGuideData] = useState([])

  useEffect(() => {
    getAllGuides()
      .then(data => {
        setGuideData(data)
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
          {guideData.length > 0 &&
            guideData.map(guide => (
              <Grid item key={guide.guideId} xs={12} sm={6} md={4}>
                <Box>
                  <GuideCard guide={guide} />
                </Box>
              </Grid>
            ))}
        </Grid>
        {/* <Button onClick={() => navigateToCreateTourDetails(navigate)}>
          Create a new tour details
        </Button> */}
      </Container>
    </div>
  )
}

export default GuideList
