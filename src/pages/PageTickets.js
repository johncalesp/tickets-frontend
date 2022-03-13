import React from 'react';
import Container from '@mui/material/Container';
import { TicketsTable } from '../components';

import { useUserContext } from '../context/user_context';

const PageTickets = () => {
  const {
    user: { accessToken, id },
  } = useUserContext();
  return (
    <Container maxWidth="lg">
      <div>
        <TicketsTable accessToken={accessToken} identifier={id} />
      </div>
    </Container>
  );
};

export default PageTickets;
