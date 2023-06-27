var express = require('express')
var app = express()
const sql = require('mssql')

const config = {
  server: 'localhost',
  port: 1433,
  user: 'admin1',
  password: '1234',
  database: 'TourManagement',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    ssl: {
      // ca: fs.readFileSync('/path/to/self_signed_certificate.pem')
    }
  }
}

// Get tour details by ID
app.get('/tour-details/:id', (req, res) => {
  const tourId = req.params.id

  sql
    .connect(config)
    .then(pool => {
      return pool
        .request()
        .input('tourId', sql.Int, tourId)
        .query('SELECT * FROM tour_details WHERE id = @tourId')
    })
    .then(result => {
      console.log('result:', result)
      const tourDetails = result.recordset[0]
      res.json(tourDetails)
    })
    .catch(err => {
      console.error('Failed to get tour details:', err)
      res.status(500).json({ error: 'Failed to get tour details' })
    })
})

sql
  .connect(config)
  .then(pool => {
    // console.log('pool:', pool)
    // Connection successful, perform database operations
  })
  .catch(err => {
    console.error('Failed to connect to SQL Server:', err)
  })

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 3000')
})
