import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Landing = () => {
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <main className="landing">
        <section className="text">
          <h1>Chinook DB</h1>
          <p>
            This is a website designed to connect to Chinook DB which contains
            different tables about users,tracks, albumns, artists and invoices.
          </p>
          <div className="login-buttons">
            <div to="/login">
              <button className="btn">Login</button>
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .landing {
    background: url('https://www.scnsoft.com/blog-pictures/crm-pics/automated-ticketing-system.png')
      no-repeat center center/cover;
    height: 100vh;
    position: relative;
    color: #fff;
  }

  .landing::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .landing * {
    z-index: 10;
  }

  .landing .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    margin: auto;
    height: 100%;
    text-align: center;
    h1 {
      font-size: 3rem;
    }
    p {
      margin-top: 2rem;
      font-size: 1.5rem;
    }
  }

  .landing .login-buttons {
    display: flex;
    margin-top: 2rem;
    button {
      font-size: 1.2rem;
      margin: 0 2rem;
    }
  }
`;

export default Landing;
