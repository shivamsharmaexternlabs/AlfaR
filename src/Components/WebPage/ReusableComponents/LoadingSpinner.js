import React from 'react'
import "./loadingSpinner.css"
import PopupDetails from '../../Popup/PopupDetails'

const LoadingSpinner = ({loadingValue}) => {

    return (
        <PopupDetails PopupToggle={loadingValue}> 
            <span className="loader">  </span>
        </PopupDetails>

    )
}

export default LoadingSpinner