import React, { useEffect, useState } from "react";
import user from "../assets/img/user.jpg";
import qubit from "../assets/img/qubit.png";
import { Link } from "react-router-dom";
// import handleDownload from "./Functions";
const formatTimeAgo = (date) => {
  const now = new Date();
  const timeDiff = now - new Date(date);
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else {
    return new Date(date).toLocaleDateString();
  }
};
function Chatlog() {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.REACT_APP_API}/chat/fetch_chats?page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response data is:", data);
        setChats(data.chats);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  const toggleSortDirection = () => {
    setSortAscending((prev) => !prev);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() !== "") {
        setIsSearching(true);
        const token = localStorage.getItem("authToken");
        fetch(`${process.env.REACT_APP_API}/chat/search_recent_chats?query=${encodeURIComponent(searchTerm)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Search request failed");
            }
            return response.json();
          })
          .then((data) => {
            setChats(data.chats || []);
          })
          .catch((error) => {
            console.error("Search error:", error);
          })
          .finally(() => {
            setIsSearching(false);
          });
      }
    }
  };
  return (
    <div className="chatlog-container">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="mb-0" style={{ width: "85%" }}>Chat Logs</h5>
        <button className="btn btn-outline-secondary me-2" onClick={toggleSortDirection}>
          <i className={`fa - solid ${sortAscending ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
        </button>
        <Link to="/log">Show All</Link>
      </div>
      <div className="search-box-container my-3">
        <div className="input-group">
          <span className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control search-box"
            placeholder="Search chat logs..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="chat-log-scroll">
        {[...chats]
          .sort((a, b) => {
            const dateA = new Date(a.metadata?.last_updated || a.last_updated || 0);
            const dateB = new Date(b.metadata?.last_updated || b.last_updated || 0);
            return sortAscending ? dateA - dateB : dateB - dateA;
          })
          .map((chat) => (
            <div key={chat.session_id} className="chat-item">
              <div className="d-flex align-items-center pt-3">
                <img
                  className="rounded-circle flex-shrink-0"
                  src={user}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">{chat.user_email || "Unknown Client"}</h6>
                    <div className="d-flex justify-content-between">
                      <span className="icons-margin">{formatTimeAgo(chat.metadata?.last_updated || chat.last_updated || new Date())}</span>
                      {/*<span className="icons-margin">
                         <i
                          className="fa-solid fa-ellipsis ellipsis-pointer"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></i> 
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleDownload(chat._id, "pdf")}
                            >
                              <i className="fa-solid fa-file-pdf"></i> Download PDF
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleDownload(chat._id, "csv")}
                            >
                              <i className="fa-solid fa-file-csv"></i> Download CSV
                            </button>
                          </li>
                        </ul>
                      </span>*/}
                    </div>
                  </div>
                  <span>{chat.conversation[0]?.client_message || "No messages"}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2 border-bottom pb-3">
                <div className="col-1">{new Date(chat.metadata?.last_updated || chat.last_updated || new Date()).toLocaleDateString()}</div>
                <div className="col-9 d-flex align-items-end flex-column mt-3">
                  <span>QUBIT</span>
                  <p
                    className="truncated-text"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseText-${chat.session_id}`}
                    aria-expanded="false"
                    aria-controls={`collapseText-${chat.session_id}`}
                    style={{ cursor: "pointer", marginBottom: "0", textAlign: "end" }}
                  >

                    {chat.conversation[0]?.message || "No response available"}
                  </p>
                  <div
                    id={`collapseText-${chat.session_id}`}
                    className="collapse mt-2"
                  >
                    <p style={{ textAlign: "end" }}>
                      {chat.conversation[1]?.message || "No additional response"}
                    </p>
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <img src={qubit} alt="" style={{ width: "50px", height: "50px" }} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Chatlog;
export { formatTimeAgo };