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
import { GetCustomerDetails } from '../../Redux/slices/CustomerSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let roleName = localStorage.getItem("Role");

  const { customerDetailsData, createdCustomer } = useSelector((state) => state.CustomerApiData);

  const [addCustomerPopup, setAddCustomerPopup] = useState(false);
  const [editCustomerPopup, setEditCustomerPopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState('');
  const [message, setMessage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

      <RowData />
    </>
  );
};

export default Admin;



// import React, { useEffect, useState } from 'react'
// import Header from '../../Layout/Header';
// import Sidebar from '../Sidebar/Sidebar';
// import icon7 from '../../Astes/Icon7.svg';
// import icon8 from '../../Astes/icon8.svg';
// import AddCustomer from '../../Popup/AddCustomer';
// import Success from '../../Popup/Success';
// import RowData from '../../Popup/RowData';
// import customerData from "./customerJson/customer.json";
// // import CustomerTable from './CustomerTable';
// import CustomerContent from './CustomerContent';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetCustomerDetails } from '../../Redux/slices/CustomerSlice';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Admin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { customerDetailsData, createdCustomer } = useSelector((state) => state.CustomerApiData);

//   const [addCustomerPopup, setAddCustomerPopup] = useState(false);
//   const [editCustomerPopup, setEditCustomerPopup] = useState(false);
//   const [succesfulPopup, setSuccessfulPopup] = useState(false);
//   const [editCustomerData, setEditCustomerData] = useState('');
//   const [message, setMessage] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const [page, setPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   console.log("customerDetailsData", customerDetailsData)
//   console.log("createdCustomer", createdCustomer)

//   useEffect(() => {
//     if (searchItem === "") {
//       dispatch(GetCustomerDetails());
//     }
//   }, [dispatch, searchItem])

//   const hanldeSearch = (e) => {
//     setSearchItem(e.target.value)
//   }

//   const handleSearchApiCall = () => {
//     let payload = {
//       search: searchItem
//     }
//     if (searchItem)
//       dispatch(GetCustomerDetails(payload));
//   }

//   // const n = 3
//   // const paginateData = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "V", "W", "X", "Y", "Z"];

//   const locationPath = useLocation();


//   const handlePageClick = (selectedPage) => {
//     const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.  
//     setCurrentPage(page);
//     setPage(page - 1);

//     let payload = {
//       page: page
//     }

//     dispatch(GetCustomerDetails(payload))
//     // apiGetSuperviserFun(page)
//     // navigate(`/admin/${page}`)

//   }

//   console.log("locationPath",locationPath)

//   return (
//     <>
//       <CustomerContent
//         setAddCustomerPopup={setAddCustomerPopup}
//         setEditCustomerPopup={setEditCustomerPopup}
//         customerData={customerDetailsData}
//         setEditItemData={setEditCustomerData}
//         icon7={icon7}
//         icon8={icon8}
//         hanldeSearch={hanldeSearch}
//         searchItem={searchItem}
//         handleSearchApiCall={handleSearchApiCall}
//         handlePageClick={handlePageClick}
//         currentPage={page}
//       />

//       {(addCustomerPopup || editCustomerPopup) && <AddCustomer
//         addCustomerPopup={addCustomerPopup ? addCustomerPopup : editCustomerPopup}
//         setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
//         setSuccessfulPopup={setSuccessfulPopup}
//         popupMethod={addCustomerPopup ? "Add Customer" : "Edit Customer"}
//         setMessage={setMessage}
//         editCustomerData={editCustomerData}
//       />}

//       <Success
//         succesfulPopup={succesfulPopup}
//         setSuccessfulPopup={setSuccessfulPopup}
//         message={message}
//         setAddCustomerPopup={addCustomerPopup ? setAddCustomerPopup : setEditCustomerPopup}
//       />


//       <RowData />
//     </>
//   )
// }

// export default Admin