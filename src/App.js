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
  Button, 
} from 'reactstrap';

import ApiService from './services/ApiService';
import WelcomePage from  './components/WelcomePage';
import BeersPage from  './components/BeersPage';
import StylesPage from  './components/StylesPage';
import LoginPage from  './components/LoginPage';

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

  logout(){
    this.setState({
      token: '',
      username: ''
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
      if ( this.state.visible=="BeersPage" ) {
        return <BeersPage />
      } else if ( this.state.visible=="StylesPage" ) {
        return <StylesPage 
                styles={this.state.styles} 
                addStyle={this.addStyle.bind(this)}
                username={this.state.username}/>
      } else if ( this.state.visible=="LoginPage" )  {
        return <LoginPage setTokenAndUser={this.setTokenAndUser.bind(this)}/>
      } else if ( this.state.visible=="WelcomePage" )  {
        return <WelcomePage username={this.state.username} />
      }    
    }
  
    return (
      <div>
        <Header 
          showBeers={this.setVisible("BeersPage").bind(this)}
          showStyles={this.setVisible("StylesPage").bind(this)}
          showLogin={this.setVisible("LoginPage").bind(this)}
          logout={this.logout.bind(this)}
          username={this.state.username}
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
    let loginLogout = () => {
      console.log(this.props)
      if ( this.props.username=='' ) {
        return <NavLink href="#" onClick={this.props.showLogin}>Login</NavLink>
      } else {
        return <NavLink href="#" onClick={this.props.logout}>Logout</NavLink>  
      }  
    } 
      
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
                {loginLogout()}
              </NavItem>              
            </Nav>
          </Collapse>
        </Navbar>      
    )
  }
}

export default App;