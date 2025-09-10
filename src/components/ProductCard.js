import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
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
	const navigate = useNavigate()
	const { updateFavoritesCount } = useFavorites()

	// Перевіряємо чи є машина в обраних при монтуванні компонента
	const [isFavorite, setIsFavorite] = React.useState(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		return favorites.some(car => car.id === id)
	})

	const handleRentClick = () => {
		navigate(`/car/${id}`)
	}

	const handleFavoriteClick = () => {
		// Отримуємо поточні обрані з localStorage
		const currentFavorites = JSON.parse(
			localStorage.getItem('favorites') || '[]'
		)

		// Перевіряємо чи вже є така машина в обраних
		const isAlreadyFavorite = currentFavorites.some(car => car.id === id)

		if (!isAlreadyFavorite && !isFavorite) {
			// Додаємо машину до обраних
			const carToAdd = {
				id,
				name,
				type,
				images: [image],
				specs: {
					fuel: `${fuelCapacity}L`,
					type: transmission,
					capacity: `${capacity} Person`,
				},
				price: {
					perDay: price,
				},
				rating: 4.5,
				reviewCount: 10,
			}
			currentFavorites.push(carToAdd)
			setIsFavorite(true)
		} else if (isAlreadyFavorite && isFavorite) {
			// Видаляємо машину з обраних
			const index = currentFavorites.findIndex(car => car.id === id)
			if (index !== -1) {
				currentFavorites.splice(index, 1)
				setIsFavorite(false)
			}
		}

		// Зберігаємо оновлений список обраних
		localStorage.setItem('favorites', JSON.stringify(currentFavorites))
		// Оновлюємо лічильник в хедері
		updateFavoritesCount()
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
					onClick={handleFavoriteClick}
					title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
