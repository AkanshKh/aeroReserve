import React, { useState } from 'react';
import { WiDayHaze, WiNightAltPartlyCloudy, WiDaySunny, WiDaySunnyOvercast, WiNightClear } from 'weather-icons-react';

const flightsData = [
    {
        company: 'Indigo',
        code: '6E',
        departTime: '10:00 AM',
        arrivalTime: '12:00 PM',
        price: '₹ 5000',
    },
    // Add more flight objects here
];

const Flight = () => {
    const [filteredFlights, setFilteredFlights] = useState(flightsData);
    const [searchValue, setSearchValue] = useState('');

    const handleFilter = (type, start, end) => {
        const filtered = flightsData.filter(flight => {
            const flightTime = parseInt(flight.departTime.split(':')[0]);
            return flightTime >= start && flightTime < end;
        });
        setFilteredFlights(filtered);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        const filtered = flightsData.filter(flight =>
            flight.company.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredFlights(filtered);
    };

    return (
        <section className="section section1">
            <div className="query-data-div">
                <div className="container">
                    <div className="trip-places">
                        <div className="from-div text-align-left">
                            <div className="small-label">From</div>
                            <div className="white">Origin City (Code)</div>
                        </div>
                        <div className="trip-type-div white">
                            <div className="small-label">&nbsp;</div>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </div>
                        <div className="to-div text-align-right">
                            <div className="small-label">To</div>
                            <div className="white">Destination City (Code)</div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-time">
                        <div className="depart-date-div">
                            <div className="small-label">Depart</div>
                            <div className="white">Depart Date</div>
                        </div>
                        <div className="return-date-div">
                            <div className="small-label">Return</div>
                            <div className="white">Return Date</div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-class">
                        <div className="return-date-div">
                            <div className="small-label">Class</div>
                            <div className="white">Class</div>
                        </div>
                    </div>
                    <div className="v-line"></div>
                    <div className="trip-modify">
                        <form action="/" method="POST">
                            <button className="btn spl-btn" type="submit">Modify Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="query-data-div2">
                <div className="container">
                    <div className="trip-modify">
                        <form action="/" method="POST">
                            <button className="btn spl-btn2" type="submit">
                                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="trip-data">
                        <div className="trip-data-p" style={{ display: 'flex', color: 'white' }}>
                            <div>Origin City</div>
                            <div>&nbsp;
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                                &nbsp;
                            </div>
                            <div>Destination City</div>
                        </div>
                        <div className="trip-data-d" style={{ display: 'flex', fontSize: '.8em', color: 'rgb(240,240,240)' }}>
                            <div>
                                Depart Date
                                | Return Date
                                | Class
                            </div>
                        </div>
                    </div>
                    <div className="trip-filter">
                        <button className="btn spl-btn2" onClick={() => console.log('Show filter')}>
                            <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="query-result-div">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 filter-div">
                            <div className="close-filter" style={{ marginTop: 0 }}>
                                <button className="btn b1" onClick={() => console.log('Close filter')}>
                                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="filter">
                                <center>
                                    <h4>Filter Results</h4>
                                </center>
                                <div className="filter-box">
                                    <div className="filter-price">
                                        <div className="font-weight-bold">Price</div>
                                        <div>
                                            <input type="range" className="form-control-range" min="1000" max="10000" defaultValue="10000" onInput={() => console.log('Filter by price')} />
                                            <div className="price-range-output">
                                                <div className="initial-price-range">
                                                    <span className="currency-symbol">₹</span>
                                                    <span className="initial-price-value">1000</span>
                                                </div>
                                                <div className="final-price-range">
                                                    <span className="currency-symbol">₹</span>
                                                    <span className="final-price-value">10000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="time-slot departure-time-slot-group">
                                        <div className="font-weight-bold">Departure Time</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="square-box" onClick={() => handleFilter('departure', 0, 6)}>
                                                <WiNightAltPartlyCloudy size={50}/>
                                                <div style={{ fontSize: '12px' }}>Before 6 AM</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('departure', 6, 12)}>
                                                <WiDaySunny size={50}/>
                                                <div style={{ fontSize: '12px' }}>6 am - 12 pm</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('departure', 12, 18)}>
                                                <WiDaySunnyOvercast size={50}/>
                                                <div style={{ fontSize: '12px' }}>12 pm - 6 pm</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('departure', 18, 24)}>
                                                <WiNightClear size={50}/>
                                                <div style={{ fontSize: '12px' }}>After 6 pm</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="time-slot arrival-time-slot-group">
                                        <div className="font-weight-bold">Arrival Time</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="square-box" onClick={() => handleFilter('arrival', 0, 6)}>
                                                <WiNightAltPartlyCloudy size={50}/>
                                                <div style={{ fontSize: '12px' }}>Before 6 AM</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('arrival', 6, 12)}>
                                                <WiDaySunny size={50}/>
                                                <div style={{ fontSize: '12px' }}>6 am - 12 pm</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('arrival', 12, 18)}>
                                                <WiDaySunnyOvercast size={50}/>
                                                <div style={{ fontSize: '12px' }}>12 pm - 6 pm</div>
                                            </div>
                                            <div className="square-box" onClick={() => handleFilter('arrival', 18, 24)}>
                                                <WiNightClear size={50}/>
                                                <div style={{ fontSize: '12px' }}>After 6 pm</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clr-filter-div">
                                    <center>
                                        <button className="btn-link">Reset Filters</button>
                                    </center>
                                </div>
                            </div>
                            <div className="close-filter">
                                <button className="btn btn-danger b2" onClick={() => console.log('Show results')}>
                                    SHOW RESULTS
                                </button>
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
                                {filteredFlights.map((flight, index) => (
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
                </div>
            </div>
        </section>
    );
};

export default Flight;
