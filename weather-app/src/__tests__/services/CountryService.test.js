import axios from 'axios';
import { getCountries } from "../../services/CountryService";

// Mock axios
jest.mock('axios');

describe('getCountries', () => {
    it('fetches countries from the API and returns country data', async () => {
        // Setup
        const countries = [{ country: 'Country1' }, { country: 'Country2' }];
        const resp = { data: { data: countries } };
        axios.get.mockResolvedValue(resp);

        // Invocation
        const result = await getCountries();
        expect(result).toEqual(countries);

        // Check that axios made the call to the correct url
        expect(axios.get).toHaveBeenCalledWith('https://countriesnow.space/api/v0.1/countries');
    });
});