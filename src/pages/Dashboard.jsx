import React from "react";
// import user from "../assets/img/user.jpg";
import Chatlog from "../components/Chatlog";
import Chart from "../components/Chart";
// import Calender from "../components/Calender";
// import Leadgen from "../components/Leadgen";
import Chatanalytics from "../components/Chatanalytics";

function Dashboard() {
  return (
    <>
    <Chatanalytics/>
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-8">
            <div className="container-fluid">
              <div className="row py-4">
                <div className="col-12" style={{ paddingRight: "0" }}>
                  <div className="h-100 rounded p-4">
                    <Chatlog />
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12" style={{ paddingRight: "0" }}>
                  <Leadgen />
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-sm-12 col-xl-4 mt-5" style={{ paddingLeft: "0" }}>
            <div className="container-fluid">
              <div className="row py-0">
                <div className="col-12">
                  <div className="text-center rounded p-4">
                    <Chart />
                  </div>
                </div>
              </div>
              {/* <div className="row py-3">
                <div className="col-12">
                  <div className="text-center rounded p-4">
                    <Calender />
                  </div>
                </div>
              </div> */}
              {/* <div className="row py-3">
                <div className="col-12">
                  <div className="text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0">Today Appointments</h6>
                      <a href="/">Show All</a>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button
                          className="start-now-button"
                          style={{ visibility: "hidden" }}
                        >
                          Start Now
                        </button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button className="start-now-button">Start Now</button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button
                          className="start-now-button"
                          style={{ visibility: "hidden" }}
                        >
                          Start Now
                        </button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button
                          className="start-now-button"
                          style={{ visibility: "hidden" }}
                        >
                          Start Now
                        </button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button
                          className="start-now-button"
                          style={{ visibility: "hidden" }}
                        >
                          Start Now
                        </button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={user}
                        alt=""
                      />
                      <div style={{ width: "55%", marginLeft: "8px" }}>
                        <h6 style={{ margin: "0", textAlign: "left" }}>
                          Kaiya Korsgaard
                        </h6>
                        <p style={{ margin: "0", textAlign: "left" }}>
                          11:00am - 12:00am
                        </p>
                      </div>
                      <div>
                        <button
                          className="start-now-button"
                          style={{ visibility: "hidden" }}
                        >
                          Start Now
                        </button>
                      </div>
                      <i className="fa-solid fa-ellipsis mt-3"></i>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
