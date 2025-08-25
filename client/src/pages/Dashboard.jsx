import { useSelector } from 'react-redux'
import {
  Box, Card, CardContent, Typography, Avatar,
  Stack, Chip, Grid
} from '@mui/material'
import StatCard from '../components/dashboard/StatCard'
import LoadingBlock from '../components/dashboard/LoadingBlock'
import RecentActivity from '../components/dashboard/RecentActivity'
import ProfileCard from '../components/dashboard/ProfileCard'

export default function Dashboard() {
    const { user, status } = useSelector(s => s.auth)
    const displayName = user?.username || user?.email?.split('@')[0] || 'Trainer'

    return (
        <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Welcome block */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Avatar sx={{ width: 56, height: 56, fontSize: 24 }}>
                    {displayName.slice(0, 2).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 240 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Welcome back, {displayName} 👋
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Here’s a quick look at your Battle Tent stats.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Chip label="Ranked" color="primary" variant="outlined" />
                    <Chip label="Gen 3 Theme" variant="outlined" />
                </Stack>
                </CardContent>
            </Card>

            {/* Stats grid */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                {status === 'loading'
                    ? <LoadingBlock label="Matches" />
                    : <StatCard label="Matches" value={user?.stats?.matches ?? 0} hint="All-time" />}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                {status === 'loading'
                    ? <LoadingBlock label="Wins" />
                    : <StatCard label="Wins" value={user?.stats?.wins ?? 0} hint="Win count" />}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                {status === 'loading'
                    ? <LoadingBlock label="Streak" />
                    : <StatCard label="Streak" value={user?.stats?.streak ?? 0} hint="Current streak" />}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                {status === 'loading'
                    ? <LoadingBlock label="Rating" />
                    : <StatCard label="Rating" value={user?.stats?.elo ?? 1000} hint="Battle Tent ELO" />}
                </Grid>
            </Grid>

            {/* Bottom: recent + profile */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                <RecentActivity
                    status={status}
                    recent={user?.recent ?? [
                    { id: 1, title: 'Beat May with a clutch crit!', time: '2h ago' }
                    ]}
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <ProfileCard user={user} />
                </Grid>
            </Grid>
        </Box>
    )
}
