import orange from 'material-ui/colors/orange'
import blueGrey from 'material-ui/colors/blueGrey'

const ThemeType = {
  light: 'light',
  dark: 'dark' // TODO
}

const lightTheme = {
  palette: {
    'primary': {
      ...blueGrey
    },
    'secondary': {
      ...orange
    },
    'error': {
      '50': '#ffebee',
      '100': '#ffcdd2',
      '200': '#ef9a9a',
      '300': '#e57373',
      '400': '#ef5350',
      '500': '#f44336',
      '600': '#e53935',
      '700': '#d32f2f',
      '800': '#c62828',
      '900': '#b71c1c',
      'A100': '#ff8a80',
      'A200': '#ff5252',
      'A400': '#ff1744',
      'A700': '#d50000',
      'contrastDefaultColor': 'light'
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white'
      },
      raisedAccent: {
        color: 'white'
      }
    }
  }
}

const darkTheme = {
  palette: {
    'primary': {
      '50': '#e3f2fd',
      '100': '#bbdefb',
      '200': '#90caf9',
      '300': '#64b5f6',
      '400': '#42a5f5',
      '500': '#2196f3',
      '600': '#1e88e5',
      '700': '#1976d2',
      '800': '#1565c0',
      '900': '#0d47a1',
      'A100': '#82b1ff',
      'A200': '#448aff',
      'A400': '#2979ff',
      'A700': '#2962ff',
      'contrastDefaultColor': 'dark'
    },
    'secondary': {
      '50': '#fce4ec',
      '100': '#f8bbd0',
      '200': '#f48fb1',
      '300': '#f06292',
      '400': '#ec407a',
      '500': '#e91e63',
      '600': '#d81b60',
      '700': '#c2185b',
      '800': '#ad1457',
      '900': '#880e4f',
      'A100': '#ff80ab',
      'A200': '#ff4081',
      'A400': '#f50057',
      'A700': '#c51162',
      'contrastDefaultColor': 'dark'
    },
    'error': {
      '50': '#ffebee',
      '100': '#ffcdd2',
      '200': '#ef9a9a',
      '300': '#e57373',
      '400': '#ef5350',
      '500': '#f44336',
      '600': '#e53935',
      '700': '#d32f2f',
      '800': '#c62828',
      '900': '#b71c1c',
      'A100': '#ff8a80',
      'A200': '#ff5252',
      'A400': '#ff1744',
      'A700': '#d50000',
      'contrastDefaultColor': 'dark'
    }
  }
}

const themes = new Map([[ThemeType.light, lightTheme], [ThemeType.dark, darkTheme]])

export {
  ThemeType,
  themes
}
