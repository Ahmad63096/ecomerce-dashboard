import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

function Chatgraph({ graphdata }) {
  const [chartType, setChartType] = useState("line");
  const [graphData, setGraphData] = useState({
    heading: "Monthly Data",
    labels: [],
    dataValues: [],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');
        const apiInclude =
          graphdata === "Total Chats"
            ? "chat_count"
            : graphdata === "Unique Users"
              ? "unique_users"
              : graphdata === "Peak Times"
                ? "peak_times"
                : "";
        const apiUrl = `https://ecom.devspandas.com/api/chat/chat-stats?include=${apiInclude}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData = await response.json();
        console.log("Raw API Response:", apiData);
        let labels = [];
        let dataValues = [];
        if (graphdata === "Total Chats") {
          const rawData = apiData.chat_counts || {};
          labels = Object.keys(rawData);
          dataValues = Object.values(rawData);
          setGraphData({
            heading: "Monthly Chat Count",
            labels,
            dataValues,
          });
        } else if (graphdata === "Unique Users") {
          const rawData = apiData.unique_users_counts || {};
          labels = Object.keys(rawData);
          dataValues = Object.values(rawData);
          setGraphData({
            heading: "Monthly Unique Users",
            labels,
            dataValues,
          });
        } else if (graphdata === "Peak Times") {
          const rawData = apiData.peak_times || {};
          labels = Object.keys(rawData);
          dataValues = Object.values(rawData);
          setGraphData({
            heading: "Chat Volume by Time Range",
            labels,
            dataValues,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [graphdata]);
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: graphData.heading,
        data: graphData.dataValues,
        borderColor: (ctx) => {
          const gradientBorder = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradientBorder.addColorStop(0, "rgba(233, 58, 99, 1)");
          gradientBorder.addColorStop(1, "rgba(89, 12, 214, 0.41)");
          return gradientBorder;
        },
        backgroundColor: (ctx) => {
          const gradientBg = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradientBg.addColorStop(0, "rgba(233, 58, 99, 1)");
          gradientBg.addColorStop(1, "rgba(89, 12, 214, 0.41)");
          return gradientBg;
        },
        hoverBackgroundColor: "rgba(89, 12, 214, 0.41)",
        fill: chartType === "line",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#E93A63",
        pointBorderColor: "#E93A63",
        pointHoverBackgroundColor: "rgba(89, 12, 214, 0.41)",
        pointHoverBorderColor: "rgba(89, 12, 214, 0.41)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#7c7f87",
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#7c7f87",
        bodyColor: "#7c7f87",
        borderColor: "#24D3DC",
        borderWidth: 1,
      },
    },
    scales: chartType !== "pie" && {
      y: {
        suggestedMin: 0,
        suggestedMax: Math.max(...graphData.dataValues) + 10,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}`,
          color: "#7c7f87",
        },
        grid: {
          color: "#444",
        },
      },
      x: {
        ticks: {
          color: "#7c7f87",
        },
        grid: {
          color: "#444",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };
  const renderChart = () => {
    if (chartType === "line") return <Line data={data} options={options} />;
    if (chartType === "bar") return <Bar data={data} options={options} />;
    if (chartType === "pie") return <Pie data={data} options={options} />;
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button className="graph-cat-btn" onClick={() => setChartType("line")}>
          Line Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("bar")}>
          Bar Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("pie")}>
          Pie Chart
        </button>
      </div>
      <div style={{ display: "flex", width: "90%", height: "80%", maxHeight: "100%", position: "relative", margin: "auto", }}>
        {renderChart()}
      </div>
    </div>
  );
}
export default Chatgraph;