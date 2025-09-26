import './App.css';
import Router from './app/router/Router';
import { routes } from './app/router/routes';

const App = () => {
  return (
    <Router routes={routes} />
  );
};

export default App;