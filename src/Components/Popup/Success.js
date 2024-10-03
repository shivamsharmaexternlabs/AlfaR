import React from 'react'
import PopupDetails from './PopupDetails'
import successICon from '../Astes/success.svg'

const Success = ({
  succesfulPopup,
  setSuccessfulPopup,
  message,
  setAddCustomerPopup,
  setAddEmployeePopup
}) => {
  return (
    <>
      <PopupDetails PopupToggle={succesfulPopup} classNameProp='successpopup'>
        <div className='popupinner'>

          <div className='text-center'>
            <img src={successICon} alt='Success img' />
            <h3>Success</h3>
            <p>{message}</p>
          </div>
          <div className='text-end'>
            <button type='button' className='btnBl' onClick={() => {
              setSuccessfulPopup(false)
              if (setAddEmployeePopup) {
                setAddEmployeePopup(false);
              } else {
                setAddCustomerPopup(false)
              }
            }}>{"OK"}</button>
          </div>
        </div>
      </PopupDetails>
    </>
  )
}

export default Success