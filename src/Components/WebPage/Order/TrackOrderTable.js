import React from 'react'

const TrackOrderTable = ({ order, sku, status, target, produced, time, bgColor }) => {
    return (
        <>
            <tr>
                <td>{order}</td>
                <td>{sku}</td>
                <td><span className='statustext'>{status}</span></td>
                <td>{target}</td>
                <td>{produced}</td>
                <td>{time}</td>
                <td> <span className='statusbtn' style={{ background: bgColor }}></span> </td>
            </tr>
        </>
    )
}

export default TrackOrderTable