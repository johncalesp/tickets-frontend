import React, { useContext, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext();
const URL = process.env.REACT_APP_BACKEND;

const getSessionStorage = () => {
  return sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
    : null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getSessionStorage());
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);

  const userLogin = async (email, password) => {
    await axios({
      method: 'post',
      url: `${URL}/api/users/login`,
      data: {
        email,
        password,
      },
    })
      .then((resp) => {
        const userData = resp.data.data;
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setErrorLogin(true);
      });
  };

  const updateUser = async (person) => {
    const { firstName, lastName, phone, address, city, province } = person;
    await axios({
      method: 'post',
      url: `${URL}/api/users/update_user`,
      headers: { 'x-access-token': user.accessToken },
      data: {
        id: user.id,
        firstName,
        lastName,
        phone,
        address,
        city,
        province,
      },
    })
      .then((resp) => {
        setUser({
          ...user,
          firstName,
          lastName,
          phone,
          address,
          city,
          province,
        });
        setErrorUpdate(false);
      })
      .catch((e) => {
        setErrorUpdate(true);
        console.log(e);
      });
  };

  const userLogout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        errorLogin,
        errorUpdate,
        userLogout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
