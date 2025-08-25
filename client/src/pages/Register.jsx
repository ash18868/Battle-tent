import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/authSlice'
import { TextField, Button, Typography, Box } from '@mui/material'


export default function Register() {
    const dispatch = useDispatch()
    const { status, error } = useSelector(s => s.auth) // pulls {status, error} out of state.auth
    const [form, setForm] = useState({ username: '', email: '', password: '' }) // creates local form state and its setter


    const onSubmit = (e) => {
        e.preventDefault() // stops the form from triggering a full page reload
        dispatch(registerUser(form))
    }


    return (
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h4">Create an account</Typography>
            <TextField label="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required /> { /* onChange immediately updates the form state */ }
            <TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <TextField label="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
            <Button type="submit" variant="contained" disabled={status==='loading'}>Register</Button> {/* disabled={status==='loading'} Disabled if status is loading */}
            {error && <Typography color="error">{error}</Typography>} { /* if error exists, show the error */ }
        </Box>
    )
}