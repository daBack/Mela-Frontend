import React from "react";
import { Link, Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  encodeFormData = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
  }

  handleSubmit(e) {
    e.preventDefault();

    var formData = {
      username: this.state.username,
      password: this.state.password,
    }
    const dataToSend = this.encodeFormData(formData);

    (async () => {
      let response = await fetch("http://localhost:1337/user/login", {
        method: "POST",
        body: dataToSend,
        // credentials: 'include',
        headers: {
          'Access-Controll-Allow-origin': '*',
          'Accept': '*/*',
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
      
      let data = await response.json();
      console.log(data);      
      if (response.status == 200) {
        // console.log("mah nm");
        // console.log(data.data.user.username);
        sessionStorage.setItem('username', data.data.user.username)
        sessionStorage.setItem('token', data.data.token)
        this.setState({
          redirect: true,
        });
      }
    })()
    
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          placeholder="Username"
          className="login-input"
          type="text"
          value={this.state.username}
          onChange={e => this.handleChange("username", e)}
        />
        <input
          placeholder="Password"
          className="login-input"
          type="password"
          value={this.state.password}
          onChange={e => this.handleChange("password", e)}
        />
        <Link className="register" to="/register">
          No account? register here
        </Link>
        { this.state.redirect && 
          <Redirect to='/home'/>
        }
        <input className="button" type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;