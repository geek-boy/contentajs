import React, { Component, Fragment } from 'react';
// Import the essential components from react-native
// import {
//   StyleSheet, Button, View, SafeAreaView,
//   Text, Alert
// } from 'react-native';

// import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

// import "@fontsource/roboto"; 
import logo from './logo.svg';
import './App.css';
import Webpages from './webpages';
import MainMenu from './Components/main_menu';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        // console.log(res.json())
        this.setState({ data: res.express })
      })
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    // const response = await fetch('/api/menus');
    const response = await fetch('/hello');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  callAPIMenu = async () => {
    const response = await fetch('/api/menus');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  
  render() {
    return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Contenta</h1>
        </header>
        <MainMenu />
        <div>
          <Webpages />
        </div>
        <div className="App-body">
          <ul>
            <li><a href="/api/recipes">Recipes</a></li>
            <li><a href="/healthcheck">Healthcheck</a></li>
            <li><a href="/hello">Hello</a></li>
          </ul>

          {/* <Button onClick={() => alert('Clicked')} variant="contained" color="primary">
            Hello World
          </Button> */}
        <Button variant="contained" color="primary" onClick={
          () => {
            this.callAPIMenu()
            .then(res => {
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+'_'+time;
            
              this.setState({ data:'Menu id 0 ' + res.data[0]['id'] + ' at ' + dateTime })
            })
            .catch(err => console.log(err));
            }
          }
          >Get Menus</Button>
        </div>
      </div>
      <div className="App-footer">
        <p className="App-intro">{this.state.data}</p>
      </div>
      </Fragment>

    );
  }
}

export default App;