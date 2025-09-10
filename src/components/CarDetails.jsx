import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CarDetails.css'
import { FaStar } from 'react-icons/fa'
import { MdSpeed, MdPeople, MdLocalGasStation } from 'react-icons/md'
import { GiSteeringWheel } from 'react-icons/gi'

const CarDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [mainImage, setMainImage] = useState(0)

	// This would normally come from an API/database
	const car = {
		id: id,
		name: 'Koenigsegg Agera R',
		rating: 4.9,
		reviewCount: 26,
		description:
			'Experience pure automotive excellence with the Koenigsegg Agera R. This hypercar represents the pinnacle of engineering and design, offering breathtaking performance and unmatched luxury. With its powerful engine and advanced aerodynamics, the Agera R delivers an unforgettable driving experience.',
		images: [
			'/images/koenigsegg.png',
			'/images/koenigsegg.png',
			'/images/koenigsegg.png',
			'/images/koenigsegg.png',
		],
		specs: {
			type: 'Automatic',
			capacity: '2 People',
			fuel: '92L',
			mileage: '9.5 MPG',
		},
		price: {
			perDay: 99.0,
			discount: 120.0,
		},
		reviews: [
			{
				id: 1,
				author: 'Alex Johnson',
				position: 'Car Enthusiast',
				avatar: 'https://i.pravatar.cc/150?img=1',
				rating: 5,
				date: 'March 15, 2024',
				content:
					'Absolutely incredible experience! The car exceeded all my expectations. The power delivery is smooth yet explosive, and the handling is precise. A true masterpiece of engineering.',
			},
			{
				id: 2,
				author: 'Sarah Williams',
				position: 'Professional Driver',
				avatar: 'https://i.pravatar.cc/150?img=2',
				rating: 5,
				date: 'March 10, 2024',
				content:
					"As a professional driver, I've driven many supercars, but this one stands out. The technology and performance are simply unmatched. Highly recommended for anyone seeking the ultimate driving experience.",
			},
		],
	}

	const renderStars = rating => {
		return [...Array(5)].map((_, index) => (
			<FaStar
				key={index}
				className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
			/>
		))
	}

	const handleRentNow = () => {
		navigate(`/booking/${id}`)
	}

	return (
		<div className='car-details'>
			<div className='car-details-main'>
				<div className='car-info-section'>
					<h1>{car.name}</h1>
					<div className='ratings'>
						<div className='stars'>{renderStars(car.rating)}</div>
						<span className='review-count'>{car.reviewCount} reviews</span>
					</div>
					<p className='description'>{car.description}</p>
				</div>

				<div className='car-images'>
					<div className='main-image'>
						<button
							className='nav-button prev'
							onClick={() =>
								setMainImage(prev =>
									prev === 0 ? car.images.length - 1 : prev - 1
								)
							}
						>
							‹
						</button>
						<img src={car.images[mainImage]} alt={car.name} />
						<button
							className='nav-button next'
							onClick={() =>
								setMainImage(prev =>
									prev === car.images.length - 1 ? 0 : prev + 1
								)
							}
						>
							›
						</button>
					</div>
					<div className='thumbnail-images'>
						{car.images.map((image, index) => (
							<div
								key={index}
								className={`thumbnail ${mainImage === index ? 'active' : ''}`}
								onClick={() => setMainImage(index)}
							>
								<img src={image} alt={`${car.name} view ${index + 1}`} />
							</div>
						))}
					</div>
				</div>

				<div className='specs-section'>
					<div className='spec-item'>
						<GiSteeringWheel size={24} color='#90A3BF' />
						<div className='spec-info'>
							<span className='spec-label'>Type</span>
							<span className='spec-value'>{car.specs.type}</span>
						</div>
					</div>
					<div className='spec-item'>
						<MdPeople size={24} color='#90A3BF' />
						<div className='spec-info'>
							<span className='spec-label'>Capacity</span>
							<span className='spec-value'>{car.specs.capacity}</span>
						</div>
					</div>
					<div className='spec-item'>
						<MdLocalGasStation size={24} color='#90A3BF' />
						<div className='spec-info'>
							<span className='spec-label'>Fuel Capacity</span>
							<span className='spec-value'>{car.specs.fuel}</span>
						</div>
					</div>
					<div className='spec-item'>
						<MdSpeed size={24} color='#90A3BF' />
						<div className='spec-info'>
							<span className='spec-label'>Mileage</span>
							<span className='spec-value'>{car.specs.mileage}</span>
						</div>
					</div>
				</div>

				<div className='pricing-section'>
					<div className='price-info'>
						<span className='current-price'>
							${car.price.perDay.toFixed(2)}
						</span>
						<span className='original-price'>
							${car.price.discount.toFixed(2)}
						</span>
						<span className='price-suffix'>/ day</span>
					</div>
					<button className='rent-button' onClick={handleRentNow}>
						Rent Now
					</button>
				</div>
			</div>

			<div className='reviews-section'>
				<h2>Reviews ({car.reviews.length})</h2>
				{car.reviews.map(review => (
					<div key={review.id} className='review-item'>
						<div className='review-header'>
							<img
								src={review.avatar}
								alt={review.author}
								className='review-avatar'
							/>
							<div className='review-author-info'>
								<h3>{review.author}</h3>
								<p className='author-position'>{review.position}</p>
							</div>
							<span className='review-date'>{review.date}</span>
						</div>
						<div className='review-rating'>{renderStars(review.rating)}</div>
						<p className='review-content'>{review.content}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default CarDetails
