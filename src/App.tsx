import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import OAuthCallbackHandler from './components/OAuthCallbackHandler';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/oauth2/redirect" element={<OAuthCallbackHandler />} />
    </Routes>
  );
};

export default App;
