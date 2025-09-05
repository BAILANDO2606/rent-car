import React from 'react'
import CustomSelect from './CustomSelect'
import './DateTimePicker.css'

const DateTimePicker = ({
	selectedDate,
	selectedTime,
	availableTimes = [],
	onDateChange,
	onTimeChange,
	isLoading,
}) => {
	// Генеруємо доступні дати на тиждень вперед
	const generateAvailableDates = () => {
		const dates = []
		const today = new Date()

		for (let i = 0; i < 7; i++) {
			const date = new Date(today)
			date.setDate(today.getDate() + i)
			const formattedDate = date.toISOString().split('T')[0]
			dates.push({
				value: formattedDate,
				label: new Date(formattedDate).toLocaleDateString('en-US', {
					weekday: 'short',
					month: 'short',
					day: 'numeric',
				}),
			})
		}

		return dates
	}

	const availableDates = generateAvailableDates()
	const timeOptions = availableTimes.map(time => ({
		value: time,
		label: time,
	}))

	return (
		<div className='datetime-picker'>
			<div className='picker-group'>
				<label>Date</label>
				<CustomSelect
					options={availableDates}
					value={selectedDate}
					onChange={onDateChange}
					placeholder='Select date'
					disabled={isLoading}
				/>
			</div>

			{selectedDate && (
				<div className='picker-group'>
					<label>Time</label>
					<CustomSelect
						options={timeOptions}
						value={selectedTime}
						onChange={onTimeChange}
						placeholder='Select time'
						disabled={isLoading || timeOptions.length === 0}
					/>
				</div>
			)}
		</div>
	)
}

export default DateTimePicker
