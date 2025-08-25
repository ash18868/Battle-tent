import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, status, error } = useSelector(s => s.auth)
    const [form, setForm] = useState({ emailOrUsername: '', password: '' })


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(form))
    }

    useEffect(() => {
        if(user)
            navigate('/', { replace: true }) // {replace: true} removes /login from backstack so user can't go back to login by pressing back arrow
    }, [user, navigate])


    return (
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h4">Log in</Typography>
            <TextField label="Email or Username" value={form.emailOrUsername} onChange={e=>setForm({...form, emailOrUsername:e.target.value})} required />
            <TextField label="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
            <Button type="submit" variant="contained" disabled={status==='loading'}>Login</Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    )
}