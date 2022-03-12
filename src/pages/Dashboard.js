import React, { useEffect } from 'react';
import { Search } from '../components';

import { useStatsContext } from '../context/stats_context';
import { useUserContext } from '../context/user_context';

const Dashboard = () => {
  const { user } = useUserContext();
  const { tickets,loadUsers, loadingUsers } = useStatsContext();

  useEffect(() => {
    loadUsers(user.accessToken);
  }, []);

  return <>
  {user.isAdmin && !loadingUsers && <Search />}
  </>;
};

export default Dashboard;
