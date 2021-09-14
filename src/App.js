import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>

  );
}

export default App;
