import React, { useContext, useState } from 'react';
import axios from 'axios';

const StatsContext = React.createContext();
const URL = process.env.REACT_APP_BACKEND;

export const StatsProvider = ({ children }) => {
  const [tickets, setTickets] = useState(null);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const loadUsers = async (accessToken) => {
    setLoadingUsers(true);
    await axios({
      method: 'get',
      url: `${URL}/api/users/all_users`,
      headers: { 'x-access-token': accessToken },
    })
      .then((resp) => {
        setUsers(resp.data.data);
        setLoadingUsers(false);
      })
      .catch((err) => console.log(err));
  };

  const loadTickets = async (accessToken, userId, firstName, lastName) => {
    setLoadingTickets(true);
    await axios({
      method: 'get',
      url: `${URL}/api/tickets/all_tickets/${userId}`,
      headers: { 'x-access-token': accessToken },
    })
      .then((resp) => {
        setTickets({ user: { firstName, lastName }, data: resp.data.data });
        setLoadingTickets(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <StatsContext.Provider
      value={{
        users,
        loadUsers,
        tickets,
        loadTickets,
        loadingTickets,
        loadingUsers,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStatsContext = () => {
  return useContext(StatsContext);
};
