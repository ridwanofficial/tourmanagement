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

// update a tours
router.put('/updateTour/:id', (req, res) => {
  const tourId = req.params.id
  const {
    date,
    capacity,
    bookingPerson,
    boardingPointLat,
    boardingPointLng,
    returnTime,
    departureTime,
    guideId,
    tourDetailsId
  } = req.body

  sqlConnection()
    .then(pool => {
      return pool
        .request()
        .input('date', sql.Date, date)
        .input('capacity', sql.Int, capacity)
        .input('bookingPerson', sql.Int, bookingPerson)
        .input('boardingPointLat', sql.Float, boardingPointLat)
        .input('boardingPointLng', sql.Float, boardingPointLng)
        .input('returnTime', sql.VarChar, returnTime)
        .input('departureTime', sql.VarChar, departureTime)
        .input('guideId', sql.Int, guideId)
        .input('tourDetailsId', sql.Int, tourDetailsId)
        .input('tourId', sql.Int, tourId)
        .query(
          'UPDATE tours SET date = @date, capacity = @capacity, bookingPerson = @bookingPerson, boardingPointLat = @boardingPointLat, boardingPointLng = @boardingPointLng, returnTime = @returnTime, departureTime = @departureTime, guideId = @guideId, tourDetailsId = @tourDetailsId WHERE id = @tourId'
        )
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error('Failed to update tour details:', err)
      res.status(500).json({ error: 'Failed to update tour details' })
    })
})

// Get tour details by ID
router.get('/getAllTourDetails', (req, res) => {
  sqlConnection()
    .then(pool => {
      return pool.request().query(`
        SELECT td.id, td.name, td.summary, td.location, td.place
        FROM tour_details td
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

router.get('/getTourDetailsById/:id', (req, res) => {
  const tourId = req.params.id

  sqlConnection()
    .then(pool => {
      return pool
        .request()
        .input('tourId', sql.Int, tourId)
        .query('SELECT * FROM tour_details WHERE id = @tourId')
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

router.post('/createTourDetails', (req, res) => {
  const { name, summary, location, place, id } = req.body

  sqlConnection()
    .then(pool => {
      return pool
        .request()
        .input('name', sql.VarChar, name)
        .input('id', sql.Int, id)
        .input('summary', sql.VarChar, summary)
        .input('location', sql.VarChar, location)
        .input('place', sql.VarChar, place)
        .query(
          'INSERT INTO tour_details (id,name, summary, location, place) VALUES (@id,@name, @summary, @location, @place)'
        )
    })
    .then(() => {
      res.sendStatus(200).json({})
    })
    .catch(err => {
      console.error('Failed to create tour details:', err)
      res.status(500).json({ error: 'Failed to create tour details' })
    })
})

router.put('/updateTourDetails/:id', (req, res) => {
  const tourId = req.params.id
  const { name, summary, location, place } = req.body

  sqlConnection()
    .then(pool => {
      return pool
        .request()
        .input('tourId', sql.Int, tourId)
        .input('name', sql.VarChar, name)
        .input('summary', sql.VarChar, summary)
        .input('location', sql.VarChar, location)
        .input('place', sql.VarChar, place)
        .query(
          'UPDATE tour_details SET name = @name, summary = @summary, location = @location, place = @place WHERE id = @tourId'
        )
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error('Failed to update tour details:', err)
      res.status(500).json({ error: 'Failed to update tour details' })
    })
})

module.exports = router
