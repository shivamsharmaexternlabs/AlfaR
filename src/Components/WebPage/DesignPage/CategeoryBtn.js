import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { boolean } from 'yup'

const CategeoryBtn = ({ Categeorys, mainAllDataFun, listName, }) => {
 

  const [CategeoryData, setCategeoryData] = useState(Categeorys) 
  const locationPath = useLocation()


 
  let startFilterSplit = locationPath?.hash?.split("&filter=&")?.[1]
  let endFilterSplit = startFilterSplit?.split("&page=")?.[0]
  // let endFilterSplit = locationPath?.hash
console.log("djshdsdsd",endFilterSplit)

  const selectFiltersFun = (name) => { 
    mainAllDataFun(//1.2
      name
    )
  }


 


   

  useEffect(() => { 

    const parseInput = (input) => {
      // Remove the hash and split by '&'
      // const parts = input?.slice(1)?.split('&');
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

    // Log the output
    

    // ----------------------------------------
    const activeNamesMap = output.reduce((acc, category) => {
      if (!acc[category.categoryType]) {
        acc[category.categoryType] = new Set();
      }
      category.name.forEach(name => acc[category.categoryType].add(name));
      return acc;
    }, {});

    // Step 2: Update input1 based on the activeNamesMap
    const output1 = CategeoryData.map(item => {
      // Check if the item's name is in the set of active names for its categoryType
      const isActive = activeNamesMap[item.categoryType] && activeNamesMap[item.categoryType].has(item.name);
      return {
        ...item,
        active: isActive
      };
    });
    setCategeoryData(output1)


     


  }, [locationPath?.hash])

   

console.log("dmbhsdsds",CategeoryData)
   

  return (
    <>
      {CategeoryData?.map((items, id) => {

        return <button key={id} type='button' onClick={() => selectFiltersFun(items)} //1.1
          className={`${items?.active ? "active-filter-btn" : ""} categeoryBtn`}

        > {items?.name} </button>
      })}
    </>
  )
}

export default CategeoryBtn