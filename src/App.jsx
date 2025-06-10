import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IQACDashboard from './pages/IQACDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import EventRequestForm from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/configureStore';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<EventRequestForm />} />
            <Route path='iqac' element={<IQACDashboard />} />  {/* ✅ Fixed here */}
            <Route path='admin' element={<PrincipalDashboard />} />
          </Route>
        </Routes>

      </Router>
    </Provider>
  );
};

export default App;