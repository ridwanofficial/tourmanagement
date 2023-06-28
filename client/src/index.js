import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { globalTheme } from './Themes/globalTheme'
import { MuiThemeProvider, createTheme } from '@material-ui/core'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={globalTheme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>
)
