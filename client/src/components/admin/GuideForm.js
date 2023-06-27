import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import {
  getAllGuides,
  getGuideById,
  updateGuide,
  updateGuides
} from '../../api/admin'
import {
  navigateToTourDetailsEdit,
  navigateToTourEdit
} from '../../util/navigations'
import { Button } from '@mui/material'
import { TOUR_DETAILS_CONST } from '../../constant'
const defaultData = {
  name: '',
  email: '',
  contactNumberNumber: ''
}
const GuideForm = ({ mode }) => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [guideData, setGuideData] = useState(null)
  console.log('guideData:', guideData)
  const images = ['https://picsum.photos/seed/picsum/800/600']
  //

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    // Perform API request to update tour data
    console.log('Submitting tour data:', guideData)
    updateGuide(id, guideData).then(data => {})
    // Redirect back to tour details page or desired location
    // navigate(`/admin/tours/${id}`)
  }
  function handleCreateNewTourDetails () {
    // createTourDetails({ ...guideData, id: Math.floor(Math.random(10000)) })
    //   .then()
    //   .catch(err => {})
  }

  useEffect(() => {
    if (mode === TOUR_DETAILS_CONST.NEW) {
      setGuideData(defaultData)
    } else {
      getGuideById(id).then(data => {
        setGuideData(data[0])
      })
    }
  }, [mode])
  // Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target
    setGuideData(prevData => ({ ...prevData, [name]: value }))
  }

  if (guideData === null) return <p>Loading.....</p>

  return (
    <div>
      <h2>Edit Tour</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Guide Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={guideData.name}
          disabled={mode === TOUR_DETAILS_CONST.VIEW}
          onChange={handleChange}
        />

        <label htmlFor='email'>Guide Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={guideData.email}
          disabled={mode === TOUR_DETAILS_CONST.VIEW}
          onChange={handleChange}
        />

        <label htmlFor='contactNumber'>Guide ContactNumber:</label>
        <input
          type='text'
          id='contactNumber'
          name='contactNumber'
          value={guideData.contactNumber}
          disabled={mode === TOUR_DETAILS_CONST.VIEW}
          onChange={handleChange}
        />

        {mode === TOUR_DETAILS_CONST.EDIT && (
          <>
            <button type='submit'>Save Changes</button>
          </>
        )}
        {mode === TOUR_DETAILS_CONST.VIEW && (
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => navigateToTourDetailsEdit(navigate, guideData.id)}
            >
              Edit
            </Button>
          </div>
        )}
        {mode === TOUR_DETAILS_CONST.NEW && (
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleCreateNewTourDetails}>Save</Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default GuideForm
