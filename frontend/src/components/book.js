import React, { useEffect, useState } from 'react';
import "../css/book.css";
import NavBar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { BsLuggage } from "react-icons/bs";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const countryCodes = [
  { code: 'IN', value: '91', name: 'India (+91)' },
  { code: 'DZ', value: '213', name: 'Algeria (+213)' },
  { code: 'AD', value: '376', name: 'Andorra (+376)' },
  { code: 'AO', value: '244', name: 'Angola (+244)' },
  // Add all other countries similarly
];

const BookFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flightId = location.state.flightId;
  const departDate = location.state.departDate;
  const seat = location.state.seatClass;
  const origin = location.state.origin;
  const destination = location.state.destination;

  const [flight1, setFlight1] = useState({});
  const [fee, setFee] = useState(0);
  const [fare, setFare] = useState(0);

  const { user, loading } = useContext(AuthContext);

  const [paymentLoader, setPaymentLoader] = useState(false);  

  useEffect(() => {
    // Fetch flight details using flightId
    const fetchFlightDetails = async () => {
      const seatClassFormatted = seat.charAt(0).toLowerCase() + seat.slice(1);
      const url = `http://localhost:8000/api/review?flight1Id=${flightId}&flight1Date=${departDate}&seatClass=${seatClassFormatted}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${user.token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFlight1(data.flight1);
          setFee(data.fee);
          setFare(data.total_fare);
        }
      } catch (error) {
        console.error('Error fetching flight details', error);
      }
    };
    if (user) {
      // console.log(user)
      fetchFlightDetails();
    }
    // console.log(flight1);
  }, [flightId, user, loading, departDate, seat]);

  useEffect(() => {
    // console.log(flight1);
  }, [flight1]);

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({ fname: '', lname: '', gender: '' });
  const [errMsg, setErrMsg] = useState('');
//  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [proceedError, setProceedError] = useState('');
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleAddPassenger = () => {
    if (!newPassenger.fname || !newPassenger.lname || !newPassenger.gender){
      setErrMsg('Please fill all the fields');
      return;
    }
    setPassengers([...passengers, newPassenger]);
    setNewPassenger({ fname: '', lname: '', gender: '' });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!mobile || !email){
      setProceedError('Please fill all the fields');
      return;
    }
    if(passengers.length === 0){
      setProceedError('Please add atleast one passenger');
      return;
    }
    setPaymentLoader(true);

    const url = "http://localhost:8000/api/book/";
    const data = {
      "flight1" : flight1.id,
      "flight1Date" : departDate,
      "flight1Class" : seat,
      "countryCode" : selectedCountryCode,
      "mobile" : mobile,
      "email" : email,
      "passengersCount" : passengers.length,
      "passengers" : passengers
    }
    // console.log(data);

    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${user.token}`
        },
        body: JSON.stringify(data)
      });
      if(response.ok){
        const responseData = await response.json();
        setPaymentLoader(false);
        // console.log(responseData);
        navigate('/payment', { state: responseData });
      }
      else{
        setPaymentLoader(false);
        // navigate('/home');
      }
    }
    catch(error){
      console.error('Error booking flight', error);
      navigate('/error');
    }
    // navigate('/payment', { state: { flight1, departDate, seat, mobile, email, passengers } });
    // Add form submission logic
  };
  const handleChange = (event) => {
    // console.log(event.target.value);  
    setSelectedCountryCode(event.target.value);
  };
  const handleFocus = () => { 
    // console.log("focus");
    setErrMsg('');
    setProceedError('');
  };

  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  return (
    <>
      <NavBar />
      {paymentLoader && (
            <div style={{position:"fixed", top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <p>Loading...</p>
            </div>
        )}
      <div className="container-mine">
        <section className="section section1">
          <form >
            <input type="hidden" name="flight1Date" value={departDate} />
            <input type="hidden" name="flight1Class" value={seat} />

            <div className="row main-row">
              <div className="col-8">
                <div className="ticket-details">
                  <h5>Ticket Details</h5>
                  <hr />
                  <div className="media-airline">
                    <div>
                      <div className="brand">{flight1.airline}</div>
                      <div>&nbsp;&middot;&nbsp;</div>
                      <div className="plane-name">{flight1.plane}</div>
                      <div>&nbsp;&middot;&nbsp;</div>
                      <div className="plane-name">{seat}</div>
                    </div>
                  </div>
                  <div className="row ticket-details-div">
                    <div className="col-3 airline-name">
                      <div className="brand">{flight1.airline}</div>
                      <div className="plane-name">{flight1.plane}</div>
                    </div>
                    <div className="col-3 depart-time">
                      <div className="time">{flight1.depart_time}</div>
                      <div className="date ddate">{departDate}</div>
                      <div className="place">{origin.code}</div>
                      <div className="airport">{origin.airport}</div>
                    </div>
                    <div className="col-3 time-details">
                      <div className="duration">{flight1.duration_hr}h {flight1.duration_min}m</div>
                    </div>
                    <div className="col-3 arrival-time">
                      <div className="time">{flight1.arrival_time}</div>
                      <div className="date adate">{departDate}</div>
                      <div className="place">{destination.code}</div>
                      <div className="airport">{destination.airport}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="baggage-details">
                    {/* <svg width="1em" height="1.5em" viewBox="0 3 16 16" className="bi bi-bag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z" />
                    </svg> */}
                    <BsLuggage style={{"marginRight" : "7px"}} />

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
                        <select name="countryCode" className="custom-select" onChange={handleChange}>
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
                          onFocus={handleFocus}
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
                          onFocus={handleFocus}
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
                          <span> {passenger.gender}</span>
                        </div>
                        <button
                          className="delete-button"
                          onClick={() => removePassenger(index)}
                        >
                          <MdDelete/>
                        </button>
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
                  <div className={toggle ? "collapse row add-traveller-div" : "row add-traveller-div"}>
                    <div className="note-name"><span>IMPORTANT :</span> Enter your name as it is mentioned on your passport or any government approved ID.</div>
                    <div className="row form-group add-traveller-div-name">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          value={newPassenger.fname}
                          onChange={(e) => setNewPassenger({ ...newPassenger, fname: e.target.value })}
                          onFocus={handleFocus}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          value={newPassenger.lname}
                          onChange={(e) => setNewPassenger({ ...newPassenger, lname: e.target.value })}
                          onFocus={handleFocus}
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
                            value="Male"
                            checked={newPassenger.gender === 'Male'}
                            onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
                            onFocus={handleFocus}
                          />
                          Male
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input gender"
                            value="Female"
                            checked={newPassenger.gender === 'Female'}
                            onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
                            onFocus={handleFocus}
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    <span className="star small"> {errMsg}</span>
                    <button type="button" className="btn btn-add" style={{ marginRight: 'auto' }} onClick={handleAddPassenger}>Add</button>
                  </div>
                  <hr />
                  <div className="add-traveller">
                    <button className="add-traveller-btn text-uppercase btn" type="button" onClick={handleToggle}>+ ADD ADULT</button>
                  </div>
                  <span className="star small"> {proceedError}</span>
                </div>
                <div className="payment-btn" style={{ backgroundColor: 'transparent' }}>
                  <button type="button" className="btn btn-primary btn-danger" onClick={handleFormSubmit}>Proceed to payment</button>
                </div>
              </div>
              <div className="col-4">
                <div className="price-details">
                  <h5>Fare Summary</h5>
                  <hr />
                  <div className="row base-fare">
                    <div className="base-fare-label">Base Fare:</div>
                    <div className="base-fare-value"><span>{flight1.base_fare}</span></div>
                  </div>
                  <div className="row surcharges">
                    <div className="surcharges-label">Fee & Surcharges:</div>
                    <div className="surcharges-value">₹ <span>{fee}</span></div>
                    <input type="hidden" id="fee" value={fee} />
                  </div>
                  <hr />
                  <div className="total-fare">
                    <div className="total-fare-label">Total Fare:</div>
                    <div className="total-fare-value">{fare}
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
                  <span className="star small"> {proceedError}</span>
                  <button type="button" className="btn btn-primary btn-danger">Proceed to payment</button>
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
