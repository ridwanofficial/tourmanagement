import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import {
  createTourDetails,
  getTourDetailsById,
  updateTourDetails
} from '../../api/admin'
import {
  navigateToTourDetailsEdit,
  navigateToTourEdit
} from '../../util/navigations'
import { Button } from '@mui/material'
import { TOUR_DETAILS_CONST } from '../../constant'
const defaultData = {
  name: '',
  summary: '<p></p>'
}
const EditTourDetailsForm = ({ mode }) => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [tourData, setTourData] = useState(null)
  console.log('tourData:', tourData)
  const images = ['https://picsum.photos/seed/picsum/800/600']
  //

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    // Perform API request to update tour data
    console.log('Submitting tour data:', tourData)
    updateTourDetails(id, tourData).then(data => {})
    // Redirect back to tour details page or desired location
    // navigate(`/admin/tours/${id}`)
  }
  function handleCreateNewTourDetails () {
    createTourDetails({ ...tourData, id: Math.floor(Math.random(10000)) })
      .then()
      .catch(err => {})
  }

  useEffect(() => {
    if (mode === TOUR_DETAILS_CONST.NEW) {
      setTourData(defaultData)
    } else {
      getTourDetailsById(id).then(data => {
        setTourData(data[0])
      })
    }
  }, [mode])
  // Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target
    setTourData(prevData => ({ ...prevData, [name]: value }))
  }

  // Handle image file upload
  const handleImageUpload = e => {
    const file = e.target.files[0]
    // Perform necessary actions to upload the file, e.g., using FormData or an API
    console.log('Uploading image:', file)
    // Update tourData state with the uploaded image
    setTourData(prevData => ({ ...prevData, images: [file] }))
  }
  const handleChangeSummary = value => {
    setTourData(prevData => ({ ...prevData, summary: value }))
  }
  if (tourData === null) return <p>Loading.....</p>

  return (
    <div>
      <h2>Edit Tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='tourName'>Tour Name:</label>
          <input
            type='text'
            id='tourName'
            name='name'
            value={tourData.name}
            disabled={mode === TOUR_DETAILS_CONST.VIEW}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='tourSummary'>Summary:</label>
          <ReactQuill
            id='tourSummary'
            value={tourData.summary}
            disabled={mode === TOUR_DETAILS_CONST.VIEW}
            onChange={handleChangeSummary}
          />
        </div>
        ;
        <div>
          <label htmlFor='location'>Tour Location:</label>
          <input
            type='text'
            id='location'
            name='location'
            value={tourData.location}
            disabled={mode === TOUR_DETAILS_CONST.VIEW}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='tourplace'>Tour place:</label>
          <input
            type='text'
            id='tourplace'
            name='place'
            value={tourData.place}
            disabled={mode === TOUR_DETAILS_CONST.VIEW}
            onChange={handleChange}
          />
        </div>
        <h4>Uploaded Images:</h4>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: '400px' }}
            />
          </div>
        ))}
        {mode === TOUR_DETAILS_CONST.EDIT && (
          <>
            <div>
              <label htmlFor='tourImage'>Upload Image:</label>
              <input
                type='file'
                id='tourImage'
                name='image'
                onChange={handleImageUpload}
              />
            </div>

            <button type='submit'>Save Changes</button>
          </>
        )}
        {mode === TOUR_DETAILS_CONST.VIEW && (
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => navigateToTourDetailsEdit(navigate, tourData.id)}
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

export default EditTourDetailsForm
