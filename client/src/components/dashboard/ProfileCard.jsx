import {
    Card, CardHeader, Divider, Box, LinearProgress,
    List, ListItem, ListItemText
} from '@mui/material'

export default function RecentActivity({ status, recent }) {
    return (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardHeader title="Recent Activity" subheader="Your latest 5 events" />
            <Divider />
            {status === 'loading' ? (
                <Box sx={{ p: 2 }}>
                <LinearProgress />
                </Box>
            ) : (
                <List>
                    {(recent ?? []).map(item => (
                        <ListItem key={item.id} divider disableGutters>
                            <ListItemText
                                primary={item.title}
                                secondary={item.time}
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Card>
    )
}
