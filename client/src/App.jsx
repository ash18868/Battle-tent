import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/authSlice'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'
import { AppBar, Toolbar, Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function App() {
  const { user } = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose
    navigate('/login', { replace: true })
  }

  const displayName = user?.username || 'Account'

  return (
    <div style={{ maxWidth: 640, margin: '32px auto', padding: 16 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Left: nav links */}
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            {user && (
              <>
                <Button component={RouterLink} to="/" variant="text">Home</Button>
              </>
            )}
            {!user && (
              <>
                <Button component={RouterLink} to="/login" variant="text">Login</Button>
                <Button component={RouterLink} to="/register" variant="text">Register</Button>
              </>
            )}
          </Box>

          {/* Right: user dropdown */}
          {user && (
            <>
              <Button
                onClick={handleMenuOpen}
                endIcon={<KeyboardArrowDown />}
                sx={{ textTransform: 'none' }}
              >
                <Typography fontWeight={600}>{displayName}</Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Protected Route follows rules found in ./components/ProtectedRoute*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}