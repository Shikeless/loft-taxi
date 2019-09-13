import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {  getIsAuthorized, login } from '../../modules/User';

const fields = [
    {
      id: 'email',
      label: 'Почта',
      type: 'text'
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password'
    }
  ]
  
class LoginForm extends React.Component {
    state = {
        values: {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [event.target.name]: event.target.value }
        });
    };

    handleSubmit = () => {
        const { login } = this.props;
        login();
        console.log(this.props.isAuthorized)
      };

    render () {
        const { values } = this.state;
        const { isAuthorized } = this.state;
        if (isAuthorized) {
            return (<Redirect to="/mapBox"/>)
        } else {
            return ( 
                <React.Fragment >
                    <form>
                        {fields.map(({ id, label, type }) => (
                            <React.Fragment key={id}> 
                                <label htmlFor={id}>
                                    <span>{label}</span>
                                </label>
                                <input
                                    id={id}
                                    type={type}
                                    name={id}
                                    value={values[id]}
                                    onChange={this.handleChange}
                                />
                            </React.Fragment>
                        ))}
                    </form>
            
                    <button onClick={this.handleSubmit}>Войти</button>
                </React.Fragment>
            )
        }
    }
}

export default connect(
    state => ({ isAuthorized: getIsAuthorized(state) }),
    { login }
)(LoginForm);