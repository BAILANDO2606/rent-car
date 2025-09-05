import React from 'react'
import CustomSelect from './CustomSelect'
import DateTimePicker from './DateTimePicker'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import './Booking.css'

const Booking = ({ locations }) => {
	const [pickupLocation, setPickupLocation] = React.useState(null)
	const [dropoffLocation, setDropoffLocation] = React.useState(null)
	const [pickupDate, setPickupDate] = React.useState(null)
	const [dropoffDate, setDropoffDate] = React.useState(null)

	const handleSwapLocations = () => {
		const tempLocation = pickupLocation
		setPickupLocation(dropoffLocation)
		setDropoffLocation(tempLocation)
	}

	return (
		<div className='booking-container'>
			<div className='booking-section'>
				<h3 className='booking-title'>
					<span className='dot pickup-dot'></span> Pick-Up
				</h3>
				<div className='booking-fields'>
					<div className='field-group'>
						<label>Locations</label>
						<CustomSelect
							options={locations}
							selectedOption={pickupLocation}
							setSelectedOption={setPickupLocation}
							icon={<FaMapMarkerAlt />}
							placeholder='Select your city'
						/>
					</div>
					<div className='field-group'>
						<label>Date</label>
						<DateTimePicker
							selectedDate={pickupDate}
							setSelectedDate={setPickupDate}
							icon={<FaCalendarAlt />}
							placeholder='Select your date'
						/>
					</div>
					<div className='field-group'>
						<label>Time</label>
						<DateTimePicker
							selectedDate={pickupDate}
							setSelectedDate={setPickupDate}
							icon={<FaClock />}
							placeholder='Select your time'
							showTimeSelect
						/>
					</div>
				</div>
			</div>

			<button className='swap-button' onClick={handleSwapLocations}>
				&#x21c4;
			</button>

			<div className='booking-section'>
				<h3 className='booking-title'>
					<span className='dot dropoff-dot'></span> Drop-Off
				</h3>
				<div className='booking-fields'>
					<div className='field-group'>
						<label>Locations</label>
						<CustomSelect
							options={locations}
							selectedOption={dropoffLocation}
							setSelectedOption={setDropoffLocation}
							icon={<FaMapMarkerAlt />}
							placeholder='Select your city'
						/>
					</div>
					<div className='field-group'>
						<label>Date</label>
						<DateTimePicker
							selectedDate={dropoffDate}
							setSelectedDate={setDropoffDate}
							icon={<FaCalendarAlt />}
							placeholder='Select your date'
						/>
					</div>
					<div className='field-group'>
						<label>Time</label>
						<DateTimePicker
							selectedDate={dropoffDate}
							setSelectedDate={setDropoffDate}
							icon={<FaClock />}
							placeholder='Select your time'
							showTimeSelect
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Booking
