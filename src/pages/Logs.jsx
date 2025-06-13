import React, { useState, useEffect } from 'react';
function Logs() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
    fetch(`https://ecom.devspandas.com/api/chat/fetch_chats?page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        const fetchedChats = data.chats || [];
        setChats(fetchedChats);
        setTotalPages(data.total_pages || 1);
        if (fetchedChats.length > 0) {
          setSelectedChat(fetchedChats[0]);
        } else {
          setSelectedChat(null);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);
  const handleDownload = async (fileType, objectId, name) => {
    if (!objectId) return;
    const token = localStorage.getItem("authToken");
    const url = `https://ecom.devspandas.com/api/export/export-file/?file_type=${fileType}&object_id=${objectId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token here
        },
      });

      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const extension = fileType.toLowerCase() === 'pdf' ? 'pdf' : 'csv';
      link.download = `${name}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
  };
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://ecom.devspandas.com/api/chat/search_chats?query=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const results = data.chats || [];
      setChats(results);
      setTotalPages(1); // You can update this if your search returns pages
      setCurrentPage(1);
      setSelectedChat(results.length > 0 ? results[0] : null);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 rounded p-4" id="style-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-1" style={{ textTransform: 'capitalize' }}>Sessions</h6>
              </div>
              <form
                className="d-none d-md-flex mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  className="form-control main-search"
                  type="search"
                  placeholder="Search by email or message"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <div
                className="chat-log-scroll"
                style={{
                  height: '100%',
                  maxHeight: 'calc(-278px + 100vh)',
                  overflow: 'hidden auto',
                  paddingRight: '20px',
                }}
              >
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="d-flex align-items-center border-bottom py-3"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedChat?.id === chat.id ? '#e6f7ff26' : 'transparent',
                    }}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0" style={{ textTransform: 'capitalize' }}>
                          {chat.user_email || 'Unknown Person'}
                        </h6>
                        <small>
                          {chat.createdAt ? new Date(chat.createdAt).toLocaleDateString() : ''}
                        </small>
                      </div>
                      <p className="first-message">{chat.conversation?.[0]?.message || 'No Messages'}</p>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-8">
            <div className="h-100 rounded p-4">
              {selectedChat ? (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-4 border ">
                    <h6 className="m-3" style={{ textTransform: 'capitalize' }}>
                      {selectedChat.user_email || 'Guest User'}
                    </h6>
                    <p style={{ marginRight: '20px', marginTop: '11px' }}>
                      IP Address: {selectedChat.ip_address || 'Unknown IP'}
                    </p>
                    <span className="icons-margin" style={{ marginRight: '10px' }}>
                      <i
                        className="fa-solid fa-ellipsis ellipsis-pointer"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{ backgroundColor: 'white', color: 'black' }}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDownload('pdf', selectedChat.id, selectedChat.user_email || "Unknown Person")}
                          >
                            <i className="fa-solid fa-file-pdf"></i> Download PDF
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDownload('csv', selectedChat.id)}
                          >
                            <i className="fa-solid fa-file-csv"></i> Download CSV
                          </button>
                        </li>
                      </ul>
                    </span>
                  </div>
                  <div className="chat-history scrollable-container">
                    {selectedChat.conversation.map((message, index) => (
                      <div key={index}>
                        {message.role === 'user' ? (
                          <div className="d-flex mb-4" id="self">
                            <span className="user-name"></span>
                            <p className="self">{message.message}</p>
                            <small className="time-color">{new Date(message.timestamp).toLocaleTimeString()}</small>
                          </div>
                        ) : (
                          <div className="d-flex mb-4" id="other">
                            <span className="bot-name">AI Representative</span>
                            <p className="other">{message.message}</p>
                            <small className="time-color">{new Date(message.timestamp).toLocaleTimeString()}</small>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                  <h5>Select a chat to view conversation</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Logs;