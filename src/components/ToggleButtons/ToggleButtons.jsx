import React from 'react';
import './toggleButtons.css';

function ToggleButtons({ titles, onClick, active }) {
	return (
		<>
			<div className="toggle-buttons-container">
				{titles.map((item, index) => {
					return (
						<button
							type="button"
							key={index}
							className={`toggle-buttons-button ${active === index ? 'active' : ''}`}
							onClick={() => onClick(index)}
						>
							{item}
						</button>
					);
				})}
			</div>
		</>
	);
}

export default ToggleButtons;
