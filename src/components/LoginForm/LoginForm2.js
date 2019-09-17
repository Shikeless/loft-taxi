import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Button } from "@material-ui/core/";
import { TextField } from "final-form-material-ui";
import { getIsAuthorized, authRequest, getError } from "../../modules/Auth";
import { Grid, FormHelperText } from "@material-ui/core/";
import styles from "./LoginForm.module.css";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  authError: getError(state)
});
const MapDispatchToProps = { authRequest };

export function Login(props) {
  const onSubmit = event => {
    const { authRequest } = props;
    const { userName, userPassword } = event;
    authRequest({
      email: userName,
      password: userPassword
    });
  };

  const { isAuthorized, authError } = props;
  if (isAuthorized) return <Redirect to="/mapBox" />;

  return (
    <div data-testid="form-login" className={styles.root}>
      <h1>Войти</h1>
      {authError && (
        <FormHelperText data-testid="form-login-error" style={{ color: "red" }}>
          {`${authError}`}
        </FormHelperText>
      )}
      <Form
        onSubmit={onSubmit}
        initialValues={{
          userName: "",
          userPassword: ""
        }}
        render={({
          handleSubmit,
          submitting,

          hasValidationErrors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Field
                  name="userName"
                  component={TextField}
                  label="Логин"
                  className="t-input-userName"
                />
              </Grid>
              <Grid item>
                <Field
                  name="userPassword"
                  type="password"
                  component={TextField}
                  label="Пароль"
                  className="t-input-userPassword"
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || hasValidationErrors}
                  data-testid="login-btn-submit"
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Login));