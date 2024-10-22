import React from 'react';
import { Container, Typography } from '@mui/material';
import LocationList from './components/LocationList';

const App: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Lista de Localizaciones
            </Typography>
            <LocationList />
        </Container>
    );
};

export default App;
