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
      `/api/${endpoint}/${identifier}/${Number(pageNum) + 1}/${PAGE_SIZE}`;

    await axios
      .get(url, { headers: { 'x-access-token': accessToken } })
      .then((resp) => {
        setRows(
          resp.data.data.map((item) => {
            let {
              id,
              technology,
              status,
              openDate,
              closeDate,
              satisfactionScore,
            } = item;
            openDate = new Date(openDate).toDateString();
            if (status === 'Close') {
              closeDate = new Date(closeDate).toDateString();
            } else {
              closeDate = 'TBD';
              satisfactionScore = 'TBD';
            }
            return {
              id,
              technology,
              status,
              openDate,
              closeDate,
              satisfactionScore,
            };
          })
        );
        setLoading(false);
        setTotalNumPages(resp.data.numPages);
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
