import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
/**
 * Input selectivo que permite al usuario decidir que tipo de traducción realizar, esta se envia al componente
 * padre APP
 * @param {function} simpleSelectHandleChange callback que comunica al componente padre el tipo de traducción (Español-Embera/Embera-Español)
   @param {string} value tipo de traducción elegida por el usuario 
 */
export default function SimpleSelect(props) {
  const classes = useStyles();
  const [languageSelect, setLanguageSelect] = useState('Español-Embera');

  const handleChange = (event) => {
    setLanguageSelect(event.target.value);
    props.simpleSelectHandleChange(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Traducción</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={languageSelect}
          onChange={handleChange} >
          <MenuItem value={'Español-Embera'}>Español-Embera</MenuItem>
          <MenuItem value={'Embera-Español'}>Embera-Español</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

SimpleSelect.propTypes = {
  simpleSelectHandleChange: PropTypes.func,
  value : PropTypes.string
};