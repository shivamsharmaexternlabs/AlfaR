import React from 'react'
import icon12 from '../../Astes/icon12.svg'

const CategeoryTitle = ({listName , showView,icon}) => {
    return (
        <>
            <div className='Categeorytitle'>
                <h3><img src={icon} alt='img' />{listName}</h3>
                {showView && <button type='button'> View All </button>}
            </div>
        </>
    )
}

export default CategeoryTitle