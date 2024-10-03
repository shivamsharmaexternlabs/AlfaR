import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

const RowData = () => {
  return (
    <>
      <PopupDetails PopupToggle={false} classNameProp='rowdatapopup'>
        <div className='popupinner'>
          <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' /> </button>
          <h2>Raw Data</h2>
          <p>{"{\"code\":200,\"msg\":\"\",\"snapshotVos\":[{\"data\":{\"assets\":[{\"asset\":\"USDT\",\"marginBalance\":\"118.99782335\",\"walletBalance\":\"120.23811389\"}],\"position\":[{\"entryPrice\":\"7130.41000000\",\"markPrice\":\"7257.66239673\",\"positionAmt\":\"0.01000000\",\"symbol\":\"BTCUSDT\",\"unRealizedProfit\":\"1.24029054\"}]}},\"type\":\"futures\",\"updateTime\":1576281599000}]"} </p> 
          <div className='text-end mt-4 mb-3'>
            <button type='button' className='btnWh me-4'>Cancel </button>
            <button type='button' className='btnBl'>Download</button>
          </div>
        </div>
      </PopupDetails >

    </>
  )
}

export default RowData