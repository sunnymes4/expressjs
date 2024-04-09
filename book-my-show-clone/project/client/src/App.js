
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';

function App() {
  const loading = useSelector((state) => state.loader.loadingState);
  const user = useSelector((state) => state.user.user);
  let loader;

  console.log(user);
  console.log(loading);

  return (
    <div>
      {loader && (
        <div className='loader-container'>
          <div className='loader'>Loading...</div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
