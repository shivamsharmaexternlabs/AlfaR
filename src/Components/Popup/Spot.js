import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



export default function Spot({summaryReportData}) {

  // const [tradeData, setTradeData] = useState(null)

  // const getData = async () => {
  //   let Token = localStorage.getItem("Token");
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/get-day-end-balance?customerId=${CustomerId}`, {
  //       headers: {
  //         "Accept": "*/*",
  //         "Authorization": `Bearer ${Token}`
  //       },
  //     });
  //     return setTradeData(response.data);
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message);
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])


  // console.log("summaryReportDathacvvdsjha",summaryReportData)

  return (
    <div className='summerytable'>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Order Id</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Quote Qty</th>
            <th>Commission</th>
            <th>Commission Asset</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
           summaryReportData?.trades?.length > 0 && summaryReportData?.trades?.map((item) => {
              return (
                <tr>
                  <td>{item?.symbol }</td>
                  <td>{item?.orderId }</td>
                  <td>{item?.price }</td>
                  <td>{item?.qty }</td>
                  <td>{item?.quoteQty }</td>
                  <td>{item?.commission }</td>
                  <td>{item?.commissionAsset }</td>
                  <td>{item?.time }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
