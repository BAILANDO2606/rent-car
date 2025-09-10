import React from 'react'
import './Favorites.css'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { MdSpeed, MdPeople, MdLocalGasStation } from 'react-icons/md'

const Favorites = () => {
	// Отримуємо обрані машини з localStorage
	const getFavorites = () => {
		const favorites = localStorage.getItem('favorites')
		return favorites ? JSON.parse(favorites) : []
	}

	const favorites = getFavorites()

	const removeFavorite = carId => {
		const updatedFavorites = favorites.filter(car => car.id !== carId)
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
		// Перезавантажуємо компонент
		window.location.reload()
	}

	const renderStars = rating => {
		return [...Array(5)].map((_, index) => (
			<FaStar
				key={index}
				className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
			/>
		))
	}

	if (favorites.length === 0) {
		return (
			<div className='favorites-empty'>
				<h2>No Favorite Cars Yet</h2>
				<p>Add some cars to your favorites to see them here</p>
				<Link to='/' className='browse-cars-btn'>
					Browse Cars
				</Link>
			</div>
		)
	}

	return (
		<div className='favorites-container'>
			<h1>Your Favorite Cars</h1>
			<div className='favorites-grid'>
				{favorites.map(car => (
					<div key={car.id} className='favorite-car-card'>
						<div className='favorite-car-image'>
							<img src={car.images[0]} alt={car.name} />
							<button
								className='remove-favorite'
								onClick={() => removeFavorite(car.id)}
							>
								Remove
							</button>
						</div>
						<div className='favorite-car-info'>
							<h3>{car.name}</h3>
							<div className='car-rating'>
								<div className='stars'>{renderStars(car.rating)}</div>
								<span className='review-count'>
									({car.reviewCount} reviews)
								</span>
							</div>
							<div className='car-specs'>
								<div className='spec-item'>
									<MdSpeed />
									<span>{car.specs.type}</span>
								</div>
								<div className='spec-item'>
									<MdPeople />
									<span>{car.specs.capacity}</span>
								</div>
								<div className='spec-item'>
									<MdLocalGasStation />
									<span>{car.specs.fuel}</span>
								</div>
							</div>
							<div className='car-price'>
								<span className='price-value'>${car.price.perDay}</span>
								<span className='price-period'>/ day</span>
							</div>
							<Link to={`/car/${car.id}`} className='view-details-btn'>
								View Details
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Favorites
