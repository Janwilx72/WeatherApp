import { getCities } from "../../services/CityService";

describe('getCities', () => {
    it('returns the cities from the country object', () => {
        const country = { cities: ['City1', 'City2', 'City3'] };
        const result = getCities(country);
        expect(result).toEqual(['City1', 'City2', 'City3']);
    });

    it('returns undefined when country is null or undefined', () => {
        const result = getCities(null);
        expect(result).toBeUndefined();
    });

    it('returns undefined when country does not have cities', () => {
        const country = { };
        const result = getCities(country);
        expect(result).toBeUndefined();
    });
});