import React from 'react';
import Main from "./Components/Main"
import Add from "./Components/Add"
import Edit from "./Components/Edit"
import Details from "./Components/Details"
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Links from "./Components/Links"



function App() {
  return (
    <div className="App">
      
      <Router>
        <Links />
        <Route exact path ="/" component={Main}/>
        <Route  path ="/add" component={Add}/>
        
        <Route path="/edit/:id" render={(props) => <Edit id={props.match.params.id} />} />
        <Route path="/details/:id" render={(props) => <Details id={props.match.params.id} />} />
      </Router>
      
    </div>
  );
}

export default App;
