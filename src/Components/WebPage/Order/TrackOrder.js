import React from 'react'
import TrackOrderTable from './TrackOrderTable'
import ReactPaginate from 'react-paginate';


const TrackOrder = () => {

    return (
        <>
            <div className="trackOrderTable">
                <table>
                    <tr>
                        <th>ORDER</th>
                        <th>SKU</th>
                        <th>ORDER STATUS</th>
                        <th>TARGET</th>
                        <th>PRODUCED</th>
                        <th>DELIVERY TIME</th>
                        <th>PRODUCTION STATUS</th>
                    </tr>
                    <TrackOrderTable order={'ORDER 1'} sku={'#tshirt 1238'} status={'Delivery'} target={400} produced={'78%'}
                        time={'Feb 14, 2024'} bgColor={'#11B718'} />
                    <TrackOrderTable order={'ORDER 2'} sku={'#tshirt 2245'} status={'Order Placed'} target={400} produced={'78%'}
                        time={'Feb 14, 2024'} bgColor={'#FC993D'} />
                    <TrackOrderTable order={'ORDER 3'} sku={'#tshirt 3345'} status={'Quality Control'} target={2890} produced={'98%'}
                        time={'Feb 18, 2024'} bgColor={'#FC3D3D'} />

                </table>

                <ReactPaginate
                    previousLabel={"Previous"}
                    i18nIsDynamicList={true}
                    nextLabel={"Next"}
                    // pageCount={Math.ceil(superviserData?.count / itemsPerPage)}
                    // onPageChange={handlePageClick}
                    // forcePage={CurrentPage}
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

export default TrackOrder