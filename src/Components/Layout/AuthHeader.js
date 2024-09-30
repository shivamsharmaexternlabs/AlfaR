import React from 'react'
import MainLogo from "../Astes/logo.svg"

const AuthHeader = () => {
    return (
        <>
            <div className='profileHeader'>
                <img src={MainLogo} alt='img' />
            </div>
        </>
    )
}

export default AuthHeader