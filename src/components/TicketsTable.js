import React from 'react';
import TableGenerator from './TableGenerator';
import Rating from '@mui/material/Rating';

const TicketsTable = ({ accessToken, identifier }) => {
  const endpoint = 'tickets/all_tickets';
  const columns = [
    { field: 'technology', headerName: 'Library/Framework', minWidth: 200 },
    { field: 'status', headerName: 'Status', minWidth: 150 },
    { field: 'openDate', headerName: 'Open Date', minWidth: 200 },
    { field: 'closeDate', headerName: 'Close Date', minWidth: 200 },
    {
      field: 'satisfactionScore',
      headerName: 'Score',
      minWidth: 150,
      renderCell: (params) => {
        if (typeof params.value === 'string') {
          return params.value;
        } else {
          return (
            <Rating
              name="read-only"
              value={params.value}
              readOnly
              precision={0.5}
              size="small"
            />
          );
        }
      },
    },
  ];
  return (
    <TableGenerator
      accessToken={accessToken}
      identifier={identifier}
      endpoint={endpoint}
      columns={columns}
    />
  );
};

export default TicketsTable;
