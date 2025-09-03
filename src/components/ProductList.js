import React from 'react'
import ProductCard from './ProductCard'
import './ProductList.css'

// Статичні дані автомобілів
const CARS_DATA = [
	{
		id: 1,
		name: 'Koenigsegg',
		type: 'Sport',
		image: '/images/koenigsegg.png',
		price: 99,
		fuelCapacity: 80,
		transmission: 'Manual',
		capacity: 2,
	},
	{
		id: 2,
		name: 'All New Rush',
		type: 'SUV',
		image: '/images/rush.png',
		price: 72,
		fuelCapacity: 70,
		transmission: 'Manual',
		capacity: 6,
	},
	{
		id: 3,
		name: 'CR-V',
		type: 'SUV',
		image: '/images/crv.png',
		price: 80,
		fuelCapacity: 68,
		transmission: 'Automatic',
		capacity: 6,
	},
	{
		id: 4,
		name: 'Rolls-Royce',
		type: 'Sedan',
		image: '/images/rolls-royce.png',
		price: 96,
		fuelCapacity: 82,
		transmission: 'Automatic',
		capacity: 4,
	},
	{
		id: 5,
		name: 'New MG ZS',
		type: 'SUV',
		image: '/images/mg-zs.png',
		price: 80,
		fuelCapacity: 48,
		transmission: 'Manual',
		capacity: 5,
	},
	{
		id: 6,
		name: 'MG ZX Excite',
		type: 'Hatchback',
		image: '/images/mg-zx.png',
		price: 74,
		fuelCapacity: 50,
		transmission: 'Electric',
		capacity: 5,
	},
]

const ProductList = () => {
	const [sortBy, setSortBy] = React.useState('name')
	const [filterType, setFilterType] = React.useState('all')
	const [priceRange, setPriceRange] = React.useState(100)
	const [capacity, setCapacity] = React.useState('all')

	const filteredAndSortedCars = React.useMemo(() => {
		let filtered = [...CARS_DATA]

		// Фільтрація за типом
		if (filterType !== 'all') {
			filtered = filtered.filter(
				car => car.type.toLowerCase() === filterType.toLowerCase()
			)
		}

		// Фільтрація за ціною
		filtered = filtered.filter(car => car.price <= priceRange)

		// Фільтрація за місткістю
		if (capacity !== 'all') {
			filtered = filtered.filter(car => car.capacity >= parseInt(capacity))
		}

		// Сортування
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price
				case 'price-high':
					return b.price - a.price
				case 'capacity':
					return b.capacity - a.capacity
				default:
					return a.name.localeCompare(b.name)
			}
		})

		return filtered
	}, [sortBy, filterType, priceRange, capacity])

	const carTypes = [
		'all',
		...new Set(CARS_DATA.map(car => car.type.toLowerCase())),
	]

	return (
		<div className='product-list-container'>
			<div className='filters-sidebar'>
				<div className='filter-section'>
					<h3>Sort By</h3>
					<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
						<option value='name'>Name</option>
						<option value='price-low'>Price: Low to High</option>
						<option value='price-high'>Price: High to Low</option>
						<option value='capacity'>Capacity</option>
					</select>
				</div>

				<div className='filter-section'>
					<h3>Car Type</h3>
					<select
						value={filterType}
						onChange={e => setFilterType(e.target.value)}
					>
						{carTypes.map(type => (
							<option key={type} value={type}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</option>
						))}
					</select>
				</div>

				<div className='filter-section'>
					<h3>Max Price: ${priceRange}</h3>
					<input
						type='range'
						min='0'
						max='100'
						value={priceRange}
						onChange={e => setPriceRange(Number(e.target.value))}
					/>
				</div>

				<div className='filter-section'>
					<h3>Minimum Capacity</h3>
					<select value={capacity} onChange={e => setCapacity(e.target.value)}>
						<option value='all'>All</option>
						<option value='2'>2+ people</option>
						<option value='4'>4+ people</option>
						<option value='6'>6+ people</option>
					</select>
				</div>
			</div>

			<div className='products-section'>
				<div className='product-list'>
					{filteredAndSortedCars.map(car => (
						<ProductCard key={car.id} product={car} isAvailable={true} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductList
