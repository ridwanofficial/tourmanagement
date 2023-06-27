var express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Parse JSON bodies
app.use(bodyParser.json())

var tourRoutes = require('./routes/tourRoutes')

// Use the tourRoutes router
app.use('/', tourRoutes)

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
