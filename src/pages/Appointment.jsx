import React, { useState, useEffect } from "react";
const WC_BASE_URL = "https://demo1.devpandasdemo.com/wp-json/wc/v3/orders";
const WC_CONSUMER_KEY = "ck_b09efcc41f8181b6deb591895a1d333912df56ef";
const WC_CONSUMER_SECRET = "cs_9ee4419bf9dbfa2b55db8b99f7864f5d882932ec";

const fetchWooOrders = async () => {
  const url = new URL(WC_BASE_URL);
  url.searchParams.append("consumer_key", WC_CONSUMER_KEY);
  url.searchParams.append("consumer_secret", WC_CONSUMER_SECRET);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("WooCommerce Orders:", data);
    return data;
  } catch (error) {
    console.error("Error fetching WooCommerce orders:", error);
    return [];
  }
};

function Appointment() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [sortDateAsc, setSortDateAsc] = useState(true);
  const [sortTimeAsc, setSortTimeAsc] = useState(true);

  const handleView = (data) => {
    setSelectedData(data);
    setViewModal(true);
  };
  const handleChangeStatus = async (orderId, newStatus) => {
    const url = new URL(`${WC_BASE_URL}/${orderId}`);
    url.searchParams.append("consumer_key", WC_CONSUMER_KEY);
    url.searchParams.append("consumer_secret", WC_CONSUMER_SECRET);

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus.toLowerCase().replace(/\s/g, "-"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Status update failed with status ${response.status}`);
      }

      const updatedOrder = await response.json();
      console.log("Status updated:", updatedOrder);

      // Update local state
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === orderId
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };
  const handleDelete = async (orderId) => {
    const url = new URL(`${WC_BASE_URL}/${orderId}`);
    url.searchParams.append("force", "true");
    url.searchParams.append("consumer_key", WC_CONSUMER_KEY);
    url.searchParams.append("consumer_secret", WC_CONSUMER_SECRET);

    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(url.toString(), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Order deleted:", result);

      // Remove the order from local state
      setAppointments((prev) => prev.filter((item) => item.id !== orderId));
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order.");
    }
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };

  const handleClose = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedData(null);
  };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "btn btn-outline-success";

      case "processing":
        return "btn btn-outline-primary";

      case "on-hold":
        return "btn btn-outline-info";

      case "pending":
        return "btn btn-outline-warning";

      case "cancelled":
      case "failed":
      case "refunded":
        return "btn btn-outline-danger";

      case "checkout-draft":
        return "btn btn-outline-secondary";

      default:
        return "btn btn-outline-secondary"; // fallback for unknown status
    }
  };
  useEffect(() => {
    fetchWooOrders().then((data) => {
      console.log("Fetched Orders:", data);
      const transformed = data.map((order, index) => {
        const billing = order.billing;
        const email = order.billing;
        const name = order.billing;
        const payment = order.line_items;
        const createdDate = new Date(order.date_created);
        const formattedDate = createdDate.toISOString().split("T")[0]; // YYYY-MM-DD
        const formattedTime = createdDate.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
        return {
          id: order.id || index + 1,
          name: order.line_items?.map(item => item.name).join(", "),
          date: formattedDate,
          time: formattedTime,
          personName: name.first_name,
          email: email.email,
          price: order.currency + " " + payment[0].price,
          necessity: `${billing.first_name} ${billing.last_name}`, // or order.note if applicable
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // Capitalize
        };
      });
      setAppointments(transformed);
    });
  }, []);
  const handleSortByDate = () => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      return sortDateAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setAppointments(sortedAppointments);
    setSortDateAsc(!sortDateAsc);
  };
  const handleSortByTime = () => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      return sortTimeAsc
        ? a.time.localeCompare(b.time)
        : b.time.localeCompare(a.time);
    });
    setAppointments(sortedAppointments);
    setSortTimeAsc(!sortTimeAsc);
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="rounded h-100 p-4">
          <h6 className="mb-4">Order Table</h6>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">
                    Date
                    <button onClick={handleSortByDate} style={{ fontSize: "16px" }}>
                      {sortDateAsc ? (
                        <i className="fa-solid fa-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down"></i>
                      )}
                    </button>
                  </th>
                  <th scope="col">
                    Time
                    <button onClick={handleSortByTime} style={{ fontSize: "16px" }}>
                      {sortTimeAsc ? (
                        <i className="fa-solid fa-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down"></i>
                      )}
                    </button>
                  </th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Person Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <th scope="row">{appointment.id}</th>
                    <td style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                    }}>
                      {appointment.name}
                    </td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.personName}</td>
                    <td>{appointment.price}</td>
                    <td className="status-dropdown-wrap">
                      <div className="dropdown status-dropdown">
                        <button
                          className={`${getStatusClass(appointment.status)} dropdown-toggle`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ padding: "0px 10px" }}
                        >
                          {appointment.status}
                        </button>
                        <ul className="dropdown-menu status-menu">
                          {[
                            "Processing",
                            "On hold",
                            "Completed",
                            "Cancelled",
                            "Refunded",
                            "Failed",
                            "Checkout-Draft",
                            "Pending"
                          ].map((statusOption) => (
                            <li key={statusOption}>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChangeStatus(appointment.id, statusOption)}
                              >
                                {statusOption}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td>
                      <button
                        style={{ fontSize: "14px" }}
                        onClick={() => handleView(appointment)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {/* <button
                        style={{ fontSize: "14px" }}
                        onClick={() => handleEdit(appointment)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button> */}
                      <button style={{ fontSize: "14px" }} onClick={() => handleDelete(appointment.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {viewModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedData.name}</p>
                <p><strong>Date:</strong> {selectedData.date}</p>
                <p><strong>Time:</strong> {selectedData.time}</p>
                <p><strong>Price:</strong> {selectedData.email}</p>
                <p><strong>Necessity:</strong> {selectedData.necessity}</p>
                <p><strong>Status:</strong> {selectedData.status}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedData.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      defaultValue={selectedData.date}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      defaultValue={selectedData.time}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={selectedData.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Necessity</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedData.necessity}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Appointment;