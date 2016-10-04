import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      bioOpened: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderBio = this.renderBio.bind(this);
  }

  handleChange(event) {
    var passwordInput = event.target;
    var password = passwordInput.value;

    if (password.length < 8) {
      passwordInput.setCustomValidity(
        "Password has to be longer than 8 characters");
    } else {
      passwordInput.setCustomValidity("");
    }
  }

  handleClick() {
    this.setState({bioOpened: !this.state.bioOpened});
  }

  renderBio() {
    const className = this.state.bioOpened ? 'bio-toggle open' :
                                             'bio-toggle closed';

    if (this.state.bioOpened) {
      return (
        <div>
          <div className="form">
            <a href="#"
            onClick={this.handleClick}
            className={className}>
            <span id="arrow-right">→</span>
            <span id="arrow-down">↓</span>
             public information <i>(optional)</i>
             </a>
          </div>
          <div className="form">
            <label htmlFor="form-name">Birthday: </label>
            <input id="form-name" type="date" data-date-format="dd.mm.yyyy" placeholder="01.01.1990" autoComplete="bday" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form">
          <a onClick={this.handleClick} href="#" className={className}><span id="arrow-right">→</span><span id="arrow-down">↓</span> public information <i>(optional)</i></a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="register-form">
        <h1>Signup!</h1>
        <form>
          <div className="form">
            <label htmlFor="form-name">Name: </label>
            <input id="form-name" type="text" placeholder="Max Mustermann" autoComplete="name" autoFocus required/>
          </div>
          <div className="form">
            <label htmlFor="form-email">Email: </label>
            <input id="form-email" type="email" placeholder="max@mustermann.at" autoComplete="email" required/>
          </div>
          <div className="form">
            <label htmlFor="form-password">Password: </label>
            <input id="form-password" onChange={this.handleChange} type="password" autoComplete="new-password" placeholder="******" required/>
          </div>
          {this.renderBio()}
          <input type="submit" value="Go" />
        </form>
      </div>
    );
  }
}

export default Register;
