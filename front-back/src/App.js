import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home'
import FormRegister from './components/FormRegister'
import ClientiComponent from './components/ClientiComponent';
import FormR from './components/FormR';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/login' element={<FormRegister />} />
        <Route path='/clienti' element={<ClientiComponent />} />
        <Route path='/register' element ={<FormR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
