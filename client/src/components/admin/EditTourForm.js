import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
const EditTourForm = () => {
  const { tourId } = useParams()
  const navigate = useNavigate()
  const [tourData, setTourData] = useState({
    name: '',
    summary: '<p></p>',
    images: ['https://picsum.photos/seed/picsum/800/600']
    // Add more fields as needed
  })

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    // Perform API request to update tour data
    console.log('Submitting tour data:', tourData)
    // Redirect back to tour details page or desired location
    navigate(`/admin/tours/${tourId}`)
  }

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
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='tourSummary'>Summary:</label>
          <ReactQuill
            id='tourSummary'
            value={tourData.summary}
            onChange={handleChangeSummary}
          />
        </div>
        <h4>Uploaded Images:</h4>
        {tourData.images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: '400px' }}
            />
          </div>
        ))}
        <div>
          <label htmlFor='tourImage'>Upload Image:</label>
          <input
            type='file'
            id='tourImage'
            name='image'
            onChange={handleImageUpload}
          />
        </div>
        {/* Add more form fields as needed */}
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default EditTourForm
