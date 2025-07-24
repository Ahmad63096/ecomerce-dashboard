import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Notification() {
  const [notifications, setNotifications] = useState([]);
   // eslint-disable-next-line
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_API_NOTIFICATION);
    setSocket(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log('notification', message);
      if (message.event === "new_chat") {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          'New chat received'
        ]);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <>
      <Link
        to="#"
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        <i className="fa fa-bell me-lg-2"></i>
        <span className="d-none d-lg-inline-flex">Notifications</span>
      </Link>
      <div className="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Link to="#" className="dropdown-item" key={index}>
              <h6 className="fw-normal mb-0">{notification}</h6>
            </Link>
          ))
        ) : (
          <Link to="#" className="dropdown-item text-center">
            No new notifications
          </Link>
        )}
      </div>
    </>
  );
}

export default Notification;