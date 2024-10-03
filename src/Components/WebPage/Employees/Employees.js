import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../../Layout/Header'
import icon7 from '../../Astes/Icon7.svg';
import icon8 from '../../Astes/icon8.svg';
import employeeData from "../Employees/employeejson/employee.json"
import EmployeeTable from './EmployeeTable';
import InviteUser from '../../Popup/InviteUser';
import Success from '../../Popup/Success';
import EmployeesContent from './EmployeesContent';

const Employees = () => {
  const [addEmployeePopup, setAddEmployeePopup] = useState(false);
  const [succesfulPopup, setSuccessfulPopup] = useState(false);

  return (
    <>
      <EmployeesContent
        employeeData={employeeData}
        setAddEmployeePopup={setAddEmployeePopup}
        icon7={icon7}
        icon8={icon8}
      />

      <InviteUser
        addEmployeePopup={addEmployeePopup}
        setAddEmployeePopup={setAddEmployeePopup}
        setSuccessfulPopup={setSuccessfulPopup}
      />

      <Success
        succesfulPopup={succesfulPopup}
        setSuccessfulPopup={setSuccessfulPopup}
        message={'Employee Invited Successfully'}
        setAddEmployeePopup={setAddEmployeePopup}
      />
    </>

  )
}

export default Employees