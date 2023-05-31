import { render, fireEvent, screen } from '@testing-library/react';
import {LocationSearch} from "../../../src/components/search/LocationSearch"
import { WeatherContext } from "../../../src/context/WeatherContext";

jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

const mockContext = {
    countries: ['Country1', 'Country2'],
    getCountriesFromApi: jest.fn(),
    cities: ['City1', 'City2'],
    setCities: jest.fn(),
    setSelectedCity: jest.fn(),
    clickSearchWeather: jest.fn(),
    favourites: ['Country1'],
    addFavourite: jest.fn(),
    removeFavourite: jest.fn(),
};

describe('LocationSearch', () => {
    beforeEach(() => {
        render(
            <WeatherContext.Provider value={mockContext}>
                <LocationSearch isFavourite={false} />
            </WeatherContext.Provider>
        );
    });

    test('renders correctly', () => {
        expect(screen.getByText('Select your country')).toBeInTheDocument();
        expect(screen.getByText('Select your city')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Favourite')).toBeInTheDocument();
        expect(screen.getByText('View Favourites')).toBeInTheDocument();
    });

    test('renders correct number of countries and cities', () => {
        expect(screen.getAllByRole('option')).toHaveLength(6);
    });

    test('renders favourite correctly', () => {
        render(
            <WeatherContext.Provider value={mockContext}>
                <LocationSearch isFavourite={true} />
            </WeatherContext.Provider>
        );
        expect(screen.getByText('View all Countries')).toBeInTheDocument();
    });

    test('clicking Search triggers appropriate context function', () => {
        fireEvent.click(screen.getByText('Search'));
        expect(mockContext.clickSearchWeather).toHaveBeenCalledTimes(1);
    });

    test('clicking Favourite triggers appropriate context function', () => {
        fireEvent.click(screen.getByText('Favourite'));
        expect(mockContext.addFavourite).toHaveBeenCalledTimes(1);
    });

    test('clicking View Favourites triggers navigation', () => {
        fireEvent.click(screen.getByText('View Favourites'));
        // Expect navigate to be called with the correct parameter
        expect(useNavigate).toHaveBeenCalledWith('/favourites');
    });

    // Further __tests__ can be added to cover other functionalities
});
