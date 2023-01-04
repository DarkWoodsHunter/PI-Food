import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import CreateRecipe from "./Components/CreateRecipe"


function App() {
  return (
      <div className="App">
         <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route exact={'/home'} component={Home}/>
          <Route exact path={'/recipes'} component={CreateRecipe}/>
         </Switch>
      </div>
  );
}

export default App;
