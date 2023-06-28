import React, { useState } from 'react'
// Navbar.js
import '../styles/navbar.css'
import { Link } from 'react-router-dom'
import RoutesPath from '../RoutesPath'

export default function Navbar () {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className='navigation'>
      <a href='/' className='brand-name'>
        Tour Management
      </a>
      <button
        className='hamburger'
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='white'
        >
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          <li>
            <Link to={'/'}>{'Home'}</Link>
          </li>
          <li>
            <Link to={RoutesPath.adminDashboard}>{'Admin'}</Link>
          </li>
          <li>
            <Link to={RoutesPath.adminTours}>{'Admin Tours'}</Link>
          </li>
          <li>
            <Link to={RoutesPath.adminGuides}>{'Admin Guides'}</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
