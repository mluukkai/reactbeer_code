import React, { Component } from 'react';

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
        <h1>Reactbeer</h1>
          <Header 
            beers={this.setVisible("BeersPage").bind(this)}
            styles={this.setVisible("StylesPage").bind(this)}
            login={this.setVisible("LoginPage").bind(this)}
          />
          {visiblePageComponent()}
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
      <div>
        <a href="#" onClick={this.props.beers}>Beers</a>
        <a href="#" onClick={this.props.styles}>Styles</a>
        <a href="#" onClick={this.props.login}>Login</a>
      </div>
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