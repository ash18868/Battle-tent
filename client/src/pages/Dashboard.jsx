import { useSelector } from 'react-redux'


export default function Dashboard() {
    const { user } = useSelector(s => s.auth)
    return (
        <div>
            <h2>Welcome, {user?.username}!</h2>
            <p>ELO: {user?.stats?.rating} — Wins: {user?.stats?.wins} — Losses: {user?.stats?.losses}</p>
            <p>Next: matchmaking, teams, and a Gen‑3 battle UI 🎮</p>
        </div>
    )
}