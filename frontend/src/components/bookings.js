import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import '../css/bookings.css'; // Ensure the path to your CSS file is correct

const Bookings = () => {
  const [tickets, setTickets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [cancelRef, setCancelRef] = useState(null);
  useEffect(() => {
    // Fetch tickets from the server or mock the data here
    // Example:
    // console.log("fetching data")
    // setTickets(mockedData);
  }, []);

  const handlePrint = (ref) => {
    window.open(`/getticket?ref=${ref}`, '_blank');
  };

  const handleResumeBooking = (ref) => {
    // Handle resume booking logic
  };

  const handleCancel = (ref) => {
    setCancelRef(ref);
    setShowPopup(true);
  };

  const confirmCancel = () => {
    // Handle the ticket cancellation logic here
    console.log(`Ticket with ref ${cancelRef} cancelled.`);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Navbar/>
    <div className="container">
      <section className="section section1">
        <div className="container">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div className="row each-booking-div" key={ticket.ref_no} id={ticket.ref_no}>
                <div className="col-2" style={{ display: 'flex' }}>
                  <div style={{ display: 'flex', color: '#666666', marginTop: 'auto' }}>
                    <div>
                      <span style={{ fontSize: '2.1em' }}>{new Date(ticket.flight_ddate).getDate()}</span>
                    </div>
                    <div style={{ fontSize: 'smaller', display: 'flex', margin: 'auto 0', paddingLeft: '5px', lineHeight: '1em' }}>
                      <div style={{ margin: 'auto' }}>
                        <div style={{ marginBottom: '1px' }}>{new Date(ticket.flight_ddate).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div style={{ marginTop: '1px' }}>{new Date(ticket.flight_ddate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 middle-div">
                  <div style={{ width: '100%' }}>
                    <div className="row places-div" style={{ display: 'flex' }}>
                      <div style={{ maxWidth: '45%' }}>{ticket.flight.origin.city}</div>
                      <div>&nbsp;-&nbsp;</div>
                      <div style={{ maxWidth: '45%' }}>{ticket.flight.destination.city}</div>
                    </div>
                    <div className="row places-div" style={{ fontSize: '.8em', color: '#999999' }}>
                      <div style={{ maxWidth: '100%' }}>{ticket.flight.airline} &middot; {ticket.flight.plane} &middot; {ticket.passengers.length} Passengers</div>
                    </div>
                  </div>
                </div>
                <div className="col-2 middle-div">
                  <div style={{ fontSize: '1.2em', color: '#945937' }}>{ticket.ref_no}</div>
                </div>
                <div className="col-2 middle-div">
                  <div>
                    <div className="row status-div">
                      {ticket.status === 'CONFIRMED' && <div className="green">{ticket.status}</div>}
                      {ticket.status === 'PENDING' && <div className="orange">{ticket.status}</div>}
                      {ticket.status === 'CANCELLED' && <div className="red">{ticket.status}</div>}
                    </div>
                    <div className="row booking-date-div" style={{ fontSize: '.7em', color: '#666' }}>
                      {ticket.status === 'CONFIRMED' && `Booked on: ${new Date(ticket.booking_date).toLocaleDateString()}`}
                      {ticket.status === 'PENDING' && `Reviewed on: ${new Date(ticket.booking_date).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>
                <div className="col-2 last-div">
                  <div>
                    <div className="ticket-action-div">
                      {ticket.status === 'CONFIRMED' && (
                        <>
                          <button className="btn btn-outline-info btnp pbtn" onClick={() => handlePrint(ticket.ref_no)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                            </svg>
                          </button>
                          <button className="btn btn-outline-danger btnp cbtn" onClick={() => handleCancel(ticket.ref_no)}>Cancel</button>
                        </>
                      )}
                      {ticket.status === 'PENDING' && (
                        <>
                          <button className="btn btn-outline-primary btnp rbtn" onClick={() => handleResumeBooking(ticket.ref_no)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                          </button>
                          <button className="btn btn-outline-danger btnp cbtn" onClick={() => handleCancel(ticket.ref_no)}>Cancel</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ height: '100%', width: '100%', padding: '10%' }}>
              <div style={{ textAlign: 'center', margin: 'auto' }}>
                <svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <br /><br />
                <h3>Oops! Looks empty</h3>
                <p>Looks like you don't have any bookings yet.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      {showPopup && (
        <div className="popup">
          <div className="small-popup">
            <div style={{ marginBottom: '10px', fontSize: '1.1em' }}><strong>Do you really want to cancel this ticket?</strong></div>
            <div className="popup-actions">
              <button className="btn btn-light" onClick={closePopup}>Go Back</button>
              <button className="btn btn-danger" onClick={confirmCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default Bookings;
