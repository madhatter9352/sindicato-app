import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Area } from './pages/area/Area';
import { Login } from './modules/login/Login';
import { Home } from './modules/main/Home';
import { Register } from './modules/register/Register';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';
import { ToastContainer } from 'react-toastify';
import { ModalContainer } from './components/modal/ModalContainer';
import { SeccionSindical } from './pages/seccion-sindical/SeccionSindical';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAreaState } from './store/reducers/area';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAreaState());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />}>
              <Route path='/area' element={<Area />} />
              <Route path='/seccion-sindical' element={<SeccionSindical />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <ModalContainer />
    </BrowserRouter>
  );
}

export default App;
