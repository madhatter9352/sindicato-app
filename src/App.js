import {Route, Routes } from 'react-router-dom';
import { Donation } from './pages/donation/Donation';
import { Area } from './pages/area/Area';
import { Login } from './modules/login/Login';
import { Home } from './modules/main/Home';
import { Register } from './modules/register/Register';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';
import { ToastContainer } from 'react-toastify';
import { ModalContainer } from './components/modal/ModalContainer';
import { SeccionSindical } from './pages/seccion-sindical/SeccionSindical';
import { Initial_state } from './pages/initial_state/Initial_state';
import { Affiliate } from './pages/affiliate/Affiliate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { clearDonotionState } from './store/reducers/donation';
import { clearAreaState } from './store/reducers/area';
import { ServerError } from './components/errors/ServerError';
import { clearError } from './store/reducers/auth';
import { createBrowserHistory } from 'history';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { Usuario } from './pages/usuario/Usuario';

export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAreaState());
    // dispatch(clearDonotionState());
    dispatch(clearError());
  }, [dispatch]);
  
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path='/server-error' element={<PublicRoute />} >
          <Route path='/server-error' element={<ServerError />} />
        </Route>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />}>
              <Route path='/donation' element={<Donation />} />
              <Route path='/area' element={<Area />} />
              <Route path='/seccion-sindical' element={<SeccionSindical />} />
              <Route path='/initial_state' element={<Initial_state />} />
              <Route path='/affiliate' element={<Affiliate />} />
              <Route path='/usuario' element={<Usuario />} />
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
    </HistoryRouter>
  );
}

export default App;
