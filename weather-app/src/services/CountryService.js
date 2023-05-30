import axios from "axios";


export const getCountries = async () => {
    const countryData = await axios.get("https://countriesnow.space/api/v0.1/countries");
    return countryData.data.data;
}