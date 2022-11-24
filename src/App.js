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
import { ContributionDeposit } from './pages/contributionDeposit/contributionDeposit';
import { DepositFinance } from './pages/depositFinance/DepositFinance';
import { Union_section } from './pages/union_section/UnionSection';
import { Initial_state } from './pages/initial_state/Initial_state';
import { Affiliate } from './pages/affiliate/Affiliate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAreaState } from './store/reducers/area';
import { ServerError } from './components/errors/ServerError';
import { clearError } from './store/reducers/auth';
import { createBrowserHistory } from 'history';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { Usuario } from './pages/usuario/Usuario';
import { Acta } from './pages/acta/Acta';
import { ActaForm } from './pages/acta/ActaForm';
import { ActaFormStep2 } from './pages/acta/ActaFormStep2';
import { ActFormStep3 } from './pages/acta/ActFormStep3';

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
              <Route path='/section_union' element={<Union_section />} />
              <Route path='/contribution_deposit' element={<ContributionDeposit />} />
              <Route path='/finanzas' element={<DepositFinance />} />
              <Route path='/affiliate' element={<Affiliate />} />
              <Route path='/usuario' element={<Usuario />} />
              <Route path='/acta' element={<Acta />} />
              <Route path='/create-acta' element={<ActaForm />} />
              <Route path='/acta-step2/:actId' element={<ActaFormStep2 />} />
              <Route path='/acta-step3/:actId' element={<ActFormStep3 />} />
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
