import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  input: {
    marginTop: '8px'
  }
}), {
  name: 'MuiFilledInput'
});
/**
 * El input typo texto que recibe lo que escribe el usuario para buscar la palabra en el objeto JSON
 * @param {function} handleChange Una función callback que recibe el texto del usuario y lo pasa al componente
 * padre APP.  
 */
export default function TextInput(props) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value);
    props.handleChange(event.target.value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
      <TextField className={classes.input} id="filled-basic" label="Ingresa la palabra o expresión a traducir" variant="filled" value={text}
        onChange={handleChange} 
      />
    </form>
  );
}

TextInput.propTypes = {
  handleChange: PropTypes.func
};