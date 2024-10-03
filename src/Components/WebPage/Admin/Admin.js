import React, { useState } from 'react'
import Header from '../../Layout/Header';
import Sidebar from '../Sidebar/Sidebar';
import icon7 from '../../Astes/Icon7.svg';
import icon8 from '../../Astes/icon8.svg';
import AddCustomer from '../../Popup/AddCustomer';
import Success from '../../Popup/Success';
import SummeryReport from '../../Popup/SummeryReport';
import RowData from '../../Popup/RowData';
import customerData from "./customerJson/customer.json";
// import CustomerTable from './CustomerTable';
import CustomerContent from './CustomerContent';

const Admin = () => {
  const [addCustomerPopup, setAddCustomerPopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);

  return (
    <>
      <CustomerContent
        setAddCustomerPopup={setAddCustomerPopup}
        customerData={customerData}
        icon7={icon7}
        icon8={icon8}
      />

      <AddCustomer
        addCustomerPopup={addCustomerPopup}
        setAddCustomerPopup={setAddCustomerPopup}
        setSuccessfulPopup={setSuccessfulPopup}
      />

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={'Customer Added Successfully'}
        setAddCustomerPopup={setAddCustomerPopup}
      />

      <SummeryReport />
      <RowData />
    </>
  )
}

export default Admin