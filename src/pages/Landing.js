import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/user_context';

const Landing = () => {
  const { userLogin } = useUserContext();

  useEffect(() => {
    userLogin(
      'leonekohler@surfeu.de',
      'U2FsdGVkX19KrDBnbPPLh0afqj5uu7+dQjIyUR0o+OM='
    );
  }, []);

  return <div>Landing</div>;
};

export default Landing;
