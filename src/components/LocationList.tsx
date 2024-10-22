import React, { useEffect, useState } from 'react';
import { fetchLocations } from '../services/api';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            const data = await fetchLocations();
            setLocations(data);
        } catch (err) {
            console.error(err);
            setError('Error listing Locations.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <List>
            {locations.map((location) => (
                <ListItem key={location.code}>
                    <ListItemText primary={location.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default LocationList;