import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Search, TicketCharts } from '../components';

import { useStatsContext } from '../context/stats_context';
import { useUserContext } from '../context/user_context';

const Dashboard = () => {
  const { user } = useUserContext();
  const { tickets, loadUsers, loadingUsers } = useStatsContext();

  useEffect(() => {
    if (user.isAdmin) {
      loadUsers(user.accessToken);
    } else {
    }
  }, []);

  return (
    <>
      {user.isAdmin && !loadingUsers && <Search />}
      {tickets === null ? (
        <Wrapper>
          <div className="centered-h2">
            <h2>Please select a user to load the information</h2>
          </div>
        </Wrapper>
      ) : (
        <TicketCharts />
      )}
    </>
  );
};

const Wrapper = styled.section`
  .centered-h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.5rem;
    margin: 1rem;
  }
`;

export default Dashboard;
