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

async function getConnection () {
  try {
    const pool = await sql.connect(config)
    return pool
  } catch (error) {
    console.error('Failed to establish database connection:', error)
    throw error
  }
}

module.exports = getConnection
