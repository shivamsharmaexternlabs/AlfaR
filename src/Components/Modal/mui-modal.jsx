import React from 'react';
import { Modal, Box } from '@mui/material';
import DateComponent from './RawDataComponent';
import RawDataComponent from './RawDataComponent';
import DayEndBalance from '../Popup/DayEndBalance';
import DayEndBalanceComponent from './DayEndBalanceComponent';
import SummaryReportComponent from './SummaryReportComponent';
const DynamicModal = ({ open, handleClose, ContentComponent,handleDownloadRawData,handleDownloadSummaryCsv,rawDataPopup,dayBalancePopup,summeryReportToggle, customerId , loadingValue}) => {
  console.log(customerId)
    const stopPropagation = (event) => {
        event.stopPropagation();
      };
  return (
    <Modal open={open} onClose={handleClose} className='popup'>
      <Box
              onClick={stopPropagation}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          p: 1,
        }}
      >
        {rawDataPopup && <RawDataComponent handleClose={handleClose} handleDownloadRawData={handleDownloadRawData} customerId={customerId} loadingValue={loadingValue} />}
        {dayBalancePopup && <DayEndBalanceComponent handleClose={handleClose}  />}
        {summeryReportToggle && <SummaryReportComponent handleClose={handleClose} handleDownloadSummaryCsv={handleDownloadSummaryCsv} customerId={customerId} loadingValue={loadingValue} />}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
