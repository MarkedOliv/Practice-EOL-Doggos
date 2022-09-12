import LandingPage from './components/LandingPage/LandingPage';
import Dogs from './components/Dogs/Dogs';
import DogDetail from './components/DogDetail/DogDetail';
import AddDog from './components/AddDog/AddDog';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route exact path="/dogs">
          <Dogs />
        </Route>
        <Route exact path="/dogs/page/:num">
          <Dogs />
        </Route>
        <Route exact path="/dogs/:id">
          <DogDetail />
        </Route>
        <Route exact path="/add_dog">
          <AddDog />
        </Route>
        </Switch>
    </div>
  );
}

export default App;
