import React, { useEffect, useState } from 'react';
import { fetchLocations } from '../services/api';
import {
    Typography, CircularProgress, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Modal,
    Box
} from '@mui/material';

interface Location {
    code: string;
    name: string;
    image: string;
    created_at: string;
}

const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [orderBy, setOrderBy] = useState<keyof Location>('code');  // Columna por la cual ordenar
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

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

    const handleOpen = (image: string) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    const handleRequestSort = (property: keyof Location) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedLocations = locations.sort((a, b) => {
        if (orderDirection === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        }
        return a[orderBy] > b[orderBy] ? -1 : 1;
    });

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'code'}
                                    direction={orderBy === 'code' ? orderDirection : 'asc'}
                                    onClick={() => handleRequestSort('code')}>ID</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? orderDirection : 'asc'}
                                    onClick={() => handleRequestSort('name')}>Nombre Sede</TableSortLabel>
                            </TableCell>
                            <TableCell>Imagen</TableCell>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'created_at'}
                                    direction={orderBy === 'created_at' ? orderDirection : 'asc'}
                                    onClick={() => handleRequestSort('created_at')}>Fecha de Creación</TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map((location) => (
                            <TableRow key={location.code}>
                                <TableCell>{location.code}</TableCell>
                                <TableCell>{location.name}</TableCell>
                                <TableCell>
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        style={{ cursor: 'pointer', width: '50px', height: 'auto' }}
                                        onClick={() => handleOpen(location.image)}
                                    />
                                </TableCell>
                                <TableCell>{location.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />}
                </Box>
            </Modal>
        </>
    );
};

export default LocationList;