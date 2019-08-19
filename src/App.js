import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home/index';
import About from './pages/about/index';
import Consult from './pages/consult/index';
//import Favorites from './pages/about/index';
import NoMatchPage from './pages/404/index';

import NavBar from './containers/CustomNavBar';
import Footer from './containers/CustomFooter';

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/consult/:type/:id" component={Consult} />
          <Route component={NoMatchPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;


/*
<Route path="/about" component={About} />
<Route path="/favorites" component={Favorites} />
<Route path="/MoviesSeries" component={MoviesSeries} />
<Route component={NoMatchPage} />
*/