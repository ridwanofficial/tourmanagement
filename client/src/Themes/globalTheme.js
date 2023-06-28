import { createTheme } from '@material-ui/core'
import { COLORS } from '../globalColors'
// import { bnBD } from '@mui/material/locale';

export const globalTheme = createTheme({
  // shadows: ["none"],
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        fontFamily: COLORS.FONT,
        fontSize: '16px',
        letterSpacing: '.75px',
        color: COLORS.TEXT,
        wordWrap: 'break-word'
      }
    },
    MuiTableCell: {
      root: {
        fontFamily: COLORS.FONT,
        borderBottom: 'none'
      },
      body: {
        fontFamily: COLORS.FONT,
        textAlign: 'center'
      },
      head: {
        fontFamily: COLORS.FONT,
        backgroundColor: '#fff',
        borderBottom: 'none',
        fontWeight: '600',
        fontSize: '16px',
        letterSpacing: '.75px',
        textAlign: 'center'
      }
    },

    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(odd)': {
          backgroundColor: COLORS.TABLE_ROW
        }
      }
    },
    // MuiPaper: {
    //     root: {
    //         // fontFamily: COLORS.FONT
    //     }
    // },
    MuiTypography: {
      root: {
        fontFamily: COLORS.FONT
      }
    },
    // MuiAlert: {

    //     root: {
    //         fontFamily: COLORS.FONT
    //     }
    // },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        fontSize: '16px'
      }
    }
    // MuiSwitch: {

    //     switchBase: {
    //         // Controls default (unchecked) color for the thumb
    //         color: "#ccc"
    //     },
    //     colorSecondary: {
    //         "&$checked": {
    //             // Controls checked color for the thumb
    //             color: "#f2ff00"
    //         }
    //     },
    //     colorPrimary: {
    //         "&$checked": {
    //             // Controls checked color for the thumb
    //             color: "#f2ff00"
    //         }
    //     },
    //     track: {
    //         // Controls default (unchecked) color for the track
    //         opacity: 0.2,
    //         backgroundColor: "#fff",
    //         "$checked$checked + &": {
    //             // Controls checked color for the track
    //             opacity: 0.7,
    //             backgroundColor: "#fff"
    //         }
    //     }

    // }
  },
  palette: {
    primary: {
      // ...theme.palette.primary,
      main: COLORS.SECONDARY
    },
    secondary: {
      // ...theme.palette.secondary,
      main: COLORS.RED_ACCENT_2
    }
  },
  typography: {
    fontFamily: [
      // 'open-sans',
      COLORS.FONT
      // 'Roboto',
      // 'sans-serif',
    ].join(',')
  }
})
