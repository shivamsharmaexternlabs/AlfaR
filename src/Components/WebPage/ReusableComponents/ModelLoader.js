import React from 'react'

function ModelLoader({loadingValue}) {
	return (
		<>
			{loadingValue && <div className='loadPopup'>
				<div className='main-popup'>
					<span className="loader">  </span>
				</div>
			</div>}
		</>
	)
}

export default ModelLoader