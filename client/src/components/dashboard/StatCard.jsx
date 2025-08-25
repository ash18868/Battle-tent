import { Card, CardContent, Typography } from '@mui/material'

export default function StatCard({ label, value, hint }) {
    return (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="overline" sx={{ opacity: 0.75 }}>{label}</Typography>
                <Typography variant="h4" sx={{ lineHeight: 1, mt: 0.5 }}>{value}</Typography>
                {hint && <Typography variant="caption" sx={{ opacity: 0.7 }}>{hint}</Typography>}
            </CardContent>
        </Card>
    )
}
