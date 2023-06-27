import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import TourCard from '../components/TourCard'
import { getAllTours } from '../api/admin'
import { formatDate } from '../util/helperFunctions'

const RecentTours = ({ isAdmin }) => {
  const [searchValue, setSearchValue] = useState(null)
  const [sortValue, setSortValue] = useState('')
  const [tourData, setTourData] = useState([])

  useEffect(() => {
    getAllTours()
      .then(data => {
        setTourData(data)
      })
      .catch(err => {
        console.log('err:', err)
      })

    return () => {}
  }, [])

  const searchOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
    // Add more options as needed
  ]
  const handleSearchChange = (event, value) => {
    setSearchValue(value)
  }

  const [selectedDate, setSelectedDate] = useState(formatDate(Date.now()))

  const handlePrevDay = () => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate)
      const prevDay = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
      const formattedPrevDay = prevDay.toISOString().split('T')[0]
      setSelectedDate(formatDate(formattedPrevDay))
    }
  }

  const handleNextDay = () => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate)
      const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      const formattedNextDay = nextDay.toISOString().split('T')[0]
      setSelectedDate(formatDate(formattedNextDay))
    }
  }

  // const filteredTours = selectedDate
  //   ? tourData.filter(tour => tour.date === selectedDate)
  //   : tourData

  const handleDateChange = e => {
    const selectedDate = e.target.value
    setSelectedDate(formatDate(selectedDate))
  }
  const handleSort = tours => {
    if (sortValue === 'asc') {
      return tours.sort((a, b) => a.price - b.price)
    } else if (sortValue === 'desc') {
      return tours.sort((a, b) => b.price - a.price)
    }
    return tours
  }

  return (
    <div className='layout'>
      <Container maxWidth='lg'>
        <Box p={3}>
          <Typography variant='h4' gutterBottom>
            Recent Tours
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box display='flex' alignItems='center' marginBottom={2}>
              <IconButton onClick={handlePrevDay}>
                <ChevronLeft />
              </IconButton>
              <TextField
                type='date'
                value={selectedDate || ''}
                onChange={handleDateChange}
              />
              <IconButton onClick={handleNextDay}>
                <ChevronRight />
              </IconButton>
            </Box>
            <div style={{ width: '200px' }}>
              <Autocomplete
                options={searchOptions}
                getOptionLabel={option => option.label}
                value={searchValue}
                onChange={handleSearchChange}
                renderInput={params => (
                  <TextField {...params} label='Search' variant='outlined' />
                )}
              />
            </div>
            <div>
              <FormControl style={{ width: '200px' }}>
                <InputLabel>Sort By Price</InputLabel>
                <Select
                  value={sortValue}
                  onChange={event => setSortValue(event.target.value)}
                >
                  <MenuItem value=''>None</MenuItem>
                  <MenuItem value='asc'>Low to High</MenuItem>
                  <MenuItem value='desc'>High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Grid container spacing={2}>
            {tourData.length > 0 &&
              tourData.map(tour => (
                <Grid item key={tour.id} xs={12} sm={6} md={4}>
                  <Box>
                    <TourCard tour={tour} isAdmin={isAdmin} />
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default RecentTours
