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
  FormText
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
                addStyle={this.addStyle.bind(this)}/>
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
        <NewBeerForm addStyle={this.props.addStyle}/>
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

    let request = {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    let status = (response) => { 
      if (response.status >= 200 && response.status < 300) {  
        return Promise.resolve(response)  
      } else {  
        return response.json().then( data => Promise.reject(data) ) 
      }  
    }

    fetch('http://localhost:3001/styles.json', request)
     .then( status )
     .then( response => { response.json } )
     .then( response => {
        console.log(response)
        this.toggleVisible()
        this.props.addStyle(response)
     }).catch(function(error) {
       console.log(error)
     }); 
  }

  render(){
    let visibleComponent = () => { 
      if ( this.state.visible ) {
        return (
          <Form onSubmit={this.createStyle.bind(this)}>
           <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="name" id="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Description</Label>
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
  render(){
    return (
      <div>
        <h2>Login</h2>
      </div>
    )
  }
}

export default App;