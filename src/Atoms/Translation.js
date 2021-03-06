import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import palabras from '../Assets/palabras.json';
import frases from '../Assets/frases.json';
import CircularLoader from './CircularLoader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize: 14
  },
});
/**
 * Muestra el tipo de palabra a traducir y su traducción
 * @param {string} kindOfTranslation el tipo de traducción a realizar (Embera-Español o Español-Embera) 
 * @param {string} textToTranslate es el texto a traducir, proviene de TextInput o de SelectWords
 */
export default function Translation(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');

  //Comentarios:
  // De forma similar a componentDidMount y componentDidUpdate en clases de React
  useEffect(() => {
    //En el código inferior creo el algoritmo de búsqueda de las palabras
    const text = props.textToTranslate;
    //elimino los símbolos especiales como ?, ! y tíldes para buscar en el objeto JSON de las palabras
    const specialSymbols = /[¿?¡!]/g;
    const textReplaced = text !== undefined ? text.replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
    let entriesArray = [];
    //si se trata de traducción se usan las frases, de lo contrario las palabras para el diccionario
    const entriesArrayCheck = props.translation ? Object.entries(frases) : Object.entries(palabras);
    let index = 0;
    //revisar si se trata de un traduccion de palabra o frase
    if(!props.translation){
      if (entriesArrayCheck.length >= process.env.REACT_APP_CHECK_LENGTH) {
        for (const property in palabras) {
          index++;
          if (index <= process.env.REACT_APP_CHECK_LENGTH) {
            entriesArray.push([property, palabras[property]])
          }
        }
      }
    } else {
      //se trata de una traduccion de frase
      entriesArray = entriesArrayCheck;
    }
    if(!props.translation){
      let wordReplacedFinal;
    let temporalArrayForSavingInnerArrays = [];
    let wordsFormatted = entriesArray.map((word) => {
      const index = props.kindOfTranslation === 'Español-Embera' ? 0 : 1;
      let wordReplaced;
      //revisar si la palabra que se revisa es un arreglo
      if (Array.isArray(word[index])) {
        wordReplacedFinal = word[index].map((innerWord) => {
          let innerWordReplaced = innerWord.replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          temporalArrayForSavingInnerArrays.push(innerWordReplaced);
          return innerWordReplaced;
        })

      } else {
        return wordReplaced = word[index].replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }
      if (index !== 0) {
        wordReplacedFinal.forEach((el) => { wordReplaced = el; });
      }
      return wordReplaced;
    });
    let wordsFormattedFinal = [];
    let wordsIncluded;
    if (props.kindOfTranslation === 'Embera-Español') {
      //si el tipo de traduccion es embera a español, pueden haber arrays anidados, hacer push con los arrays
      wordsFormattedFinal = [...wordsFormatted, ...temporalArrayForSavingInnerArrays]
      wordsIncluded = wordsFormattedFinal.includes(textReplaced);

    } else {
      wordsIncluded = wordsFormatted.includes(textReplaced);
    }
    if (wordsIncluded) {
      entriesArray.find((word) => {
        const index = props.kindOfTranslation === 'Español-Embera' ? 0 : 1;
        const indexTwo = index === 0 ? 1 : 0;
        let wordReplaced;
        if (Array.isArray(word[index])) {
          wordReplaced = word[index].map((innerWord) => innerWord.replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
        } else {
          wordReplaced = word[index].replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        if (typeof wordReplaced !== 'object' && wordReplaced === textReplaced) {
          //la palabra que se ingresa en el input coincide con una palabra en el objeto json
          //y se procede a actualizar la vista con la palabra traducida
          if (Array.isArray(word[indexTwo])) {
            //la palabra que coincide es un array, por lo que se muestran las dos traducciones posibles
            setTranslation(word[indexTwo][0] + ' / ' + word[indexTwo][1])
          } else {
            setTranslation(word[indexTwo]);
          }
          setLoading(true);
        } else if (typeof wordReplaced === 'object') {
          //es un arreglo y es necesario iterar para comparar 
          wordReplaced.forEach((el) => {
            if (el === textReplaced) {
              //la palabra que se ingresa en el input coincide con una palabra en el objeto json
              //y se procede a actualizar la vista con la palabra traducida
              setTranslation(word[indexTwo])
              setLoading(true);
            }
          })
        }
        return null;
      }
      )
    } else if (textReplaced !== '') {
      setTranslation('Palabra no encontrada');
    } else {
      setTranslation('');
    }
    }
    else {
      //traducir frase
      //verificar si se trata de una traduccion del español al embera
      if(props.kindOfTranslation === 'Español-Embera'){
        //traduccion del español al embera
        let coincide = false;
        const specialSymbols = /[¿?¡!.,:; ]/g;
        const textoEnMinusculaSinCaracteresEspeciales =   props.textToTranslate.replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        //const textoEnFrasesEnMinusculasSinCaracteresEspeciales; 
        entriesArray.every(el=>{
          const fraseEnEspanolEnMinusculasSinCaracteresEspeciales = el[0].replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
          if(textoEnMinusculaSinCaracteresEspeciales === fraseEnEspanolEnMinusculasSinCaracteresEspeciales){
            //la frase en la lista coincide con el input del usuario
            coincide = true;
            setTranslation(el[1]);
            setLoading(true);
            return false;
          } else {
            coincide = false;
            return true;
          }
        });
        //si coincide traducir el texto, si no avisar al usuario que la frase no fue encontrada
        if(!coincide){
          setTranslation('Frase no encontrada');
        } 
      } else {
        //traducccion del embera al espanol
          let coincide = false;
          const specialSymbols = /[¿?¡!.,:; ]/g;
          const textoEnMinusculaSinCaracteresEspeciales =   props.textToTranslate.replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          entriesArray.every(el=>{
            const fraseEnEmberaEnMinusculasSinCaracteresEspeciales = el[1].replace(specialSymbols, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
            if(textoEnMinusculaSinCaracteresEspeciales === fraseEnEmberaEnMinusculasSinCaracteresEspeciales){
              //la frase en la lista coincide con el input del usuario
              coincide = true;
              setTranslation(el[0]);
              setLoading(true);
              return false;
            } else {
              coincide = false;
              return true;
            }
          });
          //si coincide traducir el texto, si no avisar al usuario que la frase no fue encontrada
          if(!coincide){
            setTranslation('Frase no encontrada');
          } 

      }
    }

  }, [props.textToTranslate, props.kindOfTranslation]);
  useEffect(() => {
    //Agrego el loader por un segundo y medio antes de mostrar la palabra traducida
    setTimeout(() => setLoading(false), 1500);
  }, [loading]);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='center'>
          <Typography className={classes.title} color="primary" gutterBottom>
            {props.kindOfTranslation}
          </Typography>
        </Grid>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {!props.translation ? 'Palabra' : 'Frase'}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.textToTranslate}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Traducción
        </Typography>
        {loading ?
          <CircularLoader /> :
          <Typography variant="h5" component="h2">
            {translation}
          </Typography>}
      </CardContent>
    </Card>
  );
}

Translation.propTypes = {
  kindOfTranslation: PropTypes.string,
  textToTranslate: PropTypes.string
};