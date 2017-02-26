import React from 'react';
import {
  Table,
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input
} from 'reactstrap';

import ApiService from '../services/ApiService';

class StylesPage extends React.Component {
  render(){
    let formIfLogged = () => {
      if (this.props.username.length>0) {
        return <NewStyleForm addStyle={this.props.addStyle} token={this.props.token}/>  
      }    
    }

    let styles = this.props.styles
    return (
      <div>
        <h2>Styles</h2> 
        {formIfLogged()} 
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

class NewStyleForm extends React.Component {
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

export default StylesPage;