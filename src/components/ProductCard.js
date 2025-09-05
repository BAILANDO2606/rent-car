import React from 'react'
import { useNavigate } from 'react-router-dom'
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
	const { id, name, type, image, price, fuelCapacity, transmission, capacity } =
		product
	const [isFavorite, setIsFavorite] = React.useState(false)
	const navigate = useNavigate()

	const handleRentClick = () => {
		navigate(`/car/${id}`)
	}

	return (
		<div className={`product-card ${!isAvailable ? 'unavailable' : ''}`}>
			<div className='product-header'>
				<div>
					<h2 className='product-name'>{name}</h2>
					<p className='product-type'>{type}</p>
				</div>
				<button
					className={`favorite-button ${isFavorite ? 'active' : ''}`}
					onClick={() => setIsFavorite(!isFavorite)}
				>
					<FaHeart />
				</button>
			</div>

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
