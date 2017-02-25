import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Table,
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Alert
} from 'reactstrap';

import ApiService from './ApiService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: "StylesPage",
      styles: [],
      username: '',
      token: ''
    }
  }

  setStyles(styles) {
    this.setState({
      styles: styles
    })
  }

  componentWillMount() {
    ApiService.instance().styles()
     .then( results => this.setStyles(results)) 
  } 

  setVisible(componentName) {
    return (e) => {
      e.preventDefault()
      this.setState({
        visible: componentName
      })
    }
  }

  setTokenAndUser(token, username) {
    ApiService.instance().setToken(token)
    this.setState({
      token: token,
      username: username,
      visible: 'WelcomePage'
    })   
  }

  addStyle(style) {
    this.state.styles.push(style)
    this.setState({
      styles: this.state.styles
    })      
  }

  render() {
    let visiblePageComponent = () => { 
      console.log(this.state.visible)
      if ( this.state.visible=="BeersPage" ) {
        return <BeersPage />
      } else if ( this.state.visible=="StylesPage" ) {
        return <StylesPage 
                styles={this.state.styles} 
                addStyle={this.addStyle.bind(this)}
                token={this.state.token}/>
      } else if ( this.state.visible=="LoginPage" )  {
        return <LoginPage setTokenAndUser={this.setTokenAndUser.bind(this)}/>
      } else {
        return <WelcomePage username={this.state.username} />
      }    
    }
  
    return (
      <div>
        <Header 
          showBeers={this.setVisible("BeersPage").bind(this)}
          showStyles={this.setVisible("StylesPage").bind(this)}
          showLogin={this.setVisible("LoginPage").bind(this)}
        />
        <Container>
          {visiblePageComponent()}
        </Container>
      </div>
    );
  }
}

class Header extends React.Component {
  render(){
    return (
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">reactbeer</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.props.showBeers}>Beers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.props.showStyles}>Styles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.props.showLogin}>Login</NavLink>
              </NavItem>              
            </Nav>
          </Collapse>
        </Navbar>      
    )
  }
}

class BeersPage extends React.Component {
  render(){
    return (
      <div>
        <h2>Beers</h2>
      </div>
    )
  }
}

class StylesPage extends React.Component {
  render(){
    let styles = this.props.styles
    return (
      <div>
        <h2>Styles</h2>  
        <NewBeerForm addStyle={this.props.addStyle} token={this.props.token}/>
        <Table striped>
          <thead>
            <tr>
              <th>name</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            { styles.map(s => <Style key={s.id} style={s}/> ) }    
          </tbody>
        </Table>  
      </div>
    )
  }
}

const Style = (props) => 
  <tr>
    <td>{props.style.name}</td>
    <td>{props.style.description}</td>
  </tr> 

class NewBeerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible
    })
  }

  createStyle(e) {
    e.preventDefault()
    let form = e.target;

    let data = {
      name: form.elements['name'].value,
      description: form.elements['description'].value
    }

    ApiService.instance().createStyle(data)
     .then( response => {
        console.log(response)
        this.toggleVisible()
        this.props.addStyle(response)
     }).catch( error => {
       console.log(error)
     }); 
  }

  render(){
    let visibleComponent = () => { 
      if ( this.state.visible ) {
        return (
          <Form onSubmit={this.createStyle.bind(this)}>
           <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description"  />
          </FormGroup>
          <Button color="primary">Create style</Button>
          <Button color="warning" onClick={this.toggleVisible.bind(this)}>Cancel</Button>
        </Form>
        )
      } else {
        return <Button color="primary" onClick={this.toggleVisible.bind(this)}>Create new style</Button>
      }    
    }

    return (
      <div>
        {visibleComponent()}
      </div>
    )
  }
}

class LoginPage extends React.Component {
  login(e) {
    e.preventDefault()
    let form = e.target;

    let data = {
      username: form.elements['username'].value,
      password: form.elements['password'].value
    }

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

const WelcomePage = (props) => 
  <Alert color="success">
    Welcome back {props.username}
  </Alert>     

export default App;