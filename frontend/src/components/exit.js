import React from "react";
import NavBar from "./navBar";
import "../css/payment.css"
const Exit = () => {
    return (
        <section className="section section2">
          <div className="svg-div-c">
            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <div className="header-after">
            Congratulations, Your flight booking is confirmed.
          </div>
          {/* <div className="details-div">
            <div className="flight1">Booking Ref. Number: &nbsp;<span className="ref">{ticket1.ref_no}</span>&nbsp;&nbsp;&nbsp;(<span className="from1">{ticket1.flight.origin.code}</span> <span>&#8594;</span> <span className="to1">{ticket1.flight.destination.code}</span>)</div>
            {ticket2 && (
              <div className="flight2">Booking Ref. Number: &nbsp;<span className="ref">{ticket2.ref_no}</span>&nbsp;&nbsp;&nbsp;(<span className="from2">{ticket2.flight.origin.code}</span> <span>&#8594;</span> <span className="to2">{ticket2.flight.destination.code}</span>)</div>
            )}
          </div> */}
          <div className="ticket-div">
            <div>
              <form action="/getticket" method="get" target="_blank">
                {/* <input type="hidden" name="ref" value={ticket1.ref_no} /> */}
                {/* <button type="submit" className="btn btn-outline-primary">Print Ticket ({ticket1.flight.origin.code} to {ticket1.flight.destination.code})</button> */}
              </form>
            </div>
          </div>
        </section>
    );
};

export default Exit;