import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './pages/Header';
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
