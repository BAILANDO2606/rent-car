import React from 'react'
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
		{ value: 'sport', label: 'Sport', count: 10 },
		{ value: 'suv', label: 'SUV', count: 12 },
		{ value: 'mpv', label: 'MPV', count: 16 },
		{ value: 'sedan', label: 'Sedan', count: 20 },
		{ value: 'coupe', label: 'Coupe', count: 14 },
		{ value: 'hatchback', label: 'Hatchback', count: 14 },
	]

	const capacityOptions = [
		{ value: '2', label: '2 Person', count: 10 },
		{ value: '4', label: '4 Person', count: 14 },
		{ value: '6', label: '6 Person', count: 12 },
		{ value: '8', label: '8 or More', count: 16 },
	]

	return (
		<div className='filters'>
			<div className='section-title'>TYPE</div>
			<div className='filter-group'>
				{carTypes.map(type => (
					<div className='checkbox-row' key={type.value}>
						<input
							type='checkbox'
							id={`type-${type.value}`}
							value={type.value}
							checked={selectedType.includes(type.value)}
							onChange={() => onTypeChange(type.value)}
						/>
						<label htmlFor={`type-${type.value}`}>
							{type.label}{' '}
							<span style={{ color: '#9ca3af', fontWeight: 400 }}>
								({type.count})
							</span>
						</label>
					</div>
				))}
			</div>
			<div className='section-title'>CAPACITY</div>
			<div className='filter-group'>
				{capacityOptions.map(cap => (
					<div className='checkbox-row' key={cap.value}>
						<input
							type='checkbox'
							id={`capacity-${cap.value}`}
							value={cap.value}
							checked={selectedCapacity.includes(cap.value)}
							onChange={() => onCapacityChange(cap.value)}
						/>
						<label htmlFor={`capacity-${cap.value}`}>
							{cap.label}{' '}
							<span style={{ color: '#9ca3af', fontWeight: 400 }}>
								({cap.count})
							</span>
						</label>
					</div>
				))}
			</div>
			<div className='section-title'>PRICE</div>
			<div className='filter-group'>
				<input
					type='range'
					min='0'
					max='1000'
					step='10'
					value={priceRange}
					onChange={e => onPriceRangeChange(e.target.value)}
					className='price-slider'
				/>
				<div className='price-value'>Max. ${priceRange}.00</div>
			</div>
		</div>
	)
}

export default Filters
