import React from 'react'

import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <h1>Admin Admin</h1>
      <div>
        <h1>Admin Page</h1>
        <ul>
          <li>
            <Link to={`tours`}>View Tours</Link>
          </li>
          <li>
            <Link to={`tours/new`}>Add Tour</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Admin
