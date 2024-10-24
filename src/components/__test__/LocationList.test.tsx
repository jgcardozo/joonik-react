import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LocationList from '../LocationList';
import { fetchLocations } from '../../services/api';


jest.mock('../../services/api', () => ({
    fetchLocations: jest.fn(),
}));

describe('LocationList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });



    test('should render loading indicator at the begining', () => {
        (fetchLocations as jest.Mock).mockResolvedValueOnce([]);
        render(<LocationList />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });



    test('should render locations when data is fetched', async () => {
        const locations = [
            { code: '1', name: 'South Bellestad', image: 'https://picsum.photos/200/300', created_at: '11-03-2024' },
            { code: '2', name: 'East Pattiefort', image: 'https://picsum.photos/200/300', created_at: '12-03-2024' },
        ];
        (fetchLocations as jest.Mock).mockResolvedValueOnce(locations);
        render(<LocationList />);
        await waitFor(() => expect(screen.getByText('Location 1')).toBeInTheDocument());
        expect(screen.getByText('Location 2')).toBeInTheDocument();
    });



    test('should display error message when fetch locations fails', async () => {
        (fetchLocations as jest.Mock).mockRejectedValueOnce({
            response: { data: { message: 'Error de API' } },
        });
        render(<LocationList />);
        await waitFor(() => expect(screen.getByText('Error de API')).toBeInTheDocument());
    });


});
