const BASE_URL = "https://date.nager.at/api/v3";

export default {
  async GetHolidays(year, countryCode) {
    const response = await fetch(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    return response.json();
  },

  async GetCountryCodes() {
    const response = await fetch(`${BASE_URL}/AvailableCountries`);
    return response.json();
  },
};
