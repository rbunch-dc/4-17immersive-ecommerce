import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './containers/NavBar';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
    	<Router>
    		<div className="App">
    			<NavBar />
    			<div className="container main">
    				<Route exact path="/" component={Home} />
    				<Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
    			</div>
    		</div>
    	</Router>
    );
  }
}

export default App;
