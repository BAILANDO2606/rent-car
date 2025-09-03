import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1'
const CITIES_API_URL = 'https://countriesnow.space/api/v0.1/countries'

export const fetchCountries = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/all`)
		// Сортуємо країни за назвою
		return response.data
			.map(country => ({
				name: country.name.common,
				code: country.cca2,
				flag: country.flags.svg,
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
	} catch (error) {
		console.error('Error fetching countries:', error)
		return []
	}
}

export const fetchCitiesForCountry = async country => {
	try {
		const response = await axios.post(`${CITIES_API_URL}/cities`, {
			country: country,
		})
		return response.data.data.sort()
	} catch (error) {
		console.error('Error fetching cities:', error)
		return []
	}
}
