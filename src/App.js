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
  Table
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: "StylesPage",
      styles: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/styles.json')
     .then( response => response.json() )
     .then( results => {
        console.log(results)
        this.setState({
          styles: results
        })
     })
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
        return <StylesPage styles={this.state.styles}/>
      } else  {
        return <LoginPage />
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