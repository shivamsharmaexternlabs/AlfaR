import React, { useCallback, useEffect, useState } from 'react';
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
import { GetCustomerDetails, GetDayEndBalance, GetRawData, RefreshDayBalance , UpdateStatus} from '../../Redux/slices/CustomerSlice';
import DayEndBalance from '../../Popup/DayEndBalance';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';
import * as XLSX from 'xlsx/xlsx.mjs';
import { CUSTOMERS } from '../../utils/Constants';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let roleName = localStorage.getItem("Role");
  let Token = localStorage.getItem("Token");

  const { customerDetailsData, dayEndBalanceData, loading, rawData, refreshDayBalanceData ,updatedStatus } = useSelector((state) => state.CustomerApiData);

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

  const [refreshTrue, setRefreshTrue] = useState(false);

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
  }, [dispatch, searchItem, currentPage,updatedStatus]);



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

  const handleCustomerStatus = (customerId, state) => {
    let status = state === 'active' ? 'inactive' : 'active'
    let payload = { status, id: customerId };
    if (customerId) {
      dispatch(UpdateStatus(payload));
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

  const handleDayEndBalance = (customerId, keyVal) => {
    keyVal === "donwload-btn" ? setDayBalancePopup(false) : setDayBalancePopup(true)
    let payload = {
      customerId: customerId,
      Token: Token
    }

    if (customerId && keyVal === "donwload-btn") {
      dispatch(GetDayEndBalance(payload)).then((res) => {
        if (res?.payload?.status == 200) {
          let dayEndFinalData = res?.payload?.data?.dailyBalance?.[0]?.data
          if (dayEndFinalData?.length) {
            downloadCSV(dayEndFinalData)
          }
        }
      })
    } else {
      if (Token) {
        dispatch(GetDayEndBalance(payload))
      }
    }
  }

  const handleRawData = (customerId) => {
    // setRawDataPopup(true)
    let payload = {
      customerId: customerId,
      Token: Token
    }
    if (Token) {
      dispatch(GetRawData(payload)).then((res) => {
        if (res?.payload?.status == 200) {
          sheetsXlsxFunctions(res?.payload?.data?.rawData)
        }
      })
    }
  }

  const handlRefreshDay = (customerId) => {
    setRefreshTrue(true);
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
    const array = Array.isArray(objArray) ? objArray : JSON.parse(objArray);
    let str = '';

    // Add custom headers
    const headers = ['Status', 'Balance', 'Wallet'];
    str += headers.join(',') + '\r\n';

    array.forEach(item => {
      const line = [
        item.activate,    // Status
        item.balance,     // Balance
        item.walletName   // Wallet
      ].join(',');
      str += line + '\r\n';
    });

    return str;
  };

  console.log("refreshh", refreshDayBalanceData)


  const prepareFinalData = (data) => data?.map(item => ({
    ...item,
    activate: item.activate ? 'Active' : 'Inactive' // Adjust the status field
  }));


  const downloadCSV = (dataToDownload) => {
    let csvData = prepareFinalData(dataToDownload);

    if (csvData?.length > 0) {
      const csvContent = convertToCSV(csvData);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const csvURL = URL.createObjectURL(blob);

      const today = new Date()?.toISOString()?.split('T')[0]; // Format YYYY-MM-DD
      const link = document.createElement('a');
      link.href = csvURL;
      link.download = `day_end_balance_${today}.xlsx`; // Change the file extension to .xlsx
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  let withDrawData, tradesData, depositedData, subAccountTransferData, unrealisedPnlData, spotFeesData,snapshotData;

  const createSheetOrEmpty = (wb, data, sheetName) => {
    const sheetData = data?.rawData?.length > 2
      ? XLSX.utils.json_to_sheet(JSON.parse(data.rawData))
      : XLSX.utils.json_to_sheet([{ "No Data": "" }]);

    XLSX.utils.book_append_sheet(wb, sheetData, sheetName);
  };

  const sheetsXlsxFunctions = (rawDataa) => {
    withDrawData = rawDataa?.find(el => el?.apiEndpoint === '/sapi/v1/capital/withdraw/history');
    depositedData = rawDataa?.find(el => el?.apiEndpoint === '/sapi/v1/capital/deposit/hisrec');
    // tradesData = rawDataa?.find(el => el?.apiEndpoint === '/api/v3/mytrades');
    subAccountTransferData = rawDataa?.find(el => el?.apiEndpoint === '/sapi/v1/sub-account/universalTransfer');
    unrealisedPnlData = rawDataa?.find(el => el?.apiEndpoint === '/fapi/v3/positionRisk');
    snapshotData = rawDataa?.find(el => el?.apiEndpoint === '/sapi/v1/accountSnapshot/type=spot');
    // spotFeesData = rawDataa?.find(el => el?.apiEndpoint === '/api/v3/account/commission');

    const wb = XLSX.utils.book_new(); // Create a new workbook

    createSheetOrEmpty(wb, withDrawData, "Withdraw");
    // createSheetOrEmpty(wb, tradesData, "Trades");
    createSheetOrEmpty(wb, depositedData, "Deposits");
    createSheetOrEmpty(wb, subAccountTransferData, "Sub Account Transfer");
    createSheetOrEmpty(wb, unrealisedPnlData, "Unrealised Pnl");
    createSheetOrEmpty(wb, snapshotData, "Snapshots");
    // createSheetOrEmpty(wb, spotFeesData, "Spot Fees");

    const formattedDate = new Date()?.toISOString()?.split('T')?.[0]; // YYYY-MM-DD format
    const filename = `raw_data_${formattedDate}.xlsx`;

    XLSX.writeFile(wb, filename);
  };


  // let withDrawData, tradesData, depositedData, subAccountTransferData, unrealisedPnlData, spotFeesData;

  // const sheetsXlsxFunctions = (rawDataa) => {
  //   withDrawData = rawDataa?.find((el) => el?.apiEndpoint === '/sapi/v1/capital/withdraw/history');
  //   depositedData = rawDataa?.find((el) => el?.apiEndpoint === '/sapi/v1/capital/deposit/hisrec');
  //   subAccountTransferData = rawDataa?.find((el) => el?.apiEndpoint === '/sapi/v1/sub-account/universalTransfer');
  //   unrealisedPnlData = rawDataa?.find((el) => el?.apiEndpoint === '/fapi/v3/positionRisk');
  //   spotFeesData = rawDataa?.find((el) => el?.apiEndpoint === '/api/v3/account/commission');


  //   const wb = XLSX.utils.book_new(); // Create a new workbook
  //   if (withDrawData?.rawData?.length > 2) {
  //     const withdrawSheet = XLSX.utils.json_to_sheet(JSON.parse(withDrawData.rawData));
  //     XLSX.utils.book_append_sheet(wb, withdrawSheet, "Withdraw");
  //   } else {

  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Withdraw");
  //   }

  //   if (tradesData?.rawData?.length > 2) {
  //     const tradesDataSheet = XLSX.utils.json_to_sheet(JSON.parse(tradesData.rawData));
  //     XLSX.utils.book_append_sheet(wb, tradesDataSheet, "Trades");
  //   } else {
  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Trades");
  //   }

  //   if (depositedData?.rawData?.length > 2) {
  //     const depositedSheet = XLSX.utils.json_to_sheet(JSON.parse(depositedData.rawData));
  //     XLSX.utils.book_append_sheet(wb, depositedSheet, "Deposits");
  //   } else {
  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Deposits");
  //   }

  //   if (subAccountTransferData?.rawData?.length > 2) {
  //     const subAccountTransferSheet = XLSX.utils.json_to_sheet(JSON.parse(subAccountTransferData.rawData));
  //     XLSX.utils.book_append_sheet(wb, subAccountTransferSheet, "Sub Account Transfer");
  //   } else {
  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Sub Account Transfer");
  //   }

  //   if (unrealisedPnlData?.rawData?.length > 2) {
  //     const unrealisedPnlDataSheet = XLSX.utils.json_to_sheet(JSON.parse(unrealisedPnlData.rawData));
  //     XLSX.utils.book_append_sheet(wb, unrealisedPnlDataSheet, "Unrealised Pnl");
  //   } else {
  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Unrealised Pnl");
  //   }
  //   if (spotFeesData?.rawData?.length > 2) {
  //     const spotFeesDataSheet = XLSX.utils.json_to_sheet(JSON.parse(spotFeesData.rawData));
  //     XLSX.utils.book_append_sheet(wb, spotFeesDataSheet, "Spot Fees");
  //   } else {
  //     const emptyData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
  //     XLSX.utils.book_append_sheet(wb, emptyData, "Spot Fees");
  //   }

  //   const today = new Date();
  //   const formattedDate = today.toISOString().split('T')[0]; // Extract the date part in YYYY-MM-DD format

  //   const filename = `raw_data_${formattedDate}.xlsx`;

  //   XLSX.writeFile(wb, filename);
  // }



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
        handleCustomerStatus={handleCustomerStatus}
        handleRawData={handleRawData}
        handleDownloadRawData={handleDownloadRawData}
        rawData={rawData}
        closeIcon={closeIcon}
        setSearchItem={setSearchItem}
        setCloseIcon={setCloseIcon}
        handlRefreshDay={handlRefreshDay}
        handleDayEndBalanceCsv={downloadCSV}
        sheetsXlsxFunctions={sheetsXlsxFunctions}
      />

      {(addCustomerPopup || editCustomerPopup) ? (
        <AddCustomer
          addCustomerPopup={addCustomerPopup ? addCustomerPopup : editCustomerPopup}
          setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
          setSuccessfulPopup={setSuccessfulPopup}
          popupMethod={addCustomerPopup ? `${CUSTOMERS.ADD_CUSTOMER}` : `${CUSTOMERS.UPDATE_CUSTOMERS}`}
          setMessage={setMessage}
          editCustomerData={editCustomerData}
          setEditCustomerData={setEditCustomerData}
        />
      ) : ""}

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={message}
        setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
      />

      {dayBalancePopup
        ? <DayEndBalance
          dayBalancePopup={dayBalancePopup}
          dayEndBalanceData={dayEndBalanceData?.dailyBalance}
          setDayBalancePopup={setDayBalancePopup}
          downloadCSV={downloadCSV} />

        : refreshTrue
          ? <DayEndBalance
            dayBalancePopup={refreshTrue}
            dayEndBalanceData={refreshDayBalanceData}
            setDayBalancePopup={setRefreshTrue}
            downloadCSV={downloadCSV} />
          : ""}

      {rawDataPopup
        ? <RowData
          rawDataPopup={rawDataPopup}
          setRawDataPopup={setRawDataPopup}
          rawData={rawData}
          handleDownload={handleDownloadRawData}
          sheetsXlsxFunctions={sheetsXlsxFunctions} />
        : ""}

      <LoadingSpinner loadingValue={loading} />
    </>
  );
};

export default Admin;