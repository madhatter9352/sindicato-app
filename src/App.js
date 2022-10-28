import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './modules/login/Login';
import { Home } from './modules/main/Home';
import { Register } from './modules/register/Register';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

function App() {
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
