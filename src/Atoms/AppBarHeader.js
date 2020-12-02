import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../Assets/logoDiccionarioEmberaEspanol.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoStyles: {
    width: '60px',
    marginRight: '10px'
  }
}));
/**
 * Encabezado, es la sección que renderiza el logo y el título de la app
 */
export default function AppBarHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {<img className={classes.logoStyles} src={Logo} alt='Logo Diccionario Español-Embera' />}
          <Typography variant="h6" className={classes.title}>
            Diccionario Español-Embera / Embera-Español
          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}
// <Button color="inherit">Login</Button>