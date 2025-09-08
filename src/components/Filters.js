import React, { useState } from 'react'
import './Filters.css'

const carTypes = [
	{ id: 'sport', label: 'Sport', count: 10 },
	{ id: 'suv', label: 'SUV', count: 12 },
	{ id: 'mpv', label: 'MPV', count: 16 },
	{ id: 'sedan', label: 'Sedan', count: 20 },
	{ id: 'coupe', label: 'Coupe', count: 14 },
	{ id: 'hatchback', label: 'Hatchback', count: 14 },
]

const capacities = [
	{ id: '2', label: '2 Person', count: 10 },
	{ id: '4', label: '4 Person', count: 14 },
	{ id: '6', label: '6 Person', count: 12 },
	{ id: '8', label: '8 or More', count: 16 },
]

function Filters({ onFilterChange }) {
	const [selectedTypes, setSelectedTypes] = useState([])
	const [selectedCapacities, setSelectedCapacities] = useState([])
	const [maxPrice, setMaxPrice] = useState(100)

	const handleTypeChange = typeId => {
		const newTypes = selectedTypes.includes(typeId)
			? selectedTypes.filter(id => id !== typeId)
			: [...selectedTypes, typeId]
		setSelectedTypes(newTypes)
		onFilterChange?.({
			types: newTypes,
			capacities: selectedCapacities,
			maxPrice,
		})
	}

	const handleCapacityChange = capacityId => {
		const newCapacities = selectedCapacities.includes(capacityId)
			? selectedCapacities.filter(id => id !== capacityId)
			: [...selectedCapacities, capacityId]
		setSelectedCapacities(newCapacities)
		onFilterChange?.({
			types: selectedTypes,
			capacities: newCapacities,
			maxPrice,
		})
	}

	const handlePriceChange = e => {
		const price = parseInt(e.target.value)
		const progress = (price / 1000) * 100
		e.target.style.setProperty('--range-progress', `${progress}%`)
		setMaxPrice(price)
		onFilterChange?.({
			types: selectedTypes,
			capacities: selectedCapacities,
			maxPrice: price,
		})
	}

	const formatPrice = price => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(price)
	}

	return (
		<div className='filters'>
			<div className='filters-section'>
				<h3 className='filters-title'>TYPE</h3>
				<div className='filters-options'>
					{carTypes.map(type => (
						<label key={type.id} className='filter-option'>
							<input
								type='checkbox'
								className='filter-checkbox'
								checked={selectedTypes.includes(type.id)}
								onChange={() => handleTypeChange(type.id)}
							/>
							<span className='filter-label'>
								{type.label}
								<span className='filter-count'>({type.count})</span>
							</span>
						</label>
					))}
				</div>
			</div>

			<div className='filters-section'>
				<h3 className='filters-title'>CAPACITY</h3>
				<div className='filters-options'>
					{capacities.map(capacity => (
						<label key={capacity.id} className='filter-option'>
							<input
								type='checkbox'
								className='filter-checkbox'
								checked={selectedCapacities.includes(capacity.id)}
								onChange={() => handleCapacityChange(capacity.id)}
							/>
							<span className='filter-label'>
								{capacity.label}
								<span className='filter-count'>({capacity.count})</span>
							</span>
						</label>
					))}
				</div>
			</div>

			<div className='filters-section'>
				<h3 className='filters-title'>PRICE</h3>
				<div className='price-range'>
					<input
						type='range'
						min='0'
						max='1000'
						value={maxPrice}
						className='price-slider'
						onChange={handlePriceChange}
					/>
					<div className='price-range-label'>
						<span>Max. {formatPrice(maxPrice)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filters
