import React, { useEffect, useRef, useState } from 'react'

const SelectAndSearchComponent = ({ ManageOrderTableSelectorDataProp, newFun, EditTableData, placeholder, animation, errorValue }) => {

  // search functionality
  const [value, setValue] = useState("");
  const [OnchangeValue, setOnchangeValue] = useState("");
  const [popupvalue, setPopupValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [lableAnimation, setLableAnimation] = useState(false);
  const [CompanyName, setCompanyName] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [popupselectedIndex, setPopupSelectedIndex] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [pageData, setPageData] = useState("");
  const [CompanyFilterData, setCompanyFilterData] = useState([]);
  const [EnteredValue, setEnteredValue] = useState("");
  const [EnteredValueError, setEnteredValueError] = useState(false);
  const dropdownRef = useRef(null);


// console.log("ghdcjsdsff",ManageOrderTableSelectorDataProp)

  const onChange = (e) => {


    setEnteredValueError(false);
    setValue(e.target.value);
    setOnchangeValue(e.target.value)//this setOnchangeValue value help for tha lable animation (setValue is also same but it's values are change in some condition so that why we are not usning setValue)
    setIsOpen(true);
    setCompanyName(null);
    setHighlightedIndex(-1);
    let array = [];



    ManageOrderTableSelectorDataProp?.filter((item) => {

      const searchTerm = e.target.value.toLowerCase();
      const name = item?.name?.toLowerCase();
      // console.log("jhgdjsvdd", item, searchTerm, name.includes(searchTerm))
      return searchTerm && name?.includes(searchTerm)
    }).map((items) => {
      array.push(items?.name);
    });

    // console.log("sbdvhsdsd", array)
    setCompanyFilterData(array);
  };


  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
      let EnteredValueFilterData = CompanyFilterData.filter(function (items) {
        return (
          items.category?.toString() == value?.toString() ||
          items?.category?.toString() == CompanyName?.toString()
        );
      });

      if (EnteredValueFilterData.length != 0) {
        setEnteredValueError(false);
      } else {
        setEnteredValueError(true);
      }

      setEnteredValue(value);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // prevent cursor from moving to start of input
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
      );
    }
  };
  const filteredData = ManageOrderTableSelectorDataProp?.filter((item) => {
    const searchTerm = value?.toLowerCase();
    const name = item.key?.toLowerCase();
    return searchTerm && name?.includes(searchTerm);
  });

  const filteredpopupData = ManageOrderTableSelectorDataProp?.filter((item) => {
    const searchTerm = popupvalue?.toLowerCase();
    const name = item?.key?.toLowerCase();
    return searchTerm && name?.includes(searchTerm);
  });

  useEffect(() => {
    if (selectedIndex !== -1) {
      setCompanyName(filteredData[selectedIndex]?.category || null);
      setHighlightedIndex(selectedIndex);
    }
    if (popupselectedIndex !== -1) {
      setCompanyName(
        filteredpopupData[popupselectedIndex]?.category || null
      );
      setHighlightedIndex(popupselectedIndex);
    }
  }, [selectedIndex, popupselectedIndex]);

  useEffect(() => {
    if (highlightedIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[highlightedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [highlightedIndex]);



  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setIsOpen(false);
    // newFun


  };

  useEffect(() => {

    ManageOrderTableSelectorDataProp && setPageData(ManageOrderTableSelectorDataProp);
  }, [ManageOrderTableSelectorDataProp]);


  useEffect(() => {

    if (value || CompanyName) {
      // console.log("hsdfhgsd", CompanyName ?? value)
      newFun({
        "value": CompanyName ?? value,
        "error": CompanyName,
        "selectType":placeholder
      },value)
    }

  }, [CompanyName, value])

  // console.log("dvbnbsdmdss", CompanyName, value)

  useEffect(() => {
    // setCompanyName(EditTableData?.category)
    setValue(EditTableData?.[0]?.category)
    // setCompanyFilterData([EditTableData])

  }, [EditTableData])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id == `stopeToggle${animation}`) {
        setLableAnimation(true)

      }
      else if (OnchangeValue == "") {
        setLableAnimation(false)
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

  }, [OnchangeValue]);

  // console.log("mdvjddefwe", CompanyName, value)

  // CompanyName??value =CompanyName - if you are not selected and the drop down is open the the value is null
  // value - every intered value is printed


  return (
    <div style={{ position: 'relative' }} className={`${lableAnimation == true ? "main-select-serch-Active" : "main-select-serch-noActive"}`}>

      <input id={`stopeToggle${animation}`}
        className={`${lableAnimation == true ? "select-search-custome" : "select-search-custome-noActive"} order-history-input form-control `}
        type="text"
        value={CompanyName ?? value}
        onChange={onChange}
        // placeholder={placeholder}
        onKeyDown={onKeyDown}
        onFocus={onChange}
      />

      {<label> {placeholder}</label>}

      {isOpen ? (
        <div
          className={`dropdown companyDropDown dropdownhistory`}
          ref={dropdownRef}
        >
          {CompanyFilterData.length > 0 ? (
            CompanyFilterData?.map((item, index) => {
              return (
                <div
                  className={`dropdown-row   ${(highlightedIndex === index
                    ? " selected"
                    : "",
                    selectedIndex == -1
                      ? index == 0
                        ? "bg-red"
                        : ""
                      : selectedIndex == index
                        ? "bg-red"
                        : "")
                    }`}
                  onMouseEnter={() =>
                    setHighlightedIndex(index)
                  }
                  onClick={() => {
                    setCompanyName(item);
                    onSearch(item);
                  }}
                  key={index}
                >

                  {item}

                </div>
              );
            })
          ) : ( //   array is empty  and if you are writing some words that is incorrect 
            value == "" ?
              <div className="text-danger">
                {errorValue}   {/* please select the value  */}
              </div> :
              <div className="text-danger">
                {"please enter valid name"}
              </div>

          )}


        </div>
      ) : (
        !isOpen &&
        EnteredValueError && (
          <div className="text-danger">
            {/* No Category Name is Available ! */}
          </div>
        )
      )}



    </div>
  )
}

export default SelectAndSearchComponent