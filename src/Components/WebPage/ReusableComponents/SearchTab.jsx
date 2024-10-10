import React from 'react'

const SearchTab = ({ hanldeSearch, searchItem, setCloseIcon, closeIcon, handleSearchApiCall, icon7, setSearchItem }) => {
	return (
		<div className='searchbox'>
			<input
				type='search'
				placeholder='Search...'
				value={searchItem}
				onChange={(e) => hanldeSearch(e)}
			/>
			<img src={icon7} about='icon' className='searchIcon' alt="search-icon" />
			{/* {closeIcon
						&& <button type='button' className='closeBtn' onClick={() => {
							setSearchItem('')
							setCloseIcon(false)
						}}><img src={close} alt='icon' /> </button>} */}
			{closeIcon
				? <button type='button' className='searchbtn' onClick={() => {
					setSearchItem('')
					setCloseIcon(false)
				}}>{"Clear"}  </button> : <button type='button' className='searchbtn' onClick={() => handleSearchApiCall()} > {"Search"} </button>}
		</div>
	)
}

export default SearchTab