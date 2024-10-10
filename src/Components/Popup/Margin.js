import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



export default function Margin({ summaryReportData }) {

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
  // },[])



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
           summaryReportData?.length && summaryReportData?.map((value) => {
              return (
                <tr>
                  <td>{value.symbol}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
