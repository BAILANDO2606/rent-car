import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaSpinner } from 'react-icons/fa'
import './CustomSelect.css'

const CustomSelect = ({
	options = [],
	value,
	onChange,
	placeholder,
	isLoading,
	disabled,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = option => {
		onChange(option)
		setIsOpen(false)
	}

	const displayValue = value
		? options.find(option => (option.value || option) === value)?.label || value
		: placeholder

	return (
		<div className='custom-select' ref={selectRef}>
			<div
				className={`select-trigger ${isOpen ? 'open' : ''} ${
					disabled ? 'disabled' : ''
				}`}
				onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
			>
				<span className={!value ? 'placeholder' : ''}>{displayValue}</span>
				{isLoading ? (
					<FaSpinner className='select-spinner' />
				) : (
					<FaChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
				)}
			</div>

			{isOpen && !disabled && (
				<div className='options-container'>
					{isLoading ? (
						<div className='option loading'>
							<FaSpinner className='loading-spinner' />
							Loading...
						</div>
					) : options.length === 0 ? (
						<div className='option disabled'>No options available</div>
					) : (
						options.map(option => (
							<div
								key={option.value || option}
								className={`option ${
									value === (option.value || option) ? 'selected' : ''
								}`}
								onClick={() => handleSelect(option.value || option)}
							>
								{option.label || option}
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}

export default CustomSelect
