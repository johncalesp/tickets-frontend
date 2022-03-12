import React from 'react';
import styled from 'styled-components';
import { useStatsContext } from '../context/stats_context';
import Loading from './Loading';

const TicketCharts = () => {
  const {
    tickets: { user, data },
    loadingTickets,
  } = useStatsContext();
  return (
    <>
      {loadingTickets ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="centered-h2">
            <h3>
              Graphical summary for {user.firstName} {user.lastName}
            </h3>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.section`
  .centered-h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export default TicketCharts;
