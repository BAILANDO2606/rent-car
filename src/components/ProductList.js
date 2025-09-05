import React from 'react'
import ProductCard from './ProductCard'
import Filters from './Filters'
import './ProductList.css'

// Example static car data
const CARS_DATA = [
	{
		id: 1,
		name: 'Koenigsegg',
		type: 'Sport',
		price: 99,
		image: `${process.env.PUBLIC_URL}/images/koenigsegg.png`,
		capacity: 2,
		transmission: 'Manual',
		fuel: '90L',
	},
	{
		id: 2,
		name: 'Nissan GT-R',
		type: 'Sport',
		price: 80,
		image: `${process.env.PUBLIC_URL}/images/nissan-gtr.png`,
		capacity: 2,
		transmission: 'Manual',
		fuel: '80L',
	},
	{
		id: 3,
		name: 'Rolls-Royce',
		type: 'Sport',
		price: 96,
		image: `${process.env.PUBLIC_URL}/images/rolls-royce.png`,
		capacity: 4,
		transmission: 'Manual',
		fuel: '70L',
	},
	{
		id: 4,
		name: 'All New Rush',
		type: 'SUV',
		price: 72,
		image: `${process.env.PUBLIC_URL}/images/rush.png`,
		capacity: 6,
		transmission: 'Manual',
		fuel: '70L',
	},
	{
		id: 5,
		name: 'CR - V',
		type: 'SUV',
		price: 80,
		image: `${process.env.PUBLIC_URL}/images/crv.png`,
		capacity: 6,
		transmission: 'Manual',
		fuel: '80L',
	},
	{
		id: 6,
		name: 'All New Terios',
		type: 'SUV',
		price: 74,
		image: `${process.env.PUBLIC_URL}/images/terios.png`,
		capacity: 6,
		transmission: 'Manual',
		fuel: '90L',
	},
	// Add more cars as needed
]

const ProductList = () => {
	const [filters, setFilters] = React.useState({
		types: [],
		capacities: [],
		maxPrice: 100,
	})

	const handleFilterChange = newFilters => {
		setFilters(newFilters)
	}

	const filteredAndSortedCars = React.useMemo(() => {
		let filtered = [...CARS_DATA]

		// Filter by type
		if (filters.types.length > 0) {
			filtered = filtered.filter(car =>
				filters.types.includes(car.type.toLowerCase())
			)
		}

		// Filter by price
		filtered = filtered.filter(car => car.price <= filters.maxPrice)

		// Filter by capacity
		if (filters.capacities.length > 0) {
			filtered = filtered.filter(car => {
				if (filters.capacities.includes('8')) {
					return (
						car.capacity >= 8 ||
						filters.capacities.includes(String(car.capacity))
					)
				}
				return filters.capacities.includes(String(car.capacity))
			})
		}

		return filtered
	}, [filters])

	return (
		<div className='product-list-container'>
			<div className='filters-sidebar'>
				<Filters onFilterChange={handleFilterChange} />
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
