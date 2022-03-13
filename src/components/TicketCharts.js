import React from 'react';
import styled from 'styled-components';
import { useStatsContext } from '../context/stats_context';
import Loading from './Loading';
import { Pie3D, Column3D, Bar3D } from './charts';

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
  const arrAvgCloseDate = Object.values(objCloseDate)
    .map((item) => {
      return {
        ...item,
        value: item.value.reduce((a, b) => a + b, 0) / item.value.length,
      };
    })
    .sort((a, b) => b.value - a.value);
  const arrAvgScore = Object.values(objAvgScore)
    .map((item) => {
      return {
        ...item,
        value: item.value.reduce((a, b) => a + b, 0) / item.value.length,
      };
    })
    .sort((a, b) => b.value - a.value);
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
              <p>The user does not contain sufficient information</p>
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
                  <Column3D
                    data={arrTechCount}
                    title={'Number of Tickets by Library/Framework'}
                    xlabel={'Library/Framework'}
                    ylabel={'Count'}
                  />
                </div>
                <div className="item">
                  <Bar3D
                    data={arrAvgCloseDate}
                    title={
                      'Average Number of days to close a ticket by Library/Framework'
                    }
                    ylabel={'Library/Framework'}
                    xlabel={'Number of days'}
                  />
                </div>
                <div className="item">
                  <Bar3D
                    data={arrAvgScore}
                    title={
                      'Average Customer Satisfaction Score by Library/Framework (1 - 5 Scale)'
                    }
                    ylabel={'Library/Framework'}
                    xlabel={'Number of Stars'}
                  />
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
  margin-top: 1rem;
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
    .item {
      max-width: 500px;
    }
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default TicketCharts;
