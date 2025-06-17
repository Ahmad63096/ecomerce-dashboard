import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  const [labels, setLabels] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [dropoffsData, setDropoffsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');

        // Fetch leads
        const leadsRes = await fetch(`${process.env.REACT_APP_API}/chat/leads_data?type=leads`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const leadsResult = await leadsRes.json();

        // Fetch dropoffs
        const dropoffsRes = await fetch(`${process.env.REACT_APP_API}/chat/leads_data?type=dropoffs`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dropoffsResult = await dropoffsRes.json();

        // Normalize months and aggregate
        const monthMap = new Map();

        leadsResult.forEach(({ Month, leads }) => {
          monthMap.set(Month, { leads: leads || 0, dropoffs: 0 });
        });

        dropoffsResult.forEach(({ Month, Chat }) => {
          if (!monthMap.has(Month)) {
            monthMap.set(Month, { leads: 0, dropoffs: Chat || 0 });
          } else {
            monthMap.get(Month).dropoffs = Chat || 0;
          }
        });

        const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => {
          return new Date(`1 ${a}`) - new Date(`1 ${b}`);
        });

        const finalLabels = sortedMonths.map(m => {
          const [month, year] = m.split(' ');
          return month.slice(0, 3) + ' ' + year;
        });

        const leadsArr = sortedMonths.map(m => monthMap.get(m).leads);
        const dropoffsArr = sortedMonths.map(m => monthMap.get(m).dropoffs);

        setLabels(finalLabels);
        setLeadsData(leadsArr);
        setDropoffsData(dropoffsArr);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    }

    fetchData();
  }, []);

  const createChartData = (label, data, color) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`, // translucent fill
        fill: true,
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: 'white',
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color,
      },
    ],
  });

  const options = (label) => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: label },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...(label === 'Monthly Leads' ? leadsData : dropoffsData), 10) + 5,
        ticks: { stepSize: 1 },
      },
    },
  });

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row">
        <div className="col-md-6">
          <div className='p-4 rounded align-items-center justify-content-center'>
            <Line data={createChartData('Monthly Leads', leadsData, '#ff007f')} options={options('Monthly Leads')} height={250} />
          </div>
        </div>
        <div className="col-md-6">
          <div className='p-4 rounded align-items-center justify-content-center'>
            <Line data={createChartData('Monthly Dropoffs', dropoffsData, '#007fff')} options={options('Monthly Dropoffs')} height={250} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
