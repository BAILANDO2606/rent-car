import React from 'react'
import './Banner.css'

const Banner = ({
	title,
	subtitle,
	buttonText = 'Rental Car',
	image,
	variant = 'primary',
}) => {
	return (
		<div className={`banner ${variant}`}>
			<div className='banner-content'>
				<h2>{title}</h2>
				<p>{subtitle}</p>
				<button className='banner-button'>{buttonText}</button>
			</div>
			<div className='banner-image'>
				<img src={image} alt='Car' />
			</div>
		</div>
	)
}

export default Banner
