import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchMe } from '../features/authSlice'


export default function ProtectedRoute({ children }) {
    const { user, token, status } = useSelector(s => s.auth)
    const dispatch = useDispatch()

    
    useEffect(() => {
        if (!user && token && status === 'idle') { // if you don't have a user, but have a token and status is idle(initial setting), fetch user (fetchMe located in authSlice.js)
            dispatch(fetchMe())
        }
    }, [user, token, status, dispatch])


    if (!token) return <Navigate to="/login" replace />
    if (status === 'loading' && !user) return <p>Loading…</p>
    if (!user) return <Navigate to="/login" replace />
    return children // Show whatever is inside the ProtectedRoute
}