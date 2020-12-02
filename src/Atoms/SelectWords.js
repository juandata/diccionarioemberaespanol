import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import palabras from '../Assets/palabras.json';
import { v4 as uuid_v4 } from "uuid";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 128,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}), { name: 'MuiFilledInput' });


/**
 * Despliega una lista seleccionable con las palabras incluídas en el archivo palabras.json
 * @param {function} selectWordsOnChange  es un callbak que envia la palabra seleccionada al componente padre App
   @param {boolean} Spanish es un booleano que indica si la palabra a traducir es en Español o en Embera
 */
export default function SelectWords(props) {
  const classes = useStyles();
  const [word, setWord] = useState(props.Spanish ? '¿Cómo estás?' : 'Sa buma');
  const handleChange = (event) => {
    setWord(event.target.value);
    props.selectWordsOnChange(event.target.value);
  };
  let entriesArray = [];
  const entriesArrayCheck = Object.entries(palabras);
  let index = 0;
  if (entriesArrayCheck.length >= process.env.REACT_APP_CHECK_LENGTH) {
    for (const property in palabras) {
      index++;
      if (index <= process.env.REACT_APP_CHECK_LENGTH) {
        entriesArray.push([property, palabras[property]])
      }


    }
  }


  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">{props.Spanish ? 'Lista de Palabras Español' : 'Lista de Palabras Embera'}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={word}
          onChange={handleChange}
        >
          {entriesArray.map((word) => {
            if (props.Spanish) {
              return <MenuItem key={uuid_v4()} value={word[0]}>{word[0]}</MenuItem>
            } else if (Array.isArray(word[1])) {
              return word[1].map((word) => <MenuItem value={word} key={uuid_v4()}>{word}</MenuItem>);
            } else {
              return <MenuItem key={uuid_v4()} value={word[1]}>{word[1]}</MenuItem>
            }
          })}
        </Select>
      </FormControl>
    </div>

  );
}

SelectWords.propTypes = {
  selectWordsOnChange: PropTypes.func,
  Spanish: PropTypes.bool
};