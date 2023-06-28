import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import { Button, Paper, TextField } from '@mui/material'
import { TOUR_DETAILS_CONST } from '../../constant'
import { Card } from 'react-bootstrap'

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
            <h2>Edit Guide Information</h2>
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor='name' style={{ margin: 'auto auto' }}>
                    Guide Name:
                  </label>
                  <TextField
                    type='text'
                    id='name'
                    name='name'
                    value={guideData.name}
                    disabled={mode === TOUR_DETAILS_CONST.VIEW}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <label htmlFor='email' style={{ margin: 'auto auto' }}>
                    Guide Email:
                  </label>
                  <TextField
                    type='email'
                    id='email'
                    name='email'
                    value={guideData.email}
                    disabled={mode === TOUR_DETAILS_CONST.VIEW}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <label
                    htmlFor='contactNumber'
                    style={{ margin: 'auto auto' }}
                  >
                    Guide ContactNumber:
                  </label>
                  <TextField
                    type='text'
                    id='contactNumber'
                    name='contactNumber'
                    value={guideData.contactNumber}
                    disabled={mode === TOUR_DETAILS_CONST.VIEW}
                    onChange={handleChange}
                  />
                </div>
                {mode === TOUR_DETAILS_CONST.EDIT && (
                  <div
                    style={{
                      margin: '15px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Button
                      variant='contained'
                      style={{
                        width: '150px',
                        margin: 'auto',
                        textAlign: 'center',
                        padding: '10px'
                      }}
                      type='submit'
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
                {mode === TOUR_DETAILS_CONST.VIEW && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={() =>
                        navigateToTourDetailsEdit(navigate, guideData.id)
                      }
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
              </div>
            </form>
          </Card.Body>
        </Paper>
      </Card>
    </div>
  )
}

export default GuideForm
