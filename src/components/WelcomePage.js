import React from 'react';
import { Alert } from 'reactstrap';

const WelcomePage = (props) => 
  <Alert color="success">
    Welcome back {props.username}
  </Alert>   

export default WelcomePage;