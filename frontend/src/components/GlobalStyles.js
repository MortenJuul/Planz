import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      background: '#888',
      'border-radius': '0.2em'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#f1f1f1',
      width: '0.2em',
      'border-radius': '0.15em'
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.mainLogo': {
      height: '40px'
    },
    '.datepicker': {
      width: '50%',
      transform: 'scale(0.5)'
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
