import React, { useEffect } from 'react'
import search from '../../Astes/Search.svg'
 import UploadFile from '../ReusableComponents/UploadFile'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';

const Create = () => {

   

  return (
    <>
    {/* <LoadingSpinner/> */}
      <div className='createbox'>
        <div className='createsearch mb-3'>
          <img src={search} alt='img' />
          <input type='search' placeholder='Polo T-shirt' className='form-control' />
        </div>

        <UploadFile/>

        <button type='button' className='genbtn'>Generate</button>


      </div>
    </>
  )
}

export default Create