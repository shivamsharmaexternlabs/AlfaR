import React, { useState, useEffect } from 'react'
import Trendinglist from './Trendinglist'
import item3 from '../../Astes/item3.png'
import like from '../../Astes/like.svg'
import unlike from '../../Astes/unlike.svg'
import ReactPaginate from 'react-paginate'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DesignGetSlice } from '../../Redux/slices/DesignApis'
import { PaginationPageValueSlice, ToggleEffectOnSearchClickPaginationSlice } from '../../Redux/slices/Toggles-Values'

const Tranding = () => {


  const [CurrentPage, setCurrentPage] = useState(0)
  const [deviceData, setDeviceData] = useState([]);
  const [FavData, setFavData] = useState({});

  const itemsPerPage = 6;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation()


  let DesignApisReduxData = useSelector((state) => state?.DesignApisData);
  let TogglesValuesReduxData = useSelector((state) => state?.TogglesValuesData);


  let PaginationFromUrl = locationPath?.hash?.split("&page=")?.[1]

  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.  
    setCurrentPage(page - 1);
    console.log("sdhvhjskf", page)
    // apiGetDeviceFun(page) 
    dispatch(ToggleEffectOnSearchClickPaginationSlice(true)) //this will help in routes  
    dispatch(PaginationPageValueSlice(page))


  }


  useEffect(() => {
    if (TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData !== false && TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData !== true) {
      if (PaginationFromUrl !== undefined) {
        setCurrentPage(Number(PaginationFromUrl - 1))
      }
    }



  }, [])
  // console.log("zdhgjsdsd-------",CurrentPage,PaginationFromUrl)


  const apiGetDeviceFun = async (page) => {
    // dispatch(LoadingSpinner(true))
    // let pageValue1 = page == undefined ? 1 : page
    // try {
    //     let responseData = await dispatch(OrganizationSlice({ "organization_id": "", page_size: itemsPerPage, all: false, page: pageValue1, "Token": Token }));

    //     if (responseData?.payload?.status === 200) {
    //         setDeviceData(responseData?.payload?.data)
    //     }
    //     else {
    //         setPageErrorNoDataFound(responseData?.payload?.response?.data?.error?.[0])
    //     }



    //     dispatch(LoadingSpinner(false))


    // } catch (error) {

    //     dispatch(LoadingSpinner(false))
    // }
  }
  // DesignApisReduxData?.DesignGetData.data.data


  

  return (
    <>
      <ul className='trendinglist'>

        {DesignApisReduxData?.GetDesignByFilterData?.data?.data?.map((items, id) => {
          console.log("dhvsds0", items)

          return <Trendinglist item={items} likeData={items?.isFavorite} imgUrl={item3} name="Men's Polo Shirt" id={id} setFavData={setFavData} />

        })}
        {/* <Trendinglist item={item3} name="Team USA Men’s Custom Polo Shirt" />
        <Trendinglist item={item3} name="Urban Polo Polo Shirt" />
        <Trendinglist item={item3} name="Prestige Polo Signature Line" />
        <Trendinglist item={item3} name="LuxeFit Polo Premium Range" />
        <Trendinglist item={item3} name="Men's Polo Shirt" />
        <Trendinglist item={item3} name="SleekPolo Everyday Classic" />
        <Trendinglist item={item3} name="Timeless Polo Vintage Revival" />
        <Trendinglist item={item3} name="VersaPolo Dynamic Comfort Series" /> */}


      </ul>
      <div className='designpeg'>

        <ReactPaginate
          previousLabel={"<"}
          i18nIsDynamicList={true}
          nextLabel={">"}
          pageCount={Math.ceil(DesignApisReduxData?.GetDesignByFilterData?.data?.count / itemsPerPage)}
          // pageCount={Math.ceil(10 / 2)}
          onPageChange={handlePageClick}
          forcePage={CurrentPage}
          // initialPage={ (parseInt(activeCurrentPage  - 1)) }
          disabledClassName={"disabled"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}

export default Tranding