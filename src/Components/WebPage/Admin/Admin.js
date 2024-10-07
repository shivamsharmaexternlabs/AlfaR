import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import Sidebar from '../Sidebar/Sidebar';
import icon7 from '../../Astes/Icon7.svg';
import AddCustomer from '../../Popup/AddCustomer';
import Success from '../../Popup/Success';
import RowData from '../../Popup/RowData';
import customerData from "./customerJson/customer.json";
import CustomerContent from './CustomerContent';
import { GetCustomerDetails, GetDayEndBalance, GetRawData, RefreshDayBalance } from '../../Redux/slices/CustomerSlice';
import DayEndBalance from '../../Popup/DayEndBalance';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let roleName = localStorage.getItem("Role");
  let Token = localStorage.getItem("Token");

  const { customerDetailsData, dayEndBalanceData, loading, rawData, refreshDayBalanceData } = useSelector((state) => state.CustomerApiData);

  const [addCustomerPopup, setAddCustomerPopup] = useState(false);
  const [editCustomerPopup, setEditCustomerPopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState('');
  const [message, setMessage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [closeIcon, setCloseIcon] = useState(false);

  const [dayBalancePopup, setDayBalancePopup] = useState(false);
  const [rawDataPopup, setRawDataPopup] = useState(false);

  // console.log("customerDetailsData", customerDetailsData)

  // Extract the page number from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page')) || 1;
    setCurrentPage(page);

    // Dispatch API call for the page from URL
    // dispatch(GetCustomerDetails({ page }));
  }, [location.search, dispatch]);

  // Fetch customer details without search term
  useEffect(() => {
    if (searchItem === "") {
      dispatch(GetCustomerDetails({ page: currentPage }));
    }
  }, [dispatch, searchItem, currentPage]);



  const hanldeSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchApiCall = () => {
    let payload = { search: searchItem };
    if (searchItem) {
      dispatch(GetCustomerDetails(payload)).then((res) => {
        if (res?.payload?.status === 200) {
          setCloseIcon(true);
        }
      }
      );
    }
  };

  // Handle page click and update URL
  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1;  // React-paginate uses 0-based indexing
    setCurrentPage(page);

    // Update the URL with the new page number
    navigate(`/admin?page=${page}`);

    // Dispatch API call with new page
    // dispatch(GetCustomerDetails({ page }));
  };

  // console.log("dayEndBalanceData", dayEndBalanceData)

  const handleDayEndBalance = (customerId) => {
    setDayBalancePopup(true)
    let payload = {
      customerId: customerId,
      Token: Token
    }
    if (Token) {
      dispatch(GetDayEndBalance(payload))
    }
  }

  const handleRawData = (customerId) => {
    setRawDataPopup(true)
    let payload = {
      customerId: customerId,
      Token: Token
    }
    if (Token) {
      dispatch(GetRawData(payload))
    }
  }

  const handlRefreshDay = (customerId) => {

    let payload = {
      customerId: customerId,
      Token: Token
    }
    if (Token) {
      dispatch(RefreshDayBalance(payload))
    }
  }

  const handleDownloadRawData = () => {
    // Convert the rawData object to a string (plain text)
    const textStr = JSON.stringify(rawData, null, 2); // Keeps the JSON format readable in the text file
    const blob = new Blob([textStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'rawData.txt'; // Set the file extension to .txt
    a.click();

    URL.revokeObjectURL(url); // Clean up the URL after download
  }

  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // Add custom headers
    const headers = ['Status', 'Balance', 'Wallet'];
    str += headers.join(',') + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // Adjust this part based on your actual data structure
      line += array[i].activate + ','; // Status
      line += array[i].balance + ',';  // Balance
      line += array[i].walletName;           // Wallet (last value, no comma needed)

      str += line + '\r\n';
    }
    return str;
  };

  let finalData = refreshDayBalanceData?.data?.map((value) => {
    let activate = value.activate ? 'Active' : 'Inactive';
    return { ...value, activate: activate }; // Ensure value has balance and wallet properties
  });

  // Assuming finalData includes the properties you want to download
  const downloadCSV = (newData) => {
    if (finalData?.length > 0) {
      const csvData = new Blob([convertToCSV(finalData)], { type: 'text/csv' });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement('a');
      link.href = csvURL;
      link.download = `dayendbalance.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (newData?.length > 0) {
      const csvData = new Blob([convertToCSV(newData)], { type: 'text/csv' });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement('a');
      link.href = csvURL;
      link.download = `dayendbalance.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  // const convertToCSV = (objArray) => {
  //   const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  //   let str = '';

  //   for (let i = 0; i < array.length; i++) {
  //     let line = '';
  //     for (let index in array[i]) {
  //       if (line !== '') line += ',';

  //       line += array[i][index];
  //     }
  //     str += line + '\r\n';
  //   }
  //   return str;
  // };


  // let finalData = refreshDayBalanceData?.data?.map((value) => {
  //   let activate = value.activate ? 'Active' : 'Inactive'
  //   return { ...value, activate: activate }
  // })

  // const downloadCSV = () => {
  //   const csvData = new Blob([convertToCSV(finalData)], { type: 'text/csv' });
  //   const csvURL = URL.createObjectURL(csvData);
  //   const link = document.createElement('a');
  //   link.href = csvURL;
  //   link.download = `dayendbalance.csv`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  return (
    <>
      <CustomerContent
        setAddCustomerPopup={setAddCustomerPopup}
        setEditCustomerPopup={setEditCustomerPopup}
        customerData={customerDetailsData}
        setEditItemData={setEditCustomerData}
        icon7={icon7}
        hanldeSearch={hanldeSearch}
        searchItem={searchItem}
        handleSearchApiCall={handleSearchApiCall}
        handlePageClick={handlePageClick}
        currentPage={currentPage - 1} // For 0-based pagination
        roleName={roleName}
        handleDayEndBalance={handleDayEndBalance}
        handleRawData={handleRawData}
        handleDownloadRawData={handleDownloadRawData}
        rawData={rawData}
        closeIcon={closeIcon}
        setSearchItem={setSearchItem}
        setCloseIcon={setCloseIcon}
        handlRefreshDay={handlRefreshDay}
        handleDayEndBalanceCsv={downloadCSV}

      />

      {(addCustomerPopup || editCustomerPopup) && (
        <AddCustomer
          addCustomerPopup={addCustomerPopup ? addCustomerPopup : editCustomerPopup}
          setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
          setSuccessfulPopup={setSuccessfulPopup}
          popupMethod={addCustomerPopup ? "Add Customer" : "Edit Customer"}
          setMessage={setMessage}
          editCustomerData={editCustomerData}
          setEditCustomerData={setEditCustomerData}
        />
      )}

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={message}
        setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
      />

      {dayBalancePopup && <DayEndBalance dayBalancePopup={dayBalancePopup} dayEndBalanceData={dayEndBalanceData?.dailyBalance} setDayBalancePopup={setDayBalancePopup} downloadCSV={downloadCSV} />}

      {rawDataPopup && <RowData rawDataPopup={rawDataPopup} setRawDataPopup={setRawDataPopup} rawData={rawData} handleDownload={handleDownloadRawData} />}

      <LoadingSpinner loadingValue={loading} />
    </>
  );
};

export default Admin;