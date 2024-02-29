import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home' 
import Navbar from './components/NavBar'
import Signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />} 
              />
              <Route
                path="/signput"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
