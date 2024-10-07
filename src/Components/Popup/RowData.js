import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

const RowData = ({ rawData, startDate, endDate, rawDataPopup, setRawDataPopup, handleDownload }) => {

  // Format the date range and the rawData for display
  const formattedData = JSON.stringify(rawData, null, 2);

   return (
    <>
      <PopupDetails PopupToggle={rawDataPopup} classNameProp='rowdatapopup'>
        <div className='popupinner'>
          <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' onClick={() => setRawDataPopup(false)} /> </button>
          <h2>{"Raw Data"}</h2>
          {/* <p>{rawData} </p> */}

          {/* Display the JSON data in a preformatted block */}
          <pre style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          <span style={{ color: '#249EE2' }}>{"2024/10/05 18:29:57"} - {"2024/10/07 18:29:56"}  - </span>{formattedData}
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