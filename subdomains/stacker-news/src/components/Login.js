import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    // Swtich between Login and Signup
    login: true,
    email: "",
    password: "",
    name: ""
  };

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "login" : "sign up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              type="text"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Your name"
            />
          )}
          <input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="your 'email address' (any string will work)"
          />
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? "login" : "create account"}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
