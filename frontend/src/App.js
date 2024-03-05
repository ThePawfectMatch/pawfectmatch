import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Listing from './pages/Listing'

function App() {
  const { user } = useAuthContext()
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
              element={!user ? <Login /> : <Navigate to="/main" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/main" />} 
            />
            <Route 
              path="/main"
              element={user ? <Main /> : <Navigate to="/" />}
            />
            <Route
              path="/listing"
              element={user ? <Listing /> : <Navigate to="\main" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
