import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './navBar';
import './flight.css';
import {WiNightAltPartlyCloudy, WiDaySunny, WiDaySunnyOvercast, WiNightClear } from 'react-icons/wi';
const Flight = () => {
    const location = useLocation();
    const { tripType, origin, destination, departDate, returnDate, seatClass } = location.state || {};
    console.log(location.state);
    // const [returnDate, setReturnDate] = useState(location.state?.returnDate || '');
    const flights = [1]
    // const origin = location.state?.origin || {};
    // const destination = location.state?.destination || {};
    // const departDate = location.state?.departDate || '';
    // const returnDate = location.state?.returnDate || '';
    const minPrice = location.state?.minPrice || 0;
    const maxPrice = location.state?.maxPrice || 1000;

    const handleFilter = () => {
        // Implement filter logic here
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    const handleModify = () => {
        navigate('/');
    }

    const flightsList = [
        {
            company : 'Indigo',
            code : '6E',
            departTime : '10:00 AM',
            arrivalTime : '12:00 PM',
            Price : '₹ 5000',
        },
        {
            company: 'Air India',
            code: 'AI',
            departTime: '8:00 AM',
            arrivalTime: '10:00 AM',
            Price: '₹ 6000',
        },
        {
            company: 'SpiceJet',
            code: 'SG',
            departTime: '2:00 PM',
            arrivalTime: '4:00 PM',
            Price: '₹ 4500',
        },
        {
            company: 'GoAir',
            code: 'G8',
            departTime: '6:00 AM',
            arrivalTime: '8:00 AM',
            Price: '₹ 5500',
        },
        {
            company: 'Vistara',
            code: 'UK',
            departTime: '12:00 PM',
            arrivalTime: '2:00 PM',
            Price: '₹ 7000',
        },
        {
            company: 'AirAsia',
            code: 'AK',
            departTime: '4:00 PM',
            arrivalTime: '6:00 PM',
            Price: '₹ 4000',
        },
        {
            company: 'Jet Airways',
            code: '9W',
            departTime: '10:00 PM',
            arrivalTime: '12:00 AM',
            Price: '₹ 8000',
        },
        {
            company: 'GoAir',
            code: 'G8',
            departTime: '6:00 AM',
            arrivalTime: '8:00 AM',
            Price: '₹ 5500',
        },
        {
            company: 'Vistara',
            code: 'UK',
            departTime: '12:00 PM',
            arrivalTime: '2:00 PM',
            Price: '₹ 7000',
        },
        {
            company: 'AirAsia',
            code: 'AK',
            departTime: '4:00 PM',
            arrivalTime: '6:00 PM',
            Price: '₹ 4000',
        },
        {
            company: 'Jet Airways',
            code: '9W',
            departTime: '10:00 PM',
            arrivalTime: '12:00 AM',
            Price: '₹ 8000',
        }
    ]

    return (
    <>
        <div className="container-fluid">
        <NavBar />
        <section className="section section1">
            <div className="query-data-div">
                <div className="container">
                    <div className="trip-places">
                        <div className="from-div text-align-left">
                            <div className="small-label">From</div>
                            <div className="white">{origin.city} ({origin.code})</div>
                        </div>
                        <div className="trip-type-div white">
                            <div className="small-label">&nbsp;</div>
                            {tripType === '2' ? (
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                                </svg>
                            ) : (
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                            )}
                        </div>
                        <div className="to-div text-align-right">
                            <div className="small-label">To</div>
                            <div className="white">{destination.city} ({destination.code})</div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-time">
                        <div className="depart-date-div">
                            <div className="small-label">Depart</div>
                            <div className="white">{new Date(departDate).toDateString().slice(4)}</div>
                        </div>
                        <div className="return-date-div">
                            <div className="small-label">Return</div>
                            <div className="white">
                                {returnDate ? new Date(returnDate).toDateString().slice(4) : '--'}
                            </div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-class">
                        <div className="return-date-div">
                            <div className="small-label">Class</div>
                            <div className="white">{seatClass}</div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-modify">
                        <form onSubmit={handleSubmit}>
                            {/* <input type="hidden" name="Origin" value={origin.code.toUpperCase()} /> */}
                            {/* <input type="hidden" name="Destination" value={destination.code.toUpperCase()} /> */}
                            {/* <input type="hidden" name="DepartDate" value={departDate} /> */}
                            {/* <input type="hidden" name="ReturnDate" value={returnDate} /> */}
                            {/* <input type="hidden" name="SeatClass" value={seatClass.toLowerCase()} /> */}
                            {/* <input type="hidden" name="TripType" value={tripType} /> */}
                            <button className="btn spl-btn" type="submit" onClick={handleModify}>Modify Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="query-result-div">
                <div className="container">
                    <div className="row">
                        {flights.length > 0 ? (
                            <div className="col-lg-3 filter-div">
                                <div className="filter">
                                    <center>
                                        <h4>Filter Results</h4>
                                    </center>
                                    <div className="filter-box">
                                        <div className="filter-price">
                                            <div className="font-weight-bold">Price</div>
                                            <div>
                                                <input type="range" className="form-control-range" min={minPrice} max={maxPrice} defaultValue={maxPrice} onInput={handleFilter} />
                                                <div className="price-range-output">
                                                    <div className="initial-price-range">
                                                        <span className="currency-symbol">₹</span>
                                                        <span className="initial-price-value">{minPrice}</span>
                                                    </div>
                                                    <div className="final-price-range">
                                                        <span className="currency-symbol">₹</span>
                                                        <span className="final-price-value"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="time-slot departure-time-slot-group">
                                            <div className="font-weight-bold">Departure Time</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div className="square-box" onClick={() => handleFilter('departure', 0, 6)}>
                                                    <WiNightAltPartlyCloudy size={24} />
                                                    <div>Before 6 AM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('departure', 6, 12)}>
                                                    <WiDaySunny size={24} />
                                                    <div>6 am - 12 PM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('departure', 12, 18)}>
                                                    <WiDaySunnyOvercast size={24} />
                                                    <div>12 PM - 6 PM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('departure', 18, 24)}>
                                                    <WiNightClear size={24} />
                                                    <div>After 6 <br/>PM</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="time-slot arrival-time-slot-group">
                                            <div className="font-weight-bold">Arrival Time</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div className="square-box" onClick={() => handleFilter('arrival', 0, 6)}>
                                                    <WiNightAltPartlyCloudy size={24} />
                                                    <div>Before 6 AM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('arrival', 6, 12)}>
                                                    <WiDaySunny size={24} />
                                                    <div>6 am - 12 PM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('arrival', 12, 18)}>
                                                    <WiDaySunnyOvercast size={24} />
                                                    <div>12 PM - 6 PM</div>
                                                </div>
                                                <div className="square-box" onClick={() => handleFilter('arrival', 18, 24)}>
                                                    <WiNightClear size={24} />
                                                    <div>After 6 <br/>PM</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clr-filter-div">
                                        <center>
                                            <button className="btn-link" onClick={handleFilter}>Reset Filters</button>
                                        </center>
                                    </div>
                                </div>
                                <div className="col-lg-9 actual-result-div">
                            <div className="sort-div" style={{ display: 'none' }}>
                                <div className="sort-label">Sort By:</div>
                                <div style={{ display: 'flex' }}>
                                    <div className="sort-depart">
                                        Depart
                                        <span>--</span>
                                    </div>
                                    <div className="sort-arrive">
                                        Arrive
                                        <span>--</span>
                                    </div>
                                </div>
                                <div className="sort-price">
                                    Price
                                    <span></span>
                                </div>
                            </div>
                            <div className="sort-div">
                                <div className="flight-company">
                                    <div className="sort-label">Sort By:</div>
                                </div>
                                <div className="flight-time">
                                    <div className="flight-origin-time sort-depart">
                                        Depart
                                        <span></span>
                                    </div>
                                    <div className="flight-stops"></div>
                                    <div className="flight-destination-time sort-arrive">
                                        Arrive
                                        <span></span>
                                    </div>
                                </div>
                                <div className="flight-details">
                                    Price
                                    <span></span>
                                </div>
                            </div>
                            <div id="flights_div">
                                {flightsList.map((flight, index) => (
                                    <div key={index} className="each-flight-div-box show">
                                        <div className="each-flight-div" onClick={() => console.log('Flight selected')}>
                                            <div className="flight-company">
                                                <div className="flight-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.5em" height="1.3em" style={{ transform: 'rotate(360deg)' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 440 384">
                                                        <path d="M14 335h405v43H14v-43zm417.5-199.5q3.5 12.5-3 24T409 175l-114 30l-92 25l-114 30l-34 10l-16-29l-39-67l31-9l42 33l106-28L91 17l41-11l147 137l113-30q13-4 24.5 3t15 19.5z" fill="#434445"/>
                                                        <rect x="0" y="0" width="440" height="384" fill="rgba(0, 0, 0, 0)" />
                                                    </svg>
                                                </div>
                                                <div className="company-details">
                                                    <div className="company-name">{flight.company} ({flight.code})</div>
                                                    <div className="plane-name">Plane Name</div>
                                                </div>
                                            </div>
                                            <div className="flight-time flight-time-div">
                                                <div className="flight-origin-time">
                                                    <div className="flight-time">
                                                        <h5>{flight.departTime}</h5>
                                                    </div>
                                                    <div className="flight-place">Origin City</div>
                                                </div>
                                                <div className="flight-stops tooltip">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 24 24">
                                                        <path d="M13,9.03544443 C14.6961471,9.27805926 16,10.736764 16,12.5 C16,14.263236 14.6961471,15.7219407 13,15.9645556 L13,21.5207973 C13,21.7969397 12.7761424,22.0207973 12.5,22.0207973 C12.2238576,22.0207973 12,21.7969397 12,21.5207973 L12,15.9645556 C10.3038529,15.7219407 9,14.263236 9,12.5 C9,10.736764 10.3038529,9.27805926 12,9.03544443 L12,3.5 C12,3.22385763 12.2238576,3 12.5,3 C12.7761424,3 13,3.22385763 13,3.5 L13,9.03544443 L13,9.03544443 Z M12.5,15 C13.8807119,15 15,13.8807119 15,12.5 C15,11.1192881 13.8807119,10 12.5,10 C11.1192881,10 10,11.1192881 10,12.5 C10,13.8807119 11.1192881,15 12.5,15 Z" transform="rotate(90 12.5 12.51)"/>
                                                    </svg>
                                                    <span className="tooltiptext" data-value="Flight Duration"></span>
                                                </div>
                                                <div className="flight-destination-time">
                                                    <div className="flight-time">
                                                        <h5>{flight.arrivalTime}</h5>
                                                    </div>
                                                    <div className="flight-place">Destination City</div>
                                                </div>
                                            </div>
                                            <div className="flight-details">
                                                <div className="flight-price">
                                                    <h5>{flight.price}</h5>
                                                </div>
                                                <div className="flight-details-btn">
                                                    <form action="/review" method="GET" style={{ display: 'flex' }}>
                                                        <button className="btn btn-primary btn-danger o-b" type="submit">Book Flight</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                            </div>
                        ) : (
                            <div className="col-lg-9 actual-result-div">
                                <div style={{ height: '100%', width: '100%', padding: '10%' }}>
                                    <div style={{ textAlign: 'center', margin: 'auto' }}>
                                        <svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                        </svg>
                                        <br /><br />
                                        <h3>Sorry, No Flight for this Search</h3>
                                        <p>
                                            We cannot find any flights for the cabin class of your search. Please modify your search criteria and try again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </div>
    </>
    );
};

export default Flight;
