import React from 'react'
import user from '../assets/img/user.jpg';
import Navbar from './Navbar';
function Header() {
  return (
    <>
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-md-12">
            <h2>Dashboard</h2>
          </div>
        </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-xl-4">
              <div className="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <h5>Total Chats</h5>

                <h2>234</h2>
                <p>+2% than last month</p>
                {/* <i className="fa fa-chart-line fa-3x"></i>
                <div className="ms-3">
                  <p className="mb-2">Today Sale</p>
                  <h6 className="mb-0">$1234</h6>
                </div> */}
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <i className="fa fa-chart-bar fa-3x"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Sale</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <i className="fa fa-chart-area fa-3x"></i>
                <div className="ms-3">
                  <p className="mb-2">Today Revenue</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-6">
              <div className="text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Worldwide Sales</h6>
                  <a href="/">Show All</a>
                </div>
                <canvas id="worldwide-sales"></canvas>
              </div>
            </div>
            <div className="col-sm-12 col-xl-6">
              <div className="text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Salse & Revenue</h6>
                  <a href="/">Show All</a>
                </div>
                <canvas id="salse-revenue"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-4 px-4">
          <div className="text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Salse</h6>
              <a href="/">Show All</a>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                    <th scope="col">Date</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Messages</h6>
                  <a href="/">Show All</a>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-3">
                  <img className="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Calender</h6>
                  <a href="/">Show All</a>
                </div>
                <div id="calender"></div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">To Do List</h6>
                  <a href="/">Show All</a>
                </div>
                <div className="d-flex mb-2">
                  <input className="form-control bg-dark border-0" type="text" placeholder="Enter task" />
                  <button type="button" className="btn btn-primary ms-2">Add</button>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" checked />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span><del>Short task goes here...</del></span>
                      <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-4 px-4 ">
          <div className="rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; All Right Reserved.
              </div>
              <div className="col-12 col-sm-6 text-center text-sm-end">
                Designed By HTML Codex
                <br />Distributed By: Theme
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  )
}

export default Header