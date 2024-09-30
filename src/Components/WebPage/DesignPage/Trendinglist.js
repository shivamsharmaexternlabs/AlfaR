import React from 'react'
import item3 from '../../Astes/item3.png'
import like from '../../Astes/like.svg'
import unlike from '../../Astes/unlike.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DesignGetSlice, FavoriteSlice } from '../../Redux/slices/DesignApis'

const Trendinglist = ({ item, imgUrl, setFavData, likeData }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let DesignApisReduxData = useSelector((state) => state?.DesignApisData);


  const FavFun = async (e, item) => {

    setFavData({ e, item })

    let resposeData = await dispatch(FavoriteSlice({
      "designId": item?._id,
      "isFavorite": !item?.isFavorite
    }))

    console.log("zdmvgsjd", resposeData)

    if (resposeData?.payload?.status == 200) {
      // dispatch(DesignGetSlice())
    }


    // dispatch(DesignGetSlice())
  }

  return (
    <>
      <li>
        <div className='itembox'>
          <img src={imgUrl} alt='item3' />
          <button type='button' className='likebtn' onClick={e => FavFun(e, item)}>

            {likeData == false ?
            //  <img src={like} alt='item?.designImageUrl' />
          <div >   🩶</div>

              : <div>
                ❤️</div>
            }

          </button>
        </div>
        <h3>{item?.name}</h3>
      </li>

    </>
  )
}

export default Trendinglist