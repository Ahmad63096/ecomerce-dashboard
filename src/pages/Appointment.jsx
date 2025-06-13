import React, { useState, useEffect } from "react";
// import { appointments as initialAppointments } from "../components/Functions";
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

  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };

  const handleClose = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedData(null);
  };

  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case "Success":
  //       return "btn btn-outline-success";
  //     case "Pending":
  //       return "btn btn-outline-warning";
  //     case "Cancelled":
  //       return "btn btn-outline-danger";
  //     case "Waiting":
  //       return "btn btn-outline-info";
  //     default:
  //       return "btn btn-outline-secondary";
  //   }
  // };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return "btn btn-outline-success";
  
      case "pending":
        return "btn btn-outline-warning";
  
      case "cancelled":
      case "failed":
        return "btn btn-outline-danger";
  
      case "on-hold":
      case "waiting":
        return "btn btn-outline-info";
  
      case "processing":
        return "btn btn-outline-primary";
  
      default:
        return "btn btn-outline-secondary";
    }
  };  
  useEffect(() => {
    fetchWooOrders().then((data) => {
      console.log("Fetched Orders:", data);
      // Transform WooCommerce order data to match your appointment format
      const transformed = data.map((order, index) => {
        const billing = order.billing;
        const createdDate = new Date(order.date_created);
        const formattedDate = createdDate.toISOString().split("T")[0]; // YYYY-MM-DD
        const formattedTime = createdDate.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
  
        return {
          id: order.id || index + 1,
          name: order.line_items?.map(item => item.name).join(", "),
          date: formattedDate,
          time: formattedTime,
          email: billing.email,
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
    setSortDateAsc(!sortDateAsc); // Toggle sort direction
  };

  const handleSortByTime = () => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      return sortTimeAsc
        ? a.time.localeCompare(b.time) // Ascending order
        : b.time.localeCompare(a.time); // Descending order
    });
    setAppointments(sortedAppointments);
    setSortTimeAsc(!sortTimeAsc); // Toggle sort direction
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="rounded h-100 p-4">
          <h6 className="mb-4">Appointment Table</h6>
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
                  <th scope="col">Email</th>
                  <th scope="col">Necessity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <th scope="row">{appointment.id}</th>
                    <td>{appointment.name}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.necessity}</td>
                    <td>
                      <button
                        type="button"
                        className={getStatusClass(appointment.status)}
                        style={{ padding: "0px 10px" }}
                      >
                        {appointment.status}
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ fontSize: "14px" }}
                        onClick={() => handleView(appointment)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        style={{ fontSize: "14px" }}
                        onClick={() => handleEdit(appointment)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button style={{ fontSize: "14px" }}>
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

      {/* View Modal */}
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
                <p><strong>Email:</strong> {selectedData.email}</p>
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

      {/* Edit Modal */}
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
                    <label className="form-label">Email</label>
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













































// import React, { useState } from "react";
// import { appointments } from "../components/Functions";
// function Appointment() {
//   const [viewModal, setViewModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [selectedData, setSelectedData] = useState(null);
//   const handleView = (data) => {
//     setSelectedData(data);
//     setViewModal(true);
//   };
//   const handleEdit = (data) => {
//     setSelectedData(data);
//     setEditModal(true);
//   };
//   const handleClose = () => {
//     setViewModal(false);
//     setEditModal(false);
//     setSelectedData(null);
//   };
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Success":
//         return "btn btn-outline-success";
//       case "Pending":
//         return "btn btn-outline-warning";
//       case "Cancel":
//         return "btn btn-outline-danger";
//       case "Waiting":
//         return "btn btn-outline-info";
//       default:
//         return "btn btn-outline-secondary";
//     }
//   };
//   return (
//     <>
//       <div className="container-fluid pt-4 px-4">
//         <div className="rounded h-100 p-4">
//           <h6 className="mb-4">Responsive Table</h6>
//           <div className="table-responsive">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Date</th>
//                   <th scope="col">Time</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Necessity</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.map((appointment) => (
//                   <tr key={appointment.id}>
//                     <th scope="row">{appointment.id}</th>
//                     <td>{appointment.name}</td>
//                     <td>{appointment.date}</td>
//                     <td>{appointment.time}</td>
//                     <td>{appointment.email}</td>
//                     <td>{appointment.necessity}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className={getStatusClass(appointment.status)}
//                         style={{ padding: "0px 10px" }}
//                       >
//                         {appointment.status}
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         style={{ fontSize: "14px" }}
//                         onClick={() => handleView(appointment)}
//                       >
//                         <i className="fa-solid fa-eye"></i>
//                       </button>
//                       <button
//                         style={{ fontSize: "14px" }}
//                         onClick={() => handleEdit(appointment)}
//                       >
//                         <i className="fa-solid fa-pen-to-square"></i>
//                       </button>
//                       <button style={{ fontSize: "14px" }}>
//                         <i className="fa-solid fa-trash"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {viewModal && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Appointment Details</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleClose}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p><strong>Name:</strong> {selectedData.name}</p>
//                 <p><strong>Date:</strong> {selectedData.date}</p>
//                 <p><strong>Time:</strong> {selectedData.time}</p>
//                 <p><strong>Email:</strong> {selectedData.email}</p>
//                 <p><strong>Necessity:</strong> {selectedData.necessity}</p>
//                 <p><strong>Status:</strong> {selectedData.status}</p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleClose}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {editModal && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Appointment</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleClose}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       defaultValue={selectedData.name}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       defaultValue={selectedData.date}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Time</label>
//                     <input
//                       type="time"
//                       className="form-control"
//                       defaultValue={selectedData.time}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       defaultValue={selectedData.email}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Necessity</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       defaultValue={selectedData.necessity}
//                     />
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleClose}
//                 >
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary">
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// export default Appointment;