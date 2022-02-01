import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShadeLoader from './components/utilities/shadeLoader';
import { useSelector } from 'react-redux';

function App() {
  const loading = useSelector(state => state.loading)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/home/*' element={<DashboardPage/>} />
        </Routes>
        <ShadeLoader loading={loading.loading}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
