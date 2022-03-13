import React from 'react';
import styled from 'styled-components';
import { useStatsContext } from '../context/stats_context';
import Loading from './Loading';
import { Pie3D } from './charts';

const TicketCharts = () => {
  const {
    tickets: { user, data },
    loadingTickets,
  } = useStatsContext();

  const { objTicketStatus, objTechCount, objCloseDate, objAvgScore } =
    data.reduce(
      (attributes, item) => {
        // Count by Status
        const { technology, status, openDate, closeDate, satisfactionScore } =
          item;
        if (!attributes.objTicketStatus[status]) {
          attributes.objTicketStatus[status] = { label: status, value: 1 };
        } else {
          attributes.objTicketStatus[status].value += 1;
        }
        // Count by Technology
        if (!attributes.objTechCount[technology]) {
          attributes.objTechCount[technology] = {
            label: technology,
            value: 1,
          };
        } else {
          attributes.objTechCount[technology].value += 1;
        }
        // Avg time and score for closing a ticket
        if (status === 'Close') {
          const days =
            (new Date(closeDate) - new Date(openDate)) / (1000 * 3600 * 24);
          if (!attributes.objCloseDate[technology]) {
            attributes.objCloseDate[technology] = {
              label: technology,
              value: [days],
            };
          } else {
            attributes.objCloseDate[technology].value.push(days);
          }

          if (!attributes.objAvgScore[technology]) {
            attributes.objAvgScore[technology] = {
              label: technology,
              value: [satisfactionScore],
            };
          } else {
            attributes.objAvgScore[technology].value.push(satisfactionScore);
          }
        }
        return attributes;
      },
      {
        objTicketStatus: {},
        objTechCount: {},
        objCloseDate: {},
        objAvgScore: {},
      }
    );

  const arrTicketStatus = Object.values(objTicketStatus);
  const arrTechCount = Object.values(objTechCount);
  const arrAvgCloseDate = Object.values(objCloseDate).map((item) => {
    return {
      ...item,
      value: item.value.reduce((a, b) => a + b, 0) / item.value.length,
    };
  });
  const arrAvgScore = Object.values(objAvgScore).map((item) => {
    return {
      ...item,
      value: item.value.reduce((a, b) => a + b, 0) / item.value.length,
    };
  });
  // console.log(arrTicketStatus, arrTechCount, arrAvgCloseDate, arrAvgScore);

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
          {data.length === 0 && (
            <div className="container">
              <p>The user does not contain suffient information</p>
            </div>
          )}
          {data.length !== 0 && (
            <div className="container">
              <div className="grid">
                <div className="item">
                  <Pie3D
                    data={arrTicketStatus}
                    title={'Number of Open and Close Tickets'}
                  />
                </div>
                <div className="item">
                  <h1>Item2</h1>
                </div>
                <div className="item">
                  <h1>Item3</h1>
                </div>
                <div className="item">
                  <h1>Item4</h1>
                </div>
              </div>
            </div>
          )}
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
`;

export default TicketCharts;
