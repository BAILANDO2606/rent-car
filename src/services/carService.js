// Імітація API для роботи з автомобілями
const CARS_DATA = {
	'New York': {
		Koenigsegg: {
			availability: [
				{ date: '2025-09-04', slots: ['10:00', '14:00', '18:00'] },
				{ date: '2025-09-05', slots: ['09:00', '13:00', '17:00'] },
			],
		},
		'Nissan GT-R': {
			availability: [
				{ date: '2025-09-04', slots: ['11:00', '15:00', '19:00'] },
				{ date: '2025-09-05', slots: ['10:00', '14:00', '18:00'] },
			],
		},
	},
	'Los Angeles': {
		'Rolls-Royce': {
			availability: [
				{ date: '2025-09-04', slots: ['09:00', '13:00', '17:00'] },
				{ date: '2025-09-05', slots: ['10:00', '14:00', '18:00'] },
			],
		},
		'CR-V': {
			availability: [
				{ date: '2025-09-04', slots: ['10:00', '14:00', '18:00'] },
				{ date: '2025-09-05', slots: ['11:00', '15:00', '19:00'] },
			],
		},
	},
}

export const getAvailableCities = () => {
	return Object.keys(CARS_DATA)
}

export const getAvailableCarsInCity = city => {
	if (!city || !CARS_DATA[city]) return []
	return Object.keys(CARS_DATA[city])
}

export const getCarAvailability = (city, carModel, date) => {
	if (!city || !carModel || !CARS_DATA[city] || !CARS_DATA[city][carModel]) {
		return []
	}

	const carData = CARS_DATA[city][carModel]
	const dateAvailability = carData.availability.find(a => a.date === date)
	return dateAvailability ? dateAvailability.slots : []
}

export const checkCarAvailability = (city, carModel, date, time) => {
	const availableSlots = getCarAvailability(city, carModel, date)
	return availableSlots.includes(time)
}

export const filterCars = ({
	type = null,
	capacity = null,
	priceRange = null,
	city = null,
}) => {
	let availableCars = []

	if (city) {
		availableCars = getAvailableCarsInCity(city)
	} else {
		Object.values(CARS_DATA).forEach(cityData => {
			availableCars = [...availableCars, ...Object.keys(cityData)]
		})
	}

	// Тут можна додати додаткову фільтрацію за типом, місткістю та ціною
	return availableCars
}
