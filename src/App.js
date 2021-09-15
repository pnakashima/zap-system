import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
