const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin1',
  password: '1234',
  database: 'TourManagement'
})

connection.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err)
  } else {
    console.log('Connected to the database!')
    // Perform database operations here
  }
})

// connection.connect()

// const port = 5000
// app.listen(port, () => console.log(`Server started on port ${port}`))
