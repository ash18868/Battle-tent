import { Card, CardHeader, Box, Stack, LinearProgress } from '@mui/material'

export default function LoadingBlock({ label }) {
    return (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardHeader title={label} />
            <LinearProgress sx={{ mx: 2, mb: 2 }} />
            <Box sx={{ p: 2, pt: 0 }}>
                <Stack spacing={1.5}>
                    <Box sx={{ height: 12, bgcolor: 'action.hover', borderRadius: 1 }} />
                    <Box sx={{ height: 12, bgcolor: 'action.hover', borderRadius: 1, width: '85%' }} />
                    <Box sx={{ height: 12, bgcolor: 'action.hover', borderRadius: 1, width: '60%' }} />
                </Stack>
            </Box>
        </Card>
    )
}
