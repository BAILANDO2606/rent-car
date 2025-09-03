import React from 'react'
import CustomSelect from './CustomSelect'
import './Filters.css'

const Filters = ({
	selectedType,
	selectedCapacity,
	priceRange,
	onTypeChange,
	onCapacityChange,
	onPriceRangeChange,
}) => {
	const carTypes = [
		{ value: 'sport', label: 'Sport' },
		{ value: 'suv', label: 'SUV' },
		{ value: 'sedan', label: 'Sedan' },
		{ value: 'coupe', label: 'Coupe' },
		{ value: 'hatchback', label: 'Hatchback' },
	]

	const capacityOptions = [
		{ value: '2', label: '2 People' },
		{ value: '4', label: '4 People' },
		{ value: '6', label: '6 People' },
		{ value: '8', label: '8 or More' },
	]

	return (
		<div className='filters'>
			<div className='filter-group'>
				<label>Car Type</label>
				<CustomSelect
					options={carTypes}
					value={selectedType}
					onChange={onTypeChange}
					placeholder='Select type'
				/>
			</div>

			<div className='filter-group'>
				<label>Capacity</label>
				<CustomSelect
					options={capacityOptions}
					value={selectedCapacity}
					onChange={onCapacityChange}
					placeholder='Select capacity'
				/>
			</div>

			<div className='filter-group'>
				<label>Max Price per Day</label>
				<input
					type='range'
					min='0'
					max='1000'
					step='10'
					value={priceRange}
					onChange={e => onPriceRangeChange(e.target.value)}
					className='price-slider'
				/>
				<div className='price-value'>${priceRange}</div>
			</div>
		</div>
	)
}

export default Filters
