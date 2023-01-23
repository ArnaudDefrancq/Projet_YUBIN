import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

import NewsFeed from './pages/NewsFeed';
import Profil from './pages/Profil';
import Error from './pages/Error';
import Signin from './pages/SignIn';

const App = () => {
  return (
<Router>
  <Routes>
    <Route path='/' element={<SignUp />} />
    <Route path='/connexion' element={<Signin />} />
    <Route path='/news-feed' element={<NewsFeed />} />
    <Route path='/profil' element={<Profil />} />
    <Route path='*' element={<Error />} />
  </Routes>
</Router>
  );
};

export default App;