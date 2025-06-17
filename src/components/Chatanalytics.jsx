import React, { useState, useEffect } from "react";
import line1 from "../assets/img/No.png";
import line2 from "../assets/img/Yes.png";
import line3 from "../assets/img/Vector 124.png";
import icon1 from "../assets/img/icon1.png";
import icon2 from "../assets/img/icon2.png";
import icon3 from "../assets/img/icon3.png";
import Chatgraph from "../components/Chatgraph";
function convertTo12HourFormat(time24) {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 to 12 for midnight and 13-23 to 1-11

  return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
}
function Dashboardcard({ number, icon, line, heading, value, comment, onClick }) {
  return (
    <div className={`p-4 analytics-card-${number}`} onClick={onClick} style={{ cursor: "pointer" }}>
      <div>
        <h5>{heading}</h5>
        <h2 style={{ fontSize: '26px' }}>
          <b>{value}</b>
        </h2>
        <p>
          <i className="fa-solid fa-arrow-trend-up"></i> {comment}
        </p>
        <img src={icon} className="img-fluid card-message-icon" alt="" />
        <div className="line-wrap">
          <img src={line} alt="" className="img-fluid " />
        </div>
      </div>
    </div>
  );
}

function Chatanalytics() {
  const [modalData, setModalData] = useState(null);
  const [totalChatsData, setTotalChatsData] = useState(null);
  const [uniqueUsersData, setUniqueUsersData] = useState(null);
  const [peakTimesData, setPeakTimesData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchMetric = async (metric) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/chat/chat_analysis?include=${metric}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${metric} data:`, error);
        return null;
      }
    };

    const fetchAllData = async () => {
      const [totalChats, uniqueUsers, peakTimes] = await Promise.all([
        fetchMetric('chat_count'),
        fetchMetric('unique_users'),
        fetchMetric('peak_times'),
      ]);
      console.log('Total Chats API Response:', totalChats);
      console.log('Unique Users API Response:', uniqueUsers);
      console.log('Peak Times API Response:', peakTimes);
      setTotalChatsData(totalChats);
      setUniqueUsersData(uniqueUsers);
      setPeakTimesData(peakTimes);
    };

    fetchAllData();
  }, []);

  const handleCardClick = (data) => {
    setModalData(data);
    console.log('Graph Data:', data);
  };

  const closeModal = () => setModalData(null);

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-md-12">
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="row g-4">
          {totalChatsData && (
            <div className="col-12 col-md-6 col-xl-4">
              <Dashboardcard
                number="one"
                icon={icon1}
                line={line1}
                heading="Total Chats"
                value={totalChatsData.total_chats}
                comment={`${totalChatsData.total_chats_percentage_change} change`}
                onClick={() => handleCardClick({
                  heading: "Total Chats",
                  value: totalChatsData.total_chats,
                  comment: `${totalChatsData.total_chats_percentage_change} change`,
                })}
              />
            </div>
          )}
          {uniqueUsersData && (
            <div className="col-12 col-md-6 col-xl-4">
              <Dashboardcard
                number="two"
                icon={icon2}
                line={line2}
                heading="Unique Users"
                value={uniqueUsersData.unique_users}
                comment={`${uniqueUsersData.unique_users_percentage_change} change`}
                onClick={() => handleCardClick({
                  heading: "Unique Users",
                  value: uniqueUsersData.unique_users,
                  comment: `${uniqueUsersData.unique_users_percentage_change} change`,
                })}
              />
            </div>
          )}
          {peakTimesData && (
            <div className="col-12 col-md-6 col-xl-4">
              <Dashboardcard
                number="three"
                icon={icon3}
                line={line3}
                heading="Peak Times"
                value={`${convertTo12HourFormat(peakTimesData.peak_times.start_time)} - ${convertTo12HourFormat(peakTimesData.peak_times.end_time)}`}
                comment={`Data for ${peakTimesData.peak_times.peak_hours_count} peak hours`}
                onClick={() => handleCardClick({
                  heading: "Peak Times",
                  value: `${peakTimesData.peak_times} - ${peakTimesData.peak_times} users`,
                  comment: `Data for ${peakTimesData.peak_times} peak hours`,
                })}
              />
            </div>
          )}
        </div>
      </div>

      {modalData && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: '#00000082' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content card-modal">
              <div className="modal-header">
                <h5 className="modal-title">{modalData.heading}</h5>
                <button type="button" className="card-close-btn btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <Chatgraph graphdata={modalData.heading} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatanalytics;
