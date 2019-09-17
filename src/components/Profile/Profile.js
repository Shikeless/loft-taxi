import React, { useState } from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { Grid, Box, TextField, Paper, Typography, Button, withStyles } from '@material-ui/core';
import { getProfile, profileSave } from '../../modules/Profile';
import { load } from '../../localStorage';

const styles = theme => ({
  root:{
    marginTop: '15vh',
    marginLeft: '15vw',
    padding: '28px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    minWidth: 400,
    maxWidth: 900
  },
  inputs: {
      display: 'inline-block',
  },
  button: {
    marginTop: '30px'
  },
  marg:{
      marginBottom: '25px'
  }
})

const customInput = ({
  input,
  helperText,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <TextField
      {...input}
      {...rest}
      fullWidth
      error={touched && error}
      helperText={(touched && error) || helperText}
    />
  );
};

const requiredVal = value => (value ? undefined : "Это обязательное поле");
const cardNameVal = value =>
  value && !/^[A-Za-z\s]+$/.test(value)
    ? "Только буквы латинского алфавита"
    : undefined;
const cardNumVal = value =>
  isNaN(Number(value)) || value.length !== 16
    ? "В номере карты 16 цифр"
    : undefined;
const cvvVal = value =>
  isNaN(Number(value)) || value.length !== 3
    ? "CVV состоит из 3 цифр"
    : undefined;


const Profile = props => {
  const { classes, handleSubmit } = props
  const data = load('profile')

  const [cardName, setCardName] = useState(
      data && data.cardName ? data.cardName : ""
  );
  const onChangeCardName = event => {
      setCardName(event.target.value);
  };

  const [expDate, setExpDate] = useState(
      data && data.expDate ? data.expDate : ""
  );
  const onChangeExpDate = event => {
      setExpDate(event.target.value);
  };

  const [cardNum, setCardNum] = useState(
      data && data.cardNum ? data.cardNum : ""
  );
  const onChangeCardNum = event => {
      setCardNum(event.target.value);
  };

  const [cvv, setCvv] = useState(
      data && data.cvv ? data.cvv : "");
  const onChangeCvv = event => {
      setCvv(event.target.value);
  };

  const [submitted, setSubmitted] = useState(false)
  const onSubmit = value => {
    const { profileSave } = props;
    setSubmitted(true);
    profileSave(value);
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(value => onSubmit(value))}>
        <Box>
          <Typography variant='h4' align='center' >
            Профиль
          </Typography>
          <Typography variant={!submitted ? "h6" : "subtitle1"} component="p">
            {!submitted ? "Способ оплаты" : "Платёжные данные обновлены. Теперь вы можете заказывать такси."}
          </Typography>
          {!submitted ? <>
            <Grid
            container
            alignItems='center'
            justify='space-between'
            direction='row'>
                <Grid>
                    <Field className={classes.marg}
                        name='cardName'
                        type='text'
                        id='1'
                        placeholder='Имя владельца'
                        label='Имя владельца*'
                        inputProps={{value:cardName}}
                        onChange={onChangeCardName}
                        component={customInput}
                        validate={[requiredVal, cardNameVal]}
                    />
                    <Field className={classes.marg}
                        name='expDate'
                        type='date'
                        id='2'
                        placeholder='Дата окончания действия'
                        label='Дата окончания действия*'
                        inputProps={{value:expDate}}
                        onChange={onChangeExpDate}
                        component={customInput}
                        validate={requiredVal}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                </Grid>
                <Grid>
                    <Field className={classes.marg}
                        name='cardNum'
                        type='text'
                        id='3'
                        placeholder='Номер карты'
                        label='Номер карты*'
                        inputProps={{value:cardNum}}
                        onChange={onChangeCardNum}
                        component={customInput}
                        validate={[requiredVal, cardNumVal]}
                    />
                    <Field className={classes.marg}
                        name='cardCVV'
                        type='text'
                        id='4'
                        placeholder='CVV'
                        label='CVV*'
                        inputProps={{value:cvv}}
                        onChange={onChangeCvv}
                        component={customInput}
                        validate={[requiredVal, cvvVal]}
                        helperText='Last three digits on signature strip'
                        margin="normal"
                    />
                </Grid>
            </Grid>
            <Button className={classes.button}
            variant='contained'
            color='primary'
            type="submit"
            disabled={!(cardName&&expDate&&cardNum&&cvv)}
            onClick={handleSubmit(value => onSubmit(value))}>
                Сохранить
            </Button>
        </> : 
          <Button className={classes.button}
            variant='contained'
            color='primary'
            type="submit"
            component={Link} to='/mapBox'>
            Перейти на карту
          </Button>}
        </Box>
      </form>
    </Paper>
  )
}

export default compose(connect( state => ({
    profile: getProfile(state)
  }), { profileSave }
  ),
  reduxForm({
    form: 'profile'
}))(withStyles(styles)(Profile))