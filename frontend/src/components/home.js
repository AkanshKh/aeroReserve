import NavBar from "./navBar";
import Footer from "./footer";
import React, { useEffect, useState } from "react";
import "./home.css";
import "../App.css";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const [tripType, setTripType] = useState('one-way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [seatClass, setSeatClass] = useState('Economy');

  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const airports = [
    {
      name : "Bangkok",
      code : "BKK"
    },
    {
      name : "New York",
      code : "JFK"
    },
    {
      name : "Los Angeles",
      code : "LAX"
    },
    {
      name : "Delhi",
      code : "DEL"
    },
    {
      name : "Mumbai",
      code : "BOM"
    },
    {
      name : "London",
      code : "LHR"
    },
    {
      name : "Paris",
      code : "CDG"
    },
    {
      name : "Dubai",
      code : "DXB"
    },
    {
      name : "Singapore",
      code : "SIN"
    },
    {
      name : "Hong Kong",
      code : "HKG"
    }
  ]

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value === 1 ? "one-way" : "round-trip");
  };

  const handleOriginChange = async (e) => {
    const value = e.target.value;
    setOrigin(value);
    if(value.length >= 2){
      const url = `http://localhost:8000/api/query/${value}/`;

      try{
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        // console.log(data);
        setOriginSuggestions(data);
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if(value.length >= 2){
      const url = `http://localhost:8000/api/query/${value}/`;

      try{
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        // console.log(data);
        setDestinationSuggestions(data);
      }
      catch(error){
        console.log(error);
      }
    }
  }

  const handleOriginSelect = (suggestion) => {
    // console.log(suggestion);
    setOrigin(suggestion);
    // console.log(origin);
    setOriginSuggestions([]);
  };

  // useEffect(() => {
  // }, [origin]);

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion);
    setDestinationSuggestions([]);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(origin, destination, departDate, returnDate, seatClass, tripType);
    const tripTypee = (tripType === 'one-way' ? 1 : 2);
    // console.log(origin)
    // console.log(destination)
    navigate("/flight",{
      state:{
        tripTypee,
        origin,
        destination,
        departDate,
        returnDate,
        seatClass
      }
    });
  }

  

  return (
    <div className="container-fluid">
      <NavBar />
      <section
        className="section first-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url('/static/img/plane3.12.jpg')",
        }}
      >
        <div className="banner-div">
          <div className="banner">
            <h1 className="banner-text">
              Book Domestic and International Flight Tickets
            </h1>
          </div>
        </div>
        <div className="search-flight">
          <div className="container">
            <form
              className="search-flight-form"
              action="/flight"
              onSubmit={handleSubmit}
            >
              <div className="align-items-center">
                <div className="search-flight-form-data">
                  <div className="input-row" style={{ display: "flex" }}>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input trip-type"
                        id="one-way"
                        name="TripType"
                        value="1"
                        checked={tripType === "one-way"}
                        onChange={handleTripTypeChange}
                      />
                      <label className="form-check-label" htmlFor="one-way">
                        One-way
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input trip-type"
                        id="round-trip"
                        name="TripType"
                        value="2"
                        checked={tripType === "round-trip"}
                        onChange={handleTripTypeChange}
                      />
                      <label className="form-check-label" htmlFor="round-trip">
                        Round Trip
                      </label>
                    </div>
                  </div>
                  <div className="input-row">
                    <label htmlFor="flight-from">From: </label>
                    <input
                      type="text"
                      name="Origin"
                      placeholder="From"
                      value={origin.code}
                      onChange={handleOriginChange}
                      id="flight-from"
                      className="form-control mr-sm-3"
                      // autoComplete="off"
                    />
                    {originSuggestions.length > 0 && (
                      <ul className="suggestions">
                        {originSuggestions.map((suggestion, index) => (
                          <li key={index} onClick={() => handleOriginSelect(suggestion)}>
                            {suggestion.city} ({suggestion.code})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="input-row">
                    <label htmlFor="flight-to">To: </label>
                    <input
                      type="text"
                      name="Destination"
                      value={destination.code}
                      onChange={handleDestinationChange}
                      placeholder="To"
                      id="flight-to"
                      className="form-control mr-sm-3"
                      // autoComplete="off"
                    />
                    {destinationSuggestions.length > 0 && (
                      <ul className="suggestions">
                        {destinationSuggestions.map((suggestion, index) => (
                          <li key={index} onClick={() => handleDestinationSelect(suggestion)}>
                            {suggestion.city} ({suggestion.code})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="input-row">
                    <label htmlFor="depart_date">Departure Date: </label>
                    <input
                      type="date"
                      name="DepartDate"
                      onChange={(e) => setDepartDate(e.target.value)}
                      id="depart_date"
                      placeholder="Date"
                      className="form-control mr-sm-2"
                    />
                  </div>
                  <div className="input-row">
                    <label htmlFor="return_date">Return Date: </label>
                    <input
                      type="date"
                      name="ReturnDate"
                      onChange={(e) => setReturnDate(e.target.value)}
                      id="return_date"
                      placeholder="Date"
                      className="form-control mr-sm-2"
                      disabled={tripType === "one-way"}
                    />
                  </div>
                  <div className="input-row">
                    <label htmlFor="seat_class">Class: </label>
                    <select
                      name="SeatClass"
                      id="SeatType"
                      onChange={(e) => setSeatClass(e.target.value)}
                      className="form-control mr-sm-2 selectpicker"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                    </select>
                  </div>
                  <div className="input-row">
                    <button type="submit" className="btn btn-danger">
                      Search Flight
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
