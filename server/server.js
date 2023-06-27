var express = require('express')
var app = express()

var tourRoutes = require('./routes/tourRoutes')

// Use the tourRoutes router
app.use('/', tourRoutes)

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
