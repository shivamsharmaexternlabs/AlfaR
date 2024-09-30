import React, { useEffect, useState } from 'react'
import search from '../../Astes/Search.svg'
import icon1 from '../../Astes/icon1.svg'
import icon12 from '../../Astes/icon12.svg'
import icon13 from '../../Astes/icon13.svg'
import icon14 from '../../Astes/icon14.svg'
import CategeoryBtn from './CategeoryBtn'
import CategeoryList from './CategeoryList'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleEffectOnSearchClickPaginationSlice } from '../../Redux/slices/Toggles-Values'
import { GetDesignByFilterSlice } from '../../Redux/slices/DesignApis'
import useDebouncing from '../ReusableComponents/useDebouncing'

// start with 1.1 is the simple senerio when you click the button the routes will work with filter route
// start with 2.1 is the senario when parameter is available with filter the data will not earse from the param after referesh the page 
// note -just reverse the operation after the refrace

const DesignSiderbar = ({ activeTabValue }) => {



    const [filterValues, setfilterValues] = useState([])
    const [paramPath, setParamPath] = useState("")
    const [paramPathFilterData, setParamPathFilterData] = useState([])
    // const [SeachFilterValue, setSeachFilterValue] = useState("")
    // const debouncingData =useDebouncing()
    const [SeachFilterValue, debouncingFun] = useDebouncing("");
    // debouncingData
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const locationPath = useLocation()

    let TogglesValuesReduxData = useSelector((state) => state?.TogglesValuesData);
    let DesignApisReduxData = useSelector((state) => state?.DesignApisData);



    const Gander = [{ name: "Unisex", active: false, categoryType: "gander" }, { name: "Woman", active: false, categoryType: "gander" }, { name: "Man", active: false, categoryType: "gander" }, { name: "Kids", active: false, categoryType: "gander" }]

    const Category = [{ name: "T-shirt", active: false, categoryType: "category" }, { name: "Jeans", active: false, categoryType: "category" }, { name: "Short-Pants", active: false, categoryType: "category" }]

    const Fabric = [{ name: "Denim", active: false, categoryType: "fabric" }, { name: "Cotton", active: false, categoryType: "fabric" }, { name: "Satin", active: false, categoryType: "fabric" }, { name: "Spandex", active: false, categoryType: "fabric" }]

    let ganderParam = locationPath?.hash?.split("#search?=")?.[1]?.split("&")?.[0]



    let startFilterSplit = locationPath?.hash?.split("&filter=&")?.[1]
    let endFilterSplit = startFilterSplit?.split("&page=")?.[0]

    let PaginationFromUrl = locationPath?.hash?.split("&page=")?.[1]


    const newFuntest = (items) => {
        dispatch(ToggleEffectOnSearchClickPaginationSlice(true)) //1.4  
        setfilterValues([...filterValues, items])

    }




    useEffect(() => {

        // 1.5 this useEffect will arange the data with specific category 
        const countMap = filterValues.reduce((acc, item) => {

            if (!acc[item.categoryType]) {
                acc[item.categoryType] = {};
            }
            if (!acc[item.categoryType][item.name]) {
                acc[item.categoryType][item.name] = 0;
            }
            acc[item.categoryType][item.name]++;
            return acc;

        }, {});


        // Step 2: Filter names based on their counts
        const filtered = Object.keys(countMap).map(categoryType => {
            const names = Object.keys(countMap[categoryType]).filter(name => countMap[categoryType][name] % 2 === 1);
            return {
                categoryType: categoryType,
                name: names
            };
        });

        const finalOutput = filtered.filter(obj => obj.name.length > 0);

        setParamPathFilterData(finalOutput)





    }, [filterValues])







    useEffect(() => {



        //1.6 this will make url according to  the category 


        const queryParams = paramPathFilterData?.map(category => {

            return `${category?.categoryType}=${category?.name?.join(',')}`;
        })?.join('&');

        setParamPath(queryParams)


    }, [paramPathFilterData,])







console.log("khbdfdfg",TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData)

    useEffect(() => {

        let orderPayload = {
            search: SeachFilterValue,
            page: PaginationFromUrl,
            filter: paramPath
        }
 


        if (TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData !== "") { // run when you click the button only  or search or pagination //1.7


             
                console.log("khbdfdfg--------ooooooooo",activeTabValue)
                navigate(`/design?#${SeachFilterValue == undefined || SeachFilterValue == "" ? "" : "search?=" + SeachFilterValue}${paramPath == "" ? "" : "&filter=&" + paramPath}&page=${TogglesValuesReduxData?.PaginationPageValueData}`)
           
            //   navigate(`/design?#${SeachFilterValue == undefined || SeachFilterValue == "" ? "" : "search?="+SeachFilterValue}&filter=&${paramPath}&page=${TogglesValuesReduxData?.PaginationPageValueData}`)


            // let orderPayload = {
            //     search: SeachFilterValue,
            //     page: TogglesValuesReduxData?.PaginationPageValueData,
            //     filter: paramPath
            // }


            dispatch(GetDesignByFilterSlice(orderPayload))

        }
        else {
            dispatch(GetDesignByFilterSlice(orderPayload))

        }

    }, [TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData, paramPath, SeachFilterValue, TogglesValuesReduxData, DesignApisReduxData?.FavoriteData, PaginationFromUrl])


    console.log("ndghhcjsdfsd", DesignApisReduxData?.FavoriteData)


    useEffect(() => {
        //  2.1 - when you refrace the page this use effect will run and the params will convert in to the json formate

        // state has some value and paras also have some value

        const parseInput = (input) => {
            // Remove the hash and split by '&'
            const parts = input?.split('&');

            // Initialize the result array
            const result = [];

            // Iterate over the parts
            parts?.forEach(part => {
                // Split by '=' to get the categoryType and names
                const [categoryType, names] = part.split('=');

                if (categoryType && names) {
                    // Split names by ',' and trim whitespace
                    const nameArray = names.split(',').map(name => name.trim());

                    // Add to result
                    result.push({
                        categoryType,
                        name: nameArray
                    });
                }
            });

            return result;
        };



        // Get the output
        const output = parseInput(endFilterSplit);


        const outputFromUrl = output.flatMap(item => {
            if (item.categoryType === "gander") {
                return item.name.map((name, index) => ({
                    name,
                    active: index === 0, // Set 'active' to true for the first item, false otherwise
                    categoryType: item.categoryType
                }));
            } else if (item.categoryType === "category") {
                return item.name.map((name, index) => ({
                    name,
                    active: index === 0,
                    categoryType: item.categoryType
                }));
            }
            else if (item.categoryType === "fabric") {
                return item.name.map((name, index) => ({
                    name,
                    active: index === 0,
                    categoryType: item.categoryType
                }));
            }
            else if (item.categoryType === "pagination") {
                return item.name.map((name, index) => ({
                    name,
                    active: index === 0,
                    categoryType: item.categoryType
                }));
            }
            else if (item.categoryType === "search") {
                return item.name.map((name, index) => ({
                    name,
                    active: index === 0,
                    categoryType: item.categoryType
                }));
            }
            return []; // Return an empty array if the categoryType is neither "gander" nor "category"
        });





        if (TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData !== false && TogglesValuesReduxData?.ToggleEffectOnSearchClickPaginationData !== true) {

            setfilterValues(outputFromUrl)
            // setSeachFilterValue(ganderParam)
            debouncingFun(ganderParam)


        }
    }, [locationPath?.hash])




    const SeachFilterFun = (e) => {
        dispatch(ToggleEffectOnSearchClickPaginationSlice(true)) // this will active the navigation to search

        // setSeachFilterValue(e.target.value)
        debouncingFun(e.target.value)


    }




    return (
        <>
            <div className='sidebar'>
                <div className='searchbox'>
                    <img src={search} alt='img' />


                    <input type='search' placeholder='Denim'
                        // value={SeachFilterValue}
                        className='form-control' onChange={(e) => SeachFilterFun(e)} />
                </div>
                <ul className='categeorylist'>

                    <CategeoryList icon={icon1} listName='Select Gander' showView={false}
                        Categeorys={Gander} newFuntest={newFuntest} />


                    <CategeoryList icon={icon12} listName='Category' showView={true}
                        Categeorys={Category} newFuntest={newFuntest} />

                    <CategeoryList icon={icon13} listName='Select Colors' showView={true}
                        newFuntest={newFuntest}
                        Color={true} />

                    <CategeoryList icon={icon14} listName='Select Fabric' showView={true}
                        Categeorys={Fabric} newFuntest={newFuntest} />
                </ul>

                {/* <button type='button' className='applybtn'> Apply Filter </button> */}


            </div>

        </>

    )
}

export default DesignSiderbar