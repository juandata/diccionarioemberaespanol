import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBarHeader from './Atoms/AppBarHeader';
import TextInput from './Atoms/TextInput';
import TextInputTranslation from './Atoms/TextInputTranslation';
import SimpleSelect from './Atoms/SimpleSelect';
import Translation from './Atoms/Translation';
import SelectWords from './Atoms/SelectWords';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TensorFlowModels from './Translator/TensorFlowModels';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '5px'
  },
  button: {
    margin: theme.spacing(1),
  },
  cardStyles: {
    flexGrow: 1,
    marginTop: '15px'
  },
  dividerStyles : {
    marginTop : 15
  }
}));

/**
 * Punto de entrada de la aplicación, renderiza toda la app. 
 */
function App() {
  //clase para definir el estilo de los componentes
  const classes = useStyles();
  //estado de la app usando rect hooks
  const [userTextInput, setUserTextInput] = useState('');
  const [userTextInputTranslation, setUserTextInputTranslation] = useState('');
  const [translationSelected, setTranslationSelected] = useState('Español-Embera');
  const [translationSelectedTranslation, setTranslationSelectedTranslation] = useState('Español-Embera');
  //listeners
  const handleChange = (ev) => setUserTextInput(ev);
  const handleChangeTranslation = (ev) => setUserTextInputTranslation(ev);
  const selectChanged = (ev) => setUserTextInput(ev);
  const simpleSelectHandleChange = (ev) => setTranslationSelected(ev);
  const simpleSelectHandleChangeTranslation = (ev) => setTranslationSelectedTranslation(ev);

  return (
    <div className="App">
      <header className="App-header">
        <AppBarHeader />
      </header>
      <section>
      <Grid container className={classes.root} spacing={2} justify='center' direction="column" alignContent='center'>
      <Typography variant="h4" align="center" gutterBottom>
        Diccionario
      </Typography>
        
        <Grid container className={classes.root} spacing={2} justify='center' alignContent='center'>
          <TextInput
            handleChange={handleChange} />
          <SimpleSelect
            simpleSelectHandleChange={simpleSelectHandleChange}
            value={translationSelected} />
          <SelectWords Spanish={true} selectWordsOnChange={selectChanged} />
          <SelectWords Spanish={false} selectWordsOnChange={selectChanged} />
        </Grid>
        </Grid>
      </section>
      <section>
        <Grid container className={classes.cardStyles} spacing={2} justify='center' alignContent='center'>
          <Translation textToTranslate={userTextInput}
            kindOfTranslation={translationSelected} translation={false} />
        </Grid>
      </section>
      <Divider className={classes.dividerStyles} />
      <section>
        <Grid container className={classes.cardStyles} spacing={2} justify='center' alignContent='center' direction="column">
        <Typography variant="h4" align="center" gutterBottom>
        Traductor
      </Typography>
      <Grid container className={classes.cardStyles} spacing={2} justify='center' alignContent='center'>
      <TextInputTranslation
            handleChange={handleChangeTranslation} />
              <SimpleSelect
            simpleSelectHandleChange={simpleSelectHandleChangeTranslation}
            value={translationSelectedTranslation} />
      </Grid>
        </Grid>
      </section>
      <section>
        <Grid container className={classes.cardStyles} spacing={2} justify='center' alignContent='center'>
          <Translation textToTranslate={userTextInputTranslation}
            kindOfTranslation={translationSelectedTranslation} translation={true}/>
        </Grid>
      </section>
      <Divider className={classes.dividerStyles} />
    </div>
  );
}

export default App;