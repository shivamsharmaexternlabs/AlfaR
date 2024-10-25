import React, { useCallback, useEffect, useState, useRef } from 'react';
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
import { GetCustomerDetails, GetDayEndBalance, GetRawData, RefreshDayBalance, UpdateStatus } from '../../Redux/slices/CustomerSlice';
import DayEndBalance from '../../Popup/DayEndBalance';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';
import * as XLSX from 'xlsx/xlsx.mjs';
import { CUSTOMERS } from '../../utils/Constants';
import DateTimePickerComponent from '../ReusableComponents/DateTimePickerComponent';
import { ref } from 'yup';
import startCase from "lodash.startcase"
import isObject from 'lodash.isobject';
import mapKeys from 'lodash.mapkeys';
import mapValues from 'lodash.mapvalues';
import DynamicModal from '../../Modal/mui-modal';
import ModelLoader from '../ReusableComponents/ModelLoader';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const datePickerRef = useRef(null);
  let roleName = localStorage.getItem("Role");
  let Token = localStorage.getItem("Token");

  const { customerDetailsData, dayEndBalanceData, loading, rawData, refreshDayBalanceData, updatedStatus } = useSelector((state) => state.CustomerApiData);

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

  const [dayEndBalanceDataFinal, setDayEndBalanceDataFinal] = useState();

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
      setCloseIcon(false)
    }
  }, [dispatch, searchItem, currentPage, updatedStatus]);

  useEffect(() => {
    if (dayEndBalanceData) {
      setDayEndBalanceDataFinal(dayEndBalanceData)
    }

  }, [dayEndBalanceData])




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
    let status = !state
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

  const handleDayEndBalance = (customerId, insertedAt) => {
    setCustomerAddedAt(insertedAt)

    setDayBalancePopup(true)
    let payload = {
      customerId: customerId,
      Token: Token
    }

    // if (customerId && keyVal === "donwload-btn") {
    //   dispatch(GetDayEndBalance(payload)).then((res) => {
    //     if (res?.payload?.status == 200) {
    //       let dayEndFinalData = res?.payload?.data?.dailyBalance?.[0]?.data
    //       if (dayEndFinalData?.length) {
    //         downloadCSV(dayEndFinalData)
    //       }
    //     }
    //   })
    // } else {
    //   if (Token) {
    //     dispatch(GetDayEndBalance(payload))
    //   }
    // }
  }

  const handleRawData = (customerId, insertedAt) => {
    setRawDataPopup(true)
    setCustomerAddedAt(insertedAt)
    setCustomerId(customerId)
    let payload = {
      customerId: customerId,
      Token: Token
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

  const convertKeysToTitleCase = (obj) => {
    if (Array.isArray(obj)) {
      // If it's an array, recursively apply the function to each element
      return obj.map(convertKeysToTitleCase);
    } else if (isObject(obj)) {
      // If it's an object, apply the transformation to its keys
      return mapValues(
        mapKeys(obj, (value, key) => startCase(key)),
        value => convertKeysToTitleCase(value) // Recurse into nested objects/arrays
      );
    }
    return String(obj); // Return the value if it's neither an object nor an array
  };


  const handleDownloadRawData = (newData, keyVal) => {
    const output = convertKeysToTitleCase(newData);
  
    const wb = XLSX.utils.book_new();
  
    for (let key in output) {
      // Ensure sheet name is at most 31 characters
      const sheetName = key.length > 31 ? key.slice(0, 31) : key;
  
      // Check if output[key] is an array; if not, wrap it in an array
      const sheetData = Array.isArray(output[key]) && output[key].length
        ? XLSX.utils.json_to_sheet(output[key])
        : XLSX.utils.json_to_sheet([{ "No Data": "" }]);
        
      XLSX.utils.book_append_sheet(wb, sheetData, sheetName);
    }
  
    const formattedDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = keyVal === "rawData" ? `raw_data_${formattedDate}.xlsx` : `day_end_balance_${formattedDate}.xlsx`;
    XLSX.writeFile(wb, filename);
  };
  

  // const handleSummaryReportDownloadData = (newData, keyVal) => {
  //   const wb = XLSX.utils.book_new();

  //   // Desired order for the spot_data columns
  //   const desiredOrder = [
  //     'token',
  //     'opening_balance',
  //     'spot_trade',
  //     'spot_fee',
  //     'sub_account_transfer',
  //     'withdrawal',
  //     'deposit',
  //     'others',
  //     'closing_balance',
  //     'balance_snapshot',
  //     'difference',
  //     'other_transfer'
  //   ];

  //   // Function to reorder an object based on the desired keys
  //   const reorderObjectKeys = (obj, order) => {
  //     let reordered = {};
  //     order.forEach(key => {
  //       if (key in obj) reordered[key] = obj[key];  // Only include keys that exist in the object
  //     });
  //     return reordered;
  //   };

  //   // Convert a string to title case
  //   const toTitleCase = str => str.replace(/_/g, ' ')
  //     .replace(/\b\w/g, char => char.toUpperCase());

  //   // Check if spot_data exists
  //   if (newData.spot_data && newData.spot_data.length > 0) {
  //     // Log the original data for spot_data
  //     // console.log("Original spot_data:", newData.spot_data);

  //     // Reorder and convert keys to title case for spot_data
  //     const reorderedSpotData = newData.spot_data.map(item => {
  //       const reorderedItem = reorderObjectKeys(item, desiredOrder);
  //       return convertKeysToTitleCase(reorderedItem); // Convert keys to title case
  //     });

  //     // Log the reordered data for spot_data
  //     // console.log("Reordered spot_data:", reorderedSpotData);

  //     // Create a sheet for the reordered spot_data
  //     const sheetData = reorderedSpotData.length
  //       ? XLSX.utils.json_to_sheet(reorderedSpotData)
  //       : XLSX.utils.json_to_sheet([{ "No Data": "" }]);

  //     // Convert the sheet name to title case
  //     const sheetName = toTitleCase('spot_data');
  //     XLSX.utils.book_append_sheet(wb, sheetData, sheetName);
  //   } else {
  //     console.error("spot_data is empty or undefined");
  //   }

  //   // Handle other sheets and convert their keys to title case
  //   for (let key in newData) {
  //     if (key !== 'spot_data') {
  //       const formattedData = convertKeysToTitleCase(newData[key]); // Convert keys to title case
  //       const sheetData = formattedData.length
  //         ? XLSX.utils.json_to_sheet(formattedData)
  //         : XLSX.utils.json_to_sheet([{ "No Data": "" }]);

  //       // Convert the sheet name to title case
  //       const sheetName = toTitleCase(key);
  //       XLSX.utils.book_append_sheet(wb, sheetData, sheetName);
  //     }
  //   }

  //   // Format the date for the filename (YYYY-MM-DD format)
  //   const formattedDate = new Date().toISOString().split('T')[0];

  //   // Set the filename based on the keyVal
  //   const filename = keyVal === "rawData"
  //     ? `raw_data_${formattedDate}.xlsx`
  //     : `summary_report_${formattedDate}.xlsx`;

  //   // Write the workbook to a file and trigger download
  //   XLSX.writeFile(wb, filename);
  // };

  const handleSummaryReportDownloadData = (newData, keyVal) => {
    const wb = XLSX.utils.book_new();

    // Desired order mappings for each dataset
    const desiredOrders = {
      spot_data: [
        'token', 'opening_balance', 'spot_trade', 'spot_fee',
        'sub_account_transfer', 'withdrawal', 'deposit', 'others',
        'closing_balance', 'balance_snapshot', 'difference', 'other_transfer'
      ],
      margin_data: [
        'asset','opening_balance', 'margin_trades', 'fees','margin_interest', 'transfers','closing_balance',
        'balance_snapshot','difference'
      ],
      future_data: [
        'asset', 'opening_balance', 'realised_pnl', 'fee','funding_fee','transfers','closing_balance',
        'balance_snapshot', 'difference'
      ],
      options_data: [
        'asset', 'opening_balance', 'option_trades', 'fees','settlement_delivery','others',
        'closing_balance', 'balance_snapshot', 'difference'
      ]
    };

    // Function to reorder an object based on the desired keys
    const reorderObjectKeys = (obj, order) => {
      let reordered = {};
      order.forEach(key => {
        if (key in obj) reordered[key] = obj[key];  // Only include keys that exist in the object
      });
      return reordered;
    };

    // Convert a string to title case
    const toTitleCase = str => str.replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

    // Function to reorder and convert keys to title case for each dataset
    const processSheetData = (data, sheetName) => {
      const order = desiredOrders[sheetName] || []; // Select order based on sheet name
      if (data && data.length > 0) {
        const reorderedData = data.map(item => {
          const reorderedItem = reorderObjectKeys(item, order);
          return convertKeysToTitleCase(reorderedItem);
        });

        const sheetData = XLSX.utils.json_to_sheet(reorderedData);
        XLSX.utils.book_append_sheet(wb, sheetData, toTitleCase(sheetName));
      } else {
        console.error(`${sheetName} is empty or undefined`);
        const sheetData = XLSX.utils.json_to_sheet([{ "No Data": "" }]);
        XLSX.utils.book_append_sheet(wb, sheetData, toTitleCase(sheetName));
      }
    };

    // Process each dataset
    const dataSets = {
      spot_data: newData.spot_data,
      margin_data: newData.margin_data,
      future_data: newData.futures_data,
      options_data: newData.options_data
    };

    Object.entries(dataSets).forEach(([sheetName, data]) => {
      processSheetData(data, sheetName);
    });

    // Format the date for the filename (YYYY-MM-DD format)
    const formattedDate = new Date().toISOString().split('T')[0];

    // Set the filename based on the keyVal
    const filename =`summary_report_${formattedDate}.xlsx`;

    // Write the workbook to a file and trigger download
    XLSX.writeFile(wb, filename);
  };


  const convertToCSV = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : JSON.parse(objArray);
    let str = '';

    // Add custom headers
    const headers = ['WALLET NAME','STATUS', 'BALANCE', ];
    str += headers.join(',') + '\r\n';

    array.forEach(item => {
      const line = [
        item.walletName, // Wallet
        item.activate,    // Statusj
        item.balance,     // Balance
        
      ].join(',');
      str += line + '\r\n';
    });

    return str;
  };

  // console.log("refreshh", refreshDayBalanceData)


  const prepareFinalData = (data) => data?.map(item => ({
    ...item,
    activate: item.activate ? 'Active' : 'Inactive' // Adjust the status field
  }));


  const downloadCSV = (dataToDownload) => {
    // console.log("dataToDownload",dataToDownload)
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

  let withDrawData, tradesData, depositedData, subAccountTransferData, unrealisedPnlData, spotFeesData, snapshotData;

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


  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (newValue) => {
    // console.log("yaha aa gaya", newValue)
    setSelectedDate(newValue);
  };
  const handleClick = (event) => {
    event.stopPropagation(); // Stop the click from closing the popup when interacting with DateTimePicker
  };

  // console.log("selectedDtaesdsd", selectedDate)

  const [summeryReportToggle, setSummeryReportToggle] = useState(false)
  const [customerId, setCustomerId] = useState(null);
  const [customerAddedAt, setCustomerAddedAt] = useState(null);
  const summeryReportFun = (e, insertedAt) => {
    setCustomerAddedAt(insertedAt)
    setSummeryReportToggle(o => !o)
  }

  console.log("dayEndBalanceDataFinal",dayEndBalanceDataFinal)


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
        summeryReportFun={summeryReportFun}
        customerId={customerId}
        setCustomerId={setCustomerId}

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

      {/* {dayBalancePopup
        && <DayEndBalance
          dayBalancePopup={dayBalancePopup}
          dayEndBalanceData={dayEndBalanceData?.dailyBalance}
          setDayBalancePopup={setDayBalancePopup}
          downloadCSV={downloadCSV} />} */}

      {/* <DateTimePickerComponent  /> */}


      {/* //  : refreshTrue
      //     ? <DayEndBalance */}
      {/* //   dayBalancePopup={refreshTrue}
      //   dayEndBalanceData={refreshDayBalanceData}
      //   setDayBalancePopup={setRefreshTrue}
      //   downloadCSV={downloadCSV} />
      //  : ""} */}

      {/* {rawDataPopup
        ? <RowData
          rawDataPopup={rawDataPopup}
          setRawDataPopup={setRawDataPopup}
          rawData={rawData}
          handleDownload={handleDownloadRawData}
          sheetsXlsxFunctions={sheetsXlsxFunctions}  selectedDate={selectedDate} handleDateChange={handleDateChange} handleClick={handleClick}/>

        : ""}  */}

      {rawDataPopup && <DynamicModal
        open={rawDataPopup}
        handleClose={() => {
          setRawDataPopup(false)
        }}
        rawDataPopup={rawDataPopup}
        handleDownloadRawData={handleDownloadRawData}
        sheetsXlsxFunctions={sheetsXlsxFunctions}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handleClick={handleClick}
        customerId={customerId}
        customerAddedAt={customerAddedAt}
        loadingValue={loading}
      />}

      {dayBalancePopup && <DynamicModal
        open={dayBalancePopup}
        handleClose={() => {
          setDayBalancePopup(false)
          setDayEndBalanceDataFinal([])
        }}
        dayBalancePopup={dayBalancePopup}
        dayEndBalanceData={dayEndBalanceDataFinal}
        setDayBalancePopup={setDayBalancePopup}
        handleDownloadRawData={handleDownloadRawData}
        downloadCSV={downloadCSV}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handleClick={handleClick}
        customerAddedAt={customerAddedAt}
        customerId={customerId}

      />}

      {summeryReportToggle && <DynamicModal
        open={summeryReportToggle}
        summeryReportToggle={summeryReportToggle}
        handleClose={() => {
          setSummeryReportToggle(false)

        }}
        customerAddedAt={customerAddedAt}
        customerId={customerId}
        handleDownloadSummaryCsv={handleSummaryReportDownloadData}
      // selectedDate={selectedDate}
      // handleDateChange={handleDateChange}
      // handleClick={handleClick}
      />}

      <ModelLoader loadingValue={loading} />
    </>
  );
};

export default Admin;
