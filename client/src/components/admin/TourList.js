import React from 'react'
import { Link } from 'react-router-dom'
import { mockTours } from '../../constant'

const TourList = ({ tours, onDelete }) => {
  return (
    <div>
      <h2>Tour List</h2>
      {mockTours.map(tour => (
        <div key={tour.id}>
          <h3>{tour.name}</h3>
          <p>{tour.summary}</p>
          <p>{tour.location}</p>
          <Link to={`/tour-details/:id`}>View Details</Link>
          <Link to={`/tour-details/:id/edit`}>Edit</Link>
          <button onClick={() => onDelete(tour.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default TourList
