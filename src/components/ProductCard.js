import React from 'react'
import { FaHeart, FaGasPump, FaUsers } from 'react-icons/fa'
import { GiGearStickPattern } from 'react-icons/gi'
import './ProductCard.css'

const ProductCard = ({
	product,
	isAvailable = true,
	selectedDate,
	selectedTime,
	onRent,
}) => {
	const { name, type, image, price, fuelCapacity, transmission, capacity } =
		product
	const [isFavorite, setIsFavorite] = React.useState(false)

	const handleRentClick = () => {
		if (onRent) {
			onRent(product)
		}
	}

	return (
		<div className={`product-card ${!isAvailable ? 'unavailable' : ''}`}>
			<div className='product-header'>
				<div className='product-type'>{type}</div>
				<button
					className={`favorite-button ${isFavorite ? 'active' : ''}`}
					onClick={() => setIsFavorite(!isFavorite)}
				>
					<FaHeart />
				</button>
			</div>

			<h2 className='product-name'>{name}</h2>

			<div className='product-image-container'>
				<img src={image} alt={name} className='product-image' />
			</div>

			<div className='product-specs'>
				<div className='spec-item'>
					<FaGasPump />
					<span>{fuelCapacity}L</span>
				</div>
				<div className='spec-item'>
					<GiGearStickPattern />
					<span>{transmission}</span>
				</div>
				<div className='spec-item'>
					<FaUsers />
					<span>{capacity} People</span>
				</div>
			</div>

			<div className='spec-details'>
				<h3>Specifications</h3>
				{Object.entries(product.specs).map(([key, value]) => (
					<div key={key} className='spec-detail-item'>
						<span className='spec-label'>
							{key.charAt(0).toUpperCase() + key.slice(1)}
						</span>
						<span className='spec-value'>{value}</span>
					</div>
				))}
			</div>

			{selectedDate && selectedTime && (
				<div className='booking-info'>
					<span className='booking-date'>{selectedDate}</span>
					<span className='booking-time'>{selectedTime}</span>
				</div>
			)}

			<div className='product-footer'>
				<div className='price-container'>
					<span className='price'>${price}.00/</span>
					<span className='price-period'>day</span>
				</div>
				<button
					className='rent-button'
					onClick={handleRentClick}
					disabled={!isAvailable}
				>
					{isAvailable ? 'Rent Now' : 'Unavailable'}
				</button>
			</div>
		</div>
	)
}

export default ProductCard
