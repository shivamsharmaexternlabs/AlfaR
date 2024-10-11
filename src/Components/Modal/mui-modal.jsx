import React from 'react';
import { Modal, Box } from '@mui/material';
import DateComponent from './datepicker';
const DynamicModal = ({ open, handleClose, ContentComponent }) => {
    const stopPropagation = (event) => {
        event.stopPropagation();
      };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
              onClick={stopPropagation}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        {<DateComponent/>}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
