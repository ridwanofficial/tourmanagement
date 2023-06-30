import React, { useState, useEffect } from 'react'
import {
  getAllGuides,
  getAllTourDetails,
  getAllTours,
  getTourById,
  updateTour,
  updateTourDetails
} from '../../api/admin'
import { Menu, MenuItem, Paper, Select, TextField } from '@mui/material'
import { formatDate } from '../../util/helperFunctions'
import { Card } from 'react-bootstrap'
import ChooseBoardingPoint from '../ChooseBoardingPoint'

const TourForm = () => {
  const [tourId, setTourId] = useState(1)
  const [tourData, setTourData] = useState([])
  const [tourDetailsData, setDetailsTourData] = useState([])
  const [guideData, setGuideData] = useState([])
  const [formValues, setFormValues] = useState({
    date: '',
    capacity: 0,
    bookingPerson: 0,
    boardingPointLat: 0,
    boardingPointLng: 0,
    returnTime: '',
    departureTime: '',
    guideId: 0,
    tourDetailsId: 0
  })
  function setBoardingPoint (val) {
    setFormValues(prevValues => ({
      ...prevValues,
      boardingPointLat: val.lat,
      boardingPointLng: val.lng
    }))
  }

  console.log('formValues:', formValues)

  // Fetch tour details on component mount
  useEffect(() => {
    // Call your API function to get tour details and update the state
    // Replace 'getAllTourDetails' with your actual API function for getting tour details
    getTourById(tourId).then(data => {
      setTourData(data[0])
      setFormValues(prevValues => ({
        ...prevValues,
        ...data[0],
        tourDetailsId: data[0].tourId,
        date: formatDate(new Date(data[0].date))
      }))
    })
    getAllTourDetails().then(data => {
      setDetailsTourData(data)
    })
    getAllGuides().then(data => {
      setGuideData(data)
    })
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault()
    // Call your API function to update the tour using the form values
    // Replace 'updateTour' with your actual API function for updating a tour
    updateTour(tourId, {
      ...formValues,
      tourDetailsId: parseInt(formValues.tourDetailsId),
      guideId: parseInt(formValues.guideId),
      capacity: parseInt(formValues.capacity)
    })
      .then(() => {
        // Handle success
        console.log('Tour updated successfully')
      })
      .catch(error => {
        // Handle error
        console.error('Failed to update tour:', error)
      })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }
  const handleDateChange = e => {
    const { name, value } = e.target

    // Extract day, month, and year from the date value
    const dateObj = new Date(value)
    setFormValues(prevValues => ({
      ...prevValues,
      date: dateObj
    }))
  }
  return (
    <div className='col d-flex justify-content-center'>
      <Card
        style={{
          width: '70%',
          height: '70%',
          margin: 'auto',
          padding: '0px'
        }}
      >
        <Paper elevation={6}>
          <Card.Body style={{ padding: '5px 15px 15px 15px', margin: '0px' }}>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  width: '60%',
                  minWidth: '400px',
                  margin: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <label style={{ margin: 'auto auto' }}>Date:</label>

                  <TextField
                    name='date'
                    type='date'
                    value={formValues?.date || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <label>
                    Capacity:
                    <TextField
                      type='number'
                      name='capacity'
                      value={formValues.capacity}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <label>
                  Guide:
                  <Select
                    name='guideId'
                    value={formValues.guideId}
                    onChange={handleInputChange}
                  >
                    {guideData.map(guide => (
                      <MenuItem key={guide.id} value={parseInt(guide.id)}>
                        {guide.name}
                      </MenuItem>
                    ))}
                  </Select>
                </label>
                {/* Add more input fields for other form values */}
                <label>
                  Tour Details:
                  <Select
                    typeof='number'
                    name='guideId'
                    value={formValues.tourDetailsId}
                    onChange={handleInputChange}
                  >
                    {tourDetailsData.map(detail => (
                      <MenuItem
                        key={detail.guideId}
                        value={parseInt(detail.guideId)}
                      >
                        {detail.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ChooseBoardingPoint
                    boardingPoint={{
                      lat: formValues?.boardingPointLat,
                      lng: formValues?.boardingPointLng
                    }}
                    setBoardingPoint={setBoardingPoint}
                  />
                </label>
                <button type='submit'>Update Tour</button>
              </div>
            </form>
          </Card.Body>
        </Paper>
      </Card>
    </div>
  )
}

export default TourForm
