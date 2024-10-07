import React from 'react'
import upload from '../../Astes/upload.svg'

const UploadFile = ({setUploadFileData,uploadFileData}) => {

const UploadFileFun =(e)=>{
    setUploadFileData(e.target.files[0])

}


// console.log("xmbfghjhsdv",uploadFileData)
    return (
        <div className='uploadbox'>
            <img src={upload} alt='img' />
            <h4>Drag your file(s) to start uploading</h4>
            <h5>OR</h5>
            <div class="upload-btn-wrapper">
                <button type='button'>Browse files</button>
                <input type="file" name="myfile" onChange={(e)=>UploadFileFun(e)} />
            </div>
            {uploadFileData === false  && <center> <p className='text-danger  small   mt-2 bt-2'> please upload here</p></center>}

        </div>
    )
}

export default UploadFile