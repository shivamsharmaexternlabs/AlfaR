import React from 'react'
import PopupDetails from './PopupDetails'
import successICon from '../Astes/success.svg'

const Success = () => {
  return (
    <>
      <PopupDetails PopupToggle={false} classNameProp='successpopup'>
        <div className='popupinner'>
          
          <div className='text-center'>
            <img src={successICon} alt='Success img' />
            <h3>Success</h3>
            <p>Customer has been successfully added.</p>
          </div>
          <div className='text-end'>
            <button type='button' className='btnBl'>OK</button>
          </div>
        </div>
      </PopupDetails>
    </>
  )
}

export default Success