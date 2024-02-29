import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home' 
import Main from './pages/Main' 
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />} 
              />
              <Route
                path="/login"
                element={<Login />} 
              />
              <Route
                path="/signup"
                element={<Signup />} 
              />
              <Route
                path="/"
                element={<Main />} 
              />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
