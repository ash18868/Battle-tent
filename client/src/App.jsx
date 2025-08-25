import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/authSlice'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  const { user } = useSelector(s => s.auth)
  const dispatch = useDispatch()


  return (
    <div style={{ maxWidth: 640, margin: '32px auto', padding: 16 }}>
      <header style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {user && (<button onClick={() => dispatch(logout())}>Logout</button>)} {/* By && with user, false just makes the button not show up. Therefore, only logout if logged in */}
      </header>


      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Protected Route follows rules found in ./components/ProtectedRoute*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}