import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Sidebar from './components/Sidebar';
import Logs from './pages/Logs';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Leadgeneration from './pages/Leadgeneration.jsx';
import Appointment from './pages/Appointment.jsx';
import Navbar from './components/Navbar.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/Notfound.jsx';
import Reports from './pages/Reports.jsx';
import General from './pages/General.jsx';
import CreateUserForm from './components/Createnewuser.jsx';
import Configcode from './components/Configcode.jsx';
import Policy from './components/Policy.jsx';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const validRoutes = ['/', '/dashboard', '/log', '/analytics','/reports', '/lead-gen', '/appointment', '/settings','/general','/createuser','/configcode','/policy'];
  const isValidRoute = validRoutes.includes(location.pathname);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme !== null ? savedTheme === 'true' : true;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const token = localStorage.getItem('authToken');

  const PrivateRoute = ({ element }) => {
    return token ? element : <Navigate to="/" replace />;
  };

  if (isLoginPage && token) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoginPage) {
    return <Login />;
  }

  return (
    <div className={`container-fluid position-relative d-flex p-0 ${isDarkMode ? 'black-mode' : 'white-mode'}`}>
      {isValidRoute && <Sidebar isDarkMode={isDarkMode} />}
      <div className="content" style={isValidRoute ? {} : { margin: '0', width: '100%' }}>
        {isValidRoute && <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
          <Route path='/log' element={<PrivateRoute element={<Logs />} />} />
          <Route path='/analytics' element={<PrivateRoute element={<Analytics />} />} />
          <Route path='/lead-gen' element={<PrivateRoute element={<Leadgeneration />} />} />
          <Route path='/appointment' element={<PrivateRoute element={<Appointment />} />} />
          <Route path='/settings' element={<PrivateRoute element={<Settings />} />} />
          <Route path='/reports' element={<PrivateRoute element={<Reports/> } />} />
          <Route path='/general' element={<PrivateRoute element={ <General/> } />} />
          <Route path='/createuser' element={<PrivateRoute element={<CreateUserForm/>} />} />
          <Route path='/configcode' element={<PrivateRoute element={<Configcode/>} />} />
          <Route path='/policy' element={<PrivateRoute element={ <Policy/> } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;