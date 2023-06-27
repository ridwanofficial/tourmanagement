var express = require('express')
const sqlConnection = require('../configuration/database')
var router = express.Router()
const sql = require('mssql')

// Get tour details by ID
router.get('/getTourById/:id', (req, res) => {
  const tourId = req.params.id

  sqlConnection()
    .then(pool => {
      return pool.request().input('tourId', sql.Int, tourId).query(`
        SELECT t.id AS tourId, t.date, t.capacity, t.bookingPerson, t.boardingPointLat, 
        t.boardingPointLng, t.returnTime, t.departureTime,
          g.id AS guideId, g.personId, p.name AS guideName, p.contactNumber AS guideContact,
          td.id AS tourDetailsId, td.name, td.summary, td.location, td.place
        FROM tours AS t
        INNER JOIN guides AS g ON t.guideId = g.id
        INNER JOIN persons AS p ON g.personId = p.id
        INNER JOIN tour_details AS td ON t.tourDetailsId = td.id
        WHERE t.id =@tourId
      `)
    })
    .then(result => {
      const tourDetails = result.recordset
      res.json(tourDetails)
    })
    .catch(err => {
      console.error('Failed to get tour details:', err)
      res.status(500).json({ error: 'Failed to get tour details' })
    })
})

// Get tour details by ID
router.get('/getAllTour', (req, res) => {
  sqlConnection()
    .then(pool => {
      return pool.request().query(`
        SELECT t.id AS tourId, t.date, t.capacity, t.bookingPerson, t.boardingPointLat, 
        t.boardingPointLng, t.returnTime, t.departureTime,
          g.id AS guideId, g.personId, p.name AS guideName, p.contactNumber AS guideContact,
          td.id AS tourDetailsId, td.name, td.summary, td.location, td.place
        FROM tours AS t
        INNER JOIN guides AS g ON t.guideId = g.id
        INNER JOIN persons AS p ON g.personId = p.id
        INNER JOIN tour_details AS td ON t.tourDetailsId = td.id
      `)
    })
    .then(result => {
      const tourDetails = result.recordset
      res.json(tourDetails)
    })
    .catch(err => {
      console.error('Failed to get tour details:', err)
      res.status(500).json({ error: 'Failed to get tour details' })
    })
})

module.exports = router
