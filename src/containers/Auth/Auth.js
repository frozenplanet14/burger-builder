import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actionTypes from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

  state = {
    isSignIn: false,
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email Address'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: ''
      },
    }
  }

  inputChangeHandler = (name, value) => {
    this.setState((prev) => {
      const updatedForm = {
        ...prev.controls
      }
      updatedForm[name] = {
        ...updatedForm[name],
        value
      }
      return {controls: updatedForm};
    });
  }

  toggle = () => {
    this.setState((prev) => ({isSignIn: !prev.isSignIn}))
  }

  authHandler = (evt) => {
    evt.preventDefault();
    const {email, password} = this.state.controls;
    this.props.submitForm(email.value, password.value, this.state.isSignIn);
  }

  render() {
    return (
      <div className={classes.Auth}>
        {
          this.props.loading
            ? <Spinner />
            : (
              <>
                <form onSubmit={this.authHandler}>
                  {
                    Object.keys(this.state.controls).map(name => (
                      <Input key={name} name="name"
                        value={this.state.controls[name].value}
                        elementConfig={this.state.controls[name].elementConfig}
                        elementType={this.state.controls[name].elementType}
                        changed={(evt) => this.inputChangeHandler(name, evt.target.value)}/>
                    ))
                  }
                  <Button type="Success">SUBMIT</Button>
                </form>
                <Button type="Danger" clicked={this.toggle}>Switch to {
                  this.state.isSignIn ? 'SIGN UP' : 'SIGN IN'
                }</Button>
              </>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      submitForm: (email, password, isSignIn) => dispatch(actionTypes.authenticate(email, password, isSignIn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
