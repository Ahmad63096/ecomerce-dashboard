import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart() {
  const [labels, setLabels] = useState([])
  const [dataValues, setDataValues] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${process.env.REACT_APP_API}/chat/chat-stats?include=chat_count`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('graph response is :', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const rawData = result.chat_counts || {};

        const months = Object.keys(rawData).map((key) => {
          return key.split(' ')[1].slice(0, 3);
        });

        const counts = Object.values(rawData);

        setLabels(months);
        setDataValues(counts);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchData();
  }, []);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Chats',
        data: dataValues,
        borderColor: '#ff007f',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 2,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'white',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...dataValues, 10) + 10,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value
          },
          autoSkip: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h6 className="mb-0">Monthly Chats</h6>
        <Link to="/analytics">Show All</Link>
      </div>
      <Line data={data} options={options} height={250} />
    </>
  )
}

export default Chart