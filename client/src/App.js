import './App.css';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import CreateRecipe from "./Components/CreateRecipe";
import Details from "./Components/Details"

function App() {
  return (
      <div className="App">
         <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route exact path={'/home'} component={Home}/>
          <Route exact path={'/home/recipes'} component={CreateRecipe}/>
          <Route exact path={'/home/:id'} component={Details}/>
         </Switch>
      </div>
  );
}
export default App;
