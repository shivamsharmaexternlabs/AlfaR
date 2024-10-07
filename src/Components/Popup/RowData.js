import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

const RowData = ({ rawData, rawDataPopup, setRawDataPopup,handleDownload }) => {
  console.log("rawData", rawData)
  // Function to handle downloading the JSON data

  return (
    <>
      <PopupDetails PopupToggle={rawDataPopup} classNameProp='rowdatapopup'>
        <div className='popupinner'>
          <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' onClick={() => setRawDataPopup(false)} /> </button>
          <h2>{"Raw Data"}</h2>
          {/* <p>{rawData} </p> */}

          {/* Display the JSON data in a preformatted block */}
          <pre style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            {JSON.stringify(rawData, null, 2)}
          </pre>
          <div className='text-end mt-4 mb-3'>
            <button type='button' className='btnWh me-4' onClick={() => setRawDataPopup(false)}>{"Cancel"} </button>
            <button type='button' className='btnBl' onClick={handleDownload}>{"Download"}</button>
          </div>
        </div>
      </PopupDetails >

    </>
  )
}

export default RowData