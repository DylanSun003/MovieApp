import { method } from "lodash";
import React, { Component } from "react";
import InputForm from "../common/inputForm";
import { apiURL } from "../../config.json";
require("../css/loginForm.css");

const style = {
  loginForm: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
class LoginForm extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleEnterForm = ({ currentTarget: input }) => {
    const { account, errors } = this.state;
    let errorMessage = this.validateFormWithErrorMessage(
      input.name,
      input.value
    );
    let errorsData = { ...errors };
    if (errorMessage) {
      errorsData[input.name] = input.value;
    } else delete errorsData[input.name];

    const accountData = { ...account };
    accountData[input.name] = input.value;

    this.setState({ errors: errorsData });
    this.setState({ account: accountData });
  };

  validateFormWithErrorMessage = (name, value) => {
    let errorMessage;
    if (value.length === 0) {
      errorMessage = name + " is required";
      return errorMessage;
    }
    if (name === "email") {
      if (!value.includes("@")) {
        errorMessage = name + " should contain @";
        return errorMessage;
      }
    }
  };

  render() {
    let account = this.state.account;
    return (
      <div className="container" style={{ marginTop: "30px" }}>
        <form onSubmit={this.handleSubmit} style={style.loginForm}>
          <h2 style={{ margin: "30px" }}>Welcome To DMovie.com</h2>
          <InputForm
            formName="email"
            type="email"
            onChange={this.handleEnterForm}
            name="email"
            value={account.email}
            errorsStatus={this.state.errors}
            validateFormWithErrorMessage={this.validateFormWithErrorMessage(
              "email",
              account.email
            )}
          />
          <InputForm
            formName="password"
            type="password"
            onChange={this.handleEnterForm}
            name="password"
            value={account.password}
            errorsStatus={this.state.errors}
            validateFormWithErrorMessage={this.validateFormWithErrorMessage(
              "password",
              account.password
            )}
          />
          <button
            type="submit"
            className="btn--login btn-primary"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  submitForm = async () => {
    let data = {
      email: this.state.account.email,
      password: this.state.account.password,
    };
    let loginResult = await fetch(`${apiURL}/authos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data);
    if (loginResult.status === 200) this.props.history.push("/customer/movie");
    else {
      window.alert("Invalid email/password!");
      this.props.history.go("/login");
    }
  };
}

export default LoginForm;
