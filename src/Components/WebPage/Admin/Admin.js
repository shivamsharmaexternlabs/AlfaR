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
import { GetCustomerDetails, GetDayEndBalance, GetRawData } from '../../Redux/slices/CustomerSlice';
import DayEndBalance from '../../Popup/DayEndBalance';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let roleName = localStorage.getItem("Role");
  let Token = localStorage.getItem("Token");

  const { customerDetailsData, dayEndBalanceData, loading, rawData } = useSelector((state) => state.CustomerApiData);

  const [addCustomerPopup, setAddCustomerPopup] = useState(false);
  const [editCustomerPopup, setEditCustomerPopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState('');
  const [message, setMessage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [dayBalancePopup, setDayBalancePopup] = useState(false);
  const [rawDataPopup, setRawDataPopup] = useState(false);

  console.log("customerDetailsData", customerDetailsData)

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
      dispatch(GetCustomerDetails(payload));
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

  console.log("dayEndBalanceData", dayEndBalanceData)

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

  const handleDownloadRawData = () => {
    const jsonStr = JSON.stringify(rawData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'rawData.json';
    a.click();

    URL.revokeObjectURL(url); // Clean up the URL after download
  }


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

      />

      {(addCustomerPopup || editCustomerPopup) && (
        <AddCustomer
          addCustomerPopup={addCustomerPopup ? addCustomerPopup : editCustomerPopup}
          setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
          setSuccessfulPopup={setSuccessfulPopup}
          popupMethod={addCustomerPopup ? "Add Customer" : "Edit Customer"}
          setMessage={setMessage}
          editCustomerData={editCustomerData}

        />
      )}

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={message}
        setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
      />

      {dayBalancePopup && <DayEndBalance dayBalancePopup={dayBalancePopup} dayEndBalanceData={dayEndBalanceData?.snapshots?.spotBalance} setDayBalancePopup={setDayBalancePopup} />}

      {rawDataPopup && <RowData rawDataPopup={rawDataPopup} setRawDataPopup={setRawDataPopup} rawData={rawData} handleDownload={handleDownloadRawData}/>}

      <LoadingSpinner loadingValue={loading} />
    </>
  );
};

export default Admin;