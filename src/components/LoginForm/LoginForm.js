import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsAuthorized, authRequest, getError } from "../../modules/Auth";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import styles from "./LoginForm.module.css";
import "bootstrap/dist/css/bootstrap.css";

const MapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state),
    authError: getError(state)
});

const fields = [
    {
        id: "email",
        label: "Почта",
        type: "text"
    },
    {
        id: "password",
        label: "Пароль",
        type: "password"
    }
];

class LoginForm extends React.Component {
    state = {
        values: {
            email: "",
            password: ""
        }
    };

    handleChange = event => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [event.target.name]: event.target.value }
        });
    };

    handleSubmit = () => {
        const {
            values: { email, password }
        } = this.state;
        const { authRequest } = this.props;
        authRequest({ email, password });
    };

    render() {
        const { isAuthorized, authError } = this.props;
        const { values } = this.state;
        if (isAuthorized) return <Redirect to="/mapBox" />;
        return (
            <div className={styles.root}>
                {authError !== null && (
                    <Alert color="danger">{authError}</Alert>
                )}
                <Form>
                    {fields.map(({ id, label, type }) => (
                        <React.Fragment key={id}>
                            <FormGroup>
                                <Label for={id}>{label}</Label>
                                <Input
                                    id={id}
                                    type={type}
                                    name={id}
                                    value={values[id]}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </React.Fragment>
                    ))}
                    <Button
                        onClick={this.handleSubmit}
                        className={styles.formElement}
                    >
                        Submit
                    </Button>
                </Form>
                <div></div>
            </div>
        );
    }
}

export default connect(
    MapStateToProps,
    { authRequest }
)(LoginForm);
