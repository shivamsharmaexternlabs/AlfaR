import React from 'react'

const DropDownStatus = ({ status, handleStatusChange, statusOptions }) => {
	return (
		<div class="dropdown">
			<button class="tcbtn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				{"Status:"} <span>{status}</span>
			</button>
			<ul className="dropdown-menu">
				{statusOptions?.map((option, index) => (
					<li key={index}>
						<a
							 className={`dropdown-item ${status === option ? 'active bg-black my-1' : ''}`}
							href="#"
							onClick={() => handleStatusChange(option)}
						>
							{option}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default DropDownStatus;