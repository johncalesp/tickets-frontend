import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const PAGE_SIZE = 10;

const TableGenerator = ({ accessToken, identifier, endpoint, columns }) => {
  const [totalNumPages, setTotalNumPages] = React.useState(1);
  const [totalNumItems, setTotalNumItems] = React.useState(1);

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const loadServerRows = async (identifier, pageNum, accessToken, endpoint) => {
    const url =
      process.env.REACT_APP_BACKEND +
      `/api/${endpoint}/${identifier}/${Number(pageNum) + 1}`;

    await axios
      .get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((resp) => {
        if (endpoint === 'invoice_customer') {
          setRows(
            resp.data.data.map((item) => {
              const id = item.InvoiceId;
              const parsedDate = new Date(item.InvoiceDate).toDateString();
              return {
                ...item,
                InvoiceDate: parsedDate,
                id,
              };
            })
          );
        } else if (
          endpoint === 'tracks_not_owned' ||
          endpoint === 'tracks_by_customers' ||
          endpoint === 'tracks_by_invoice'
        ) {
          setRows(
            resp.data.data.map((item) => {
              const id = item.TrackId;
              return {
                ...item,
                id,
              };
            })
          );
        }
        setLoading(false);
        setTotalNumPages(resp.data.pages);
        setTotalNumItems(resp.data.totalItems);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalNumPages) setPage(newPage);
  };

  React.useEffect(() => {
    setLoading(true);
    loadServerRows(identifier, page, accessToken, endpoint);
  }, [identifier, page, accessToken, endpoint]);

  return (
    <div style={{ width: '100%', marginTop: '2rem' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pagination
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        rowCount={totalNumItems}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={loading}
        disableSelectionOnClick
      />
    </div>
  );
};

export default TableGenerator;
