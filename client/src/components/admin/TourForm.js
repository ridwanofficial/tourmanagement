import React, { useState, useEffect } from 'react'
import {
  getAllTourDetails,
  getAllTours,
  getTourById,
  updateTour,
  updateTourDetails
} from '../../api/admin'
import { TextField } from '@mui/material'
import { formatDate } from '../../util/helperFunctions'

const TourForm = () => {
  const [tourId, setTourId] = useState(1)
  const [tourData, setTourData] = useState([])
  const [tourDetailsData, setDetailsTourData] = useState([])
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
  console.log('formValues:', formValues)

  // Fetch tour details on component mount
  useEffect(() => {
    // Call your API function to get tour details and update the state
    // Replace 'getAllTourDetails' with your actual API function for getting tour details
    getTourById(tourId).then(data => {
      setTourData(data[0])
      setFormValues(prevValues => ({
        ...prevValues,
        tourDetailsId: data[0].tourId,
        date: formatDate(new Date(data[0].date))
      }))
    })
    getAllTourDetails().then(data => {
      setDetailsTourData(data)
    })
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault()
    // Call your API function to update the tour using the form values
    // Replace 'updateTour' with your actual API function for updating a tour
    updateTour(tourId, {
      ...formValues,
      tourDetailsId: parseInt(formValues.tourDetailsId),
      guideId: 2
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
    <form onSubmit={handleFormSubmit}>
      <label>
        Date:
        <TextField
          name='date'
          type='date'
          value={formValues?.date || ''}
          onChange={handleInputChange}
        />
        {/* <input
          type='date'
          name='date'
          value={formValues.date}
          onChange={handleInputChange}
        /> */}
      </label>
      <label>
        Capacity:
        <input
          type='number'
          name='capacity'
          value={formValues.capacity}
          onChange={handleInputChange}
        />
      </label>

      {/* Add more input fields for other form values */}
      <label>
        Tour Details:
        <select
          typeof='number'
          name='tourDetailsId'
          value={formValues.tourDetailsId}
          onChange={handleInputChange}
        >
          {tourDetailsData.map(detail => (
            <option key={detail.id} value={parseInt(detail.id)}>
              {detail.name}
            </option>
          ))}
        </select>
      </label>
      <button type='submit'>Update Tour</button>
    </form>
  )
}

export default TourForm
