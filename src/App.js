import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: "StylesPage"
    }
  }

  setVisible(componentName) {
    return (e) => {
      e.preventDefault()
      this.setState({
        visible: componentName
      })
    }
  }

  render() {
    let visiblePageComponent = () => { 
      if ( this.state.visible=="BeersPage" ) {
        return <BeersPage />
      } else if ( this.state.visible=="StylesPage" ) {
        return <StylesPage />
      } else  {
        return <LoginPage />
      }     
    }
  
    return (
      <div>
        <Header 
          beers={this.setVisible("BeersPage").bind(this)}
          styles={this.setVisible("StylesPage").bind(this)}
          login={this.setVisible("LoginPage").bind(this)}
        />
        <Container>
          {visiblePageComponent()}
        </Container>
      </div>
    );
  }
}

class Header extends React.Component {
  constructor() {
    super();
  }
  render(){
    return (
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">reactbeer</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.props.beers}>Beers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.props.styles}>Styles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.props.login}>Login</NavLink>
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
    return (
      <div>
        <h2>Styles</h2>
      </div>
    )
  }
}

class LoginPage extends React.Component {
  render(){
    return (
      <div>
        <h2>Login</h2>
      </div>
    )
  }
}

export default App;