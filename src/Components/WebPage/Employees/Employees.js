import React, { useEffect, useState } from 'react'
import icon7 from '../../Astes/Icon7.svg';
import employeeData from "../Employees/employeejson/employee.json"
import InviteUser from '../../Popup/InviteUser';
import Success from '../../Popup/Success';
import EmployeesContent from './EmployeesContent';
import { GetEmployeeDetails } from '../../Redux/slices/EmployeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { employeesBlack } from '../../utils/Constants';

const Employees = () => {

  let roleName = localStorage.getItem('Role');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { employeeDetailsData, createdCustomer } = useSelector((state) => state.EmployeesApiData);

  const [addEmployeePopup, setAddEmployeePopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);
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
      dispatch(GetEmployeeDetails({ page: currentPage }));
    }
  }, [dispatch, searchItem, currentPage]);

  const hanldeSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchApiCall = () => {
    let payload = { search: searchItem };
    if (searchItem) {
      dispatch(GetEmployeeDetails(payload));
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

  return (
    <>
      <EmployeesContent
        employeeData={employeeDetailsData}
        setAddEmployeePopup={setAddEmployeePopup}
        icon7={icon7}
        employeesBlack={employeesBlack}
        searchItem={searchItem}
        hanldeSearch={hanldeSearch}
        handleSearchApiCall={handleSearchApiCall}
        handlePageClick={handlePageClick}
        currentPage={currentPage - 1}
        roleName={roleName} // For 0-based pagination
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