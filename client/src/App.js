import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <h1>Henry Food</h1>
         <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route exact={'/home'} component={Home}/>
         </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
