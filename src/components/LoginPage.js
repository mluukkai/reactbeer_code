import React from 'react';
import {
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input
} from 'reactstrap';

import ApiService from '../services/ApiService';

class LoginPage extends React.Component {
  login(e) {
    e.preventDefault()
    let form = e.target;

    let data = {
      username: form.elements['username'].value,
      password: form.elements['password'].value
    }

    data = { username: "mluukkai", password: "Mluukkai1"}

    ApiService.instance().login(data)
     .then( response => {
        console.log(response)
        window.r = response
        form.elements['username'].value = ""
        form.elements['password'].value = ""   
        this.props.setTokenAndUser(response.token, data.username)
     }).catch( error => {
       console.log(error)
     });   
  }

  render(){
    return (
      <div>
        <Form onSubmit={this.login.bind(this)}>
          <FormGroup>
            <Label for="username">username</Label>
            <Input type="text" name="username" id="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">password</Label>
            <Input type="password" name="password" id="password" />
          </FormGroup>
          <Button color="primary">Login</Button>
        </Form>
      </div>
    )
  }
}    

export default LoginPage;