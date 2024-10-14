import React, { useEffect, useState } from 'react'
import icon7 from '../../Astes/Icon7.svg';
import employeeData from "../Employees/employeejson/employee.json"
import InviteUser from '../../Popup/InviteUser';
import Success from '../../Popup/Success';
import EmployeesContent from './EmployeesContent';
import { GetEmployeeDetails, UpdateStatus } from '../../Redux/slices/EmployeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { employeesBlack } from '../../utils/Constants';

const Employees = () => {

  let roleName = localStorage.getItem('Role');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { employeeDetailsData, createdCustomer, updatedStatus } = useSelector((state) => state.EmployeesApiData);


  const [addEmployeePopup, setAddEmployeePopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [closeIcon, setCloseIcon] = useState(false);
  const [status, setStatus] = useState("All");

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
      dispatch(GetEmployeeDetails({ page: currentPage, status: status === "All" ? "" : status === "Active" ? true : false }));
      setCloseIcon(false)
    }
  }, [dispatch, searchItem, currentPage, updatedStatus, status]);

  const hanldeSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchApiCall = () => {
    let payload = { search: searchItem };
    if (searchItem) {
      dispatch(GetEmployeeDetails(payload)).then((res) => {
        if (res?.payload?.status === 200) {
          setCloseIcon(true)
        }
      });
    }
  };

  // Handle page click and update URL
  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1;  // React-paginate uses 0-based indexing
    setCurrentPage(page);

    // Update the URL with the new page number
    navigate(`/user?page=${page}`);

    // Dispatch API call with new page
    // dispatch(GetCustomerDetails({ page }));
  };

  const handleStatusUpdate = (userId, state) => {
    let status = state ? false : true
    let payload = { status, id: userId };
    if (userId) {
      dispatch(UpdateStatus(payload));
    }
  };


  // Function to handle status selection
  const handleStatusChange = (newStatus) => {
    const searchParams = { page: currentPage, status: newStatus === "All" ? "" : newStatus === "Active" ? true : false }
    if(searchItem){
      searchParams['search'] = searchItem
    }
    dispatch(GetEmployeeDetails(searchParams));
    setStatus(newStatus);
  };

  return (
    <>
      <EmployeesContent
        employeeData={employeeDetailsData}
        handleStatusUpdate={handleStatusUpdate}
        setAddEmployeePopup={setAddEmployeePopup}
        icon7={icon7}
        employeesBlack={employeesBlack}
        searchItem={searchItem}
        hanldeSearch={hanldeSearch}
        handleSearchApiCall={handleSearchApiCall}
        handlePageClick={handlePageClick}
        currentPage={currentPage - 1}
        roleName={roleName} // For 0-based pagination
        closeIcon={closeIcon}
        setSearchItem={setSearchItem}
        setCloseIcon={setCloseIcon}
        status={status}
        handleStatusChange={handleStatusChange}
      />

      <InviteUser
        addEmployeePopup={addEmployeePopup}
        setAddEmployeePopup={setAddEmployeePopup}
        setSuccessfulPopup={setSuccessfulPopup}
        setMessage={setMessage}
      />

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={message}
        setAddEmployeePopup={setAddEmployeePopup}
      />
    </>

  )
}

export default Employees