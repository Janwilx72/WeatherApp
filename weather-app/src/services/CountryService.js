import axios from "axios";

// Makes the API call to fetch an array of Objects containing country data

export const getCountries = async () => {
    const countryData = await axios.get("https://countriesnow.space/api/v0.1/countries");
    return countryData.data.data;
}