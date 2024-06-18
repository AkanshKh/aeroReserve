import React, { useState } from 'react';
import "./book.css";
import NavBar from './navBar';
import { useLocation } from 'react-router-dom';



const countryCodes = [
  { code: 'IN', value: '91', name: 'India (+91)' },
  { code: 'DZ', value: '213', name: 'Algeria (+213)' },
  { code: 'AD', value: '376', name: 'Andorra (+376)' },
  { code: 'AO', value: '244', name: 'Angola (+244)' },
  // Add all other countries similarly
];

const BookFlight = () => {
  const location = useLocation();
  const flight1 = location.state.flightData;
  const departDate = location.state.departDate;
  const seat = location.state.seatClass;
  console.log(flight1);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({ fname: '', lname: '', gender: '' });

  const handleAddPassenger = () => {
    setPassengers([...passengers, newPassenger]);
    setNewPassenger({ fname: '', lname: '', gender: '' });
  };

  const fee = 100;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <>
    <NavBar/>
    <div className="container-mine">
    <section className="section section1">
      <form onSubmit={handleFormSubmit}>
        {/* <input type="hidden" name="flight1" value={flight1.id} /> */}
        <input type="hidden" name="flight1Date" value={departDate} />
        <input type="hidden" name="flight1Class" value={seat} />

        <div className="row main-row">
          <div className="col-8">
            <div className="ticket-details">
              <h5>Ticket Details</h5>
              <hr />
              <div className="media-airline">
                <div>
                  <div className="brand">{flight1.company}</div>
                  <div>&nbsp;&middot;&nbsp;</div>
                  <div className="plane-name">{flight1.code}</div>
                  <div>&nbsp;&middot;&nbsp;</div>
                  <div className="plane-name">{seat}</div>
                </div>
              </div>
              <div className="row ticket-details-div">
                <div className="col-3 airline-name">
                  <div className="brand">{flight1.company}</div>
                  <div className="plane-name">{flight1.code}</div>
                </div>
                <div className="col-3 depart-time">
                  <div className="time">{flight1.departTime}</div>
                  <div className="date ddate">{departDate}</div>
                  <div className="place">{flight1.from}</div>
                  <div className="airport">{flight1.from}</div>
                </div>
                <div className="col-3 time-details">
                  <div className="duration">{flight1.duration}</div>
                </div>
                <div className="col-3 arrival-time">
                  <div className="time">{flight1.arrivalTime}</div>
                  <div className="date adate">{departDate}</div>
                  <div className="place">{flight1.to}</div>
                  <div className="airport">{flight1.to}</div>
                </div>
              </div>
              <hr />
              <div className="baggage-details">
                <svg width="1em" height="1.5em" viewBox="0 3 16 16" className="bi bi-bag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z" />
                </svg>
                30 Kgs Check-in, 7 Kgs Cabin
              </div>
            </div>
            <div className="traveller-details">
              <div className="traveller-head">
                <h5>Contact Information</h5>
              </div>
              <hr />
              <div className="row contact-details-div">
                <div className="row form-group">
                  <div className="col-3 ci">
                    Country Code
                    <select name="countryCode" className="custom-select">
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.value}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3 ci">
                    Mobile No
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      placeholder="Mobile No"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      />
                  </div>
                  <div className="col-6 ci">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      />
                  </div>
                </div>
              </div>
              <hr />
              <div className="send-email">&nbsp;</div>
            </div>
            <div className="traveller-details individual-traveller-div">
              <div className="traveller-head">
                <h5>Passenger Details</h5>
                <h6>
                  <span>{passengers.length}</span> Passengers
                </h6>
              </div>
              <hr />
              <input type="hidden" id="p-count" name="passengersCount" value={passengers.length} />
              <div className="each-traveller-div">
                {passengers.map((passenger, index) => (
                  <div key={index} className="row each-traveller">
                    <div>
                      <span className="traveller-name">{passenger.fname} {passenger.lname}</span>
                      {passenger.gender}
                    </div>
                  </div>
                ))}
              </div>
              <div className="row each-traveller no-traveller">
                {passengers.length === 0 && (
                  <div>
                    <span className="traveller-name"></span>
                    You have not added any adults to the list
                  </div>
                )}
              </div>
              <div className="row add-traveller-div collapse">
                <div className="note-name"><span>IMPORTANT :</span> Enter your name as it is mentioned on your passport or any government approved ID.</div>
                <div className="row form-group add-traveller-div-name">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      value={newPassenger.fname}
                      onChange={(e) => setNewPassenger({ ...newPassenger, fname: e.target.value })}
                      />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      value={newPassenger.lname}
                      onChange={(e) => setNewPassenger({ ...newPassenger, lname: e.target.value })}
                      />
                  </div>
                </div>
                <div className="row form-group radio-div">
                  <div className="form-check-inline cd">
                    Gender:
                  </div>
                  <div className="form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input gender"
                        value="male"
                        checked={newPassenger.gender === 'male'}
                        onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
                        />
                      Male
                    </label>
                  </div>
                  <div className="form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input gender"
                        value="female"
                        checked={newPassenger.gender === 'female'}
                        onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
                        />
                      Female
                    </label>
                  </div>
                </div>
                <button type="button" className="btn btn-primary btn-light" style={{ marginRight: 'auto' }} onClick={handleAddPassenger}>Add</button>
              </div>
              <hr />
              <div className="add-traveller">
                <button className="add-traveller-btn text-uppercase btn" type="button" data-toggle="collapse" data-target=".add-traveller-div">+ ADD ADULT</button>
              </div>
            </div>
            <div className="payment-btn" style={{ backgroundColor: 'transparent' }}>
              <button type="submit" className="btn btn-primary btn-danger">Proceed to payment</button>
            </div>
          </div>
          <div className="col-4">
            <div className="price-details">
              <h5>Fare Summary</h5>
              <hr />
              <div className="row base-fare">
                <div className="base-fare-label">Base Fare:</div>
                <div className="base-fare-value">
                </div>
              </div>
              <div className="row surcharges">
                <div className="surcharges-label">Fee & Surcharges:</div>
                <div className="surcharges-value">₹ <span>{fee}</span></div>
                <input type="hidden" id="fee" value={fee} />
              </div>
              <hr />
              <div className="total-fare">
                <div className="total-fare-label">Total Fare:</div>
                <div className="total-fare-value">
                </div>
              </div>
            </div>
            <div className="coupon-code">
              <h5>Have a coupon code?</h5>
              <hr />
              <div className="row base-fare">
                <div className="col-9" style={{ padding: '10px 10px 10px 0px' }}>
                  <input type="text" name="coupon" className="form-control" placeholder="Coupon Code" style={{ textTransform: 'uppercase' }} />
                </div>
                <div className="col coupon-apply" style={{ padding: '10px 10px 10px 0px' }}>
                  <center>
                    <button type="button" className="btn btn-primary btn-danger">Apply</button>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div className="col media-payment-btn">
            <div>
              <button type="submit" className="btn btn-primary btn-danger">Proceed to payment</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</>
  );
};

export default BookFlight;
