import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Loading from './Loading';
import { useStatsContext } from '../context/stats_context';
import { useUserContext } from '../context/user_context';

const Search = () => {
  const { users, loadTickets, loadingUsers } = useStatsContext();
  const { user } = useUserContext();

  const [selected, setSelected] = useState(-1);
  const [listUsers, setListUsers] = useState(users);

  const handleChange = (e) => {
    const keyword = e.target.value;
    const filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.lastName.toLowerCase().includes(keyword.toLowerCase())
    );
    setListUsers(filteredUsers);
  };

  const handleUserSelection = (userId, firstName, lastName) => {
    setSelected(userId);
    loadTickets(user.accessToken, userId, firstName, lastName);
  };

  return (
    <Wrapper>
      {loadingUsers ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="grid">
            <div className="item">
              <TextField
                id="standard-basic"
                label="Find User"
                variant="standard"
                name="search"
                placeholder="Name or Lastname"
                sx={{ width: '100%' }}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <div className="list-users">
                <div className="engineers">
                  {listUsers.map((user) => {
                    const { id, firstName, lastName, img, email, isAdmin } =
                      user;
                    return (
                      !isAdmin && (
                        <article
                          key={id}
                          className={selected === id ? 'selected' : ''}
                        >
                          <img src={img} alt={firstName} />
                          <div className="card">
                            <div>
                              <h4>
                                {firstName} {lastName}
                              </h4>
                              <p>{email}</p>
                            </div>
                            <button
                              className="btn"
                              onClick={() =>
                                handleUserSelection(id, firstName, lastName)
                              }
                            >
                              Select
                            </button>
                          </div>
                        </article>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 375px;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0.25rem;
  }

  .grid {
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  .item {
    margin: 0.5rem;
    max-width: 370px;
    overflow: hidden;
  }

  @media (min-width: 500px) {
    .container {
      max-width: 1100px;
    }
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .list-users {
    background: #fff;
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    position: relative;
  }

  .list-users::before {
    content: ' Engineers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: #fff;
    color: hsl(210, 22%, 49%);
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: 0.1rem;
    font-size: 1rem;
  }

  .engineers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: all 0.3s linear;
    padding: 0.15rem 0.5rem;
    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .card {
    display: flex;
    justify-content: space-between;

    h4 {
      margin-bottom: 0;
    }
  }

  .selected {
    background-color: #ffcc99;
  }
`;

export default Search;
