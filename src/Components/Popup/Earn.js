import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GetSummaryReport } from '../Redux/slices/CustomerSlice';



export default function Earn({ summaryReportData }) {



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
