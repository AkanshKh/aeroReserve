import React, { useContext } from "react";
import NavBar from "./navbar";
import "../css/payment.css"
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Exit = () => {
  const location = useLocation();
  const ticket = location.state.ticket1;
  const ticket1ref = location.state.ticket1ref;
  const origin = location.state.origin;
  const destination = location.state.destination;

  const {user} = useContext(AuthContext);

  const handlePrint =async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/ticket/print/${ticket1ref}`;
    // console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          "Authorization": `Token ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Open the PDF in a new window or an iframe to print
      const printWindow = window.open(blobUrl);
      printWindow.addEventListener('load', () => {
          printWindow.print();
      });
    }
    catch (error) {
      console.log(error);
    }
  }


    return (
      <>
      <NavBar/>
        <section className="section2">
          <div className="svg-div-c">
            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <div className="header-after">
            Congratulations, Your flight booking is confirmed.
          </div>
          <div className="details-div">
            <div className="flight1">Booking Ref. Number: &nbsp;<span className="ref">{ticket1ref}</span>&nbsp;&nbsp;&nbsp;(<span className="from1">{origin}</span> <span>&#8594;</span> <span className="to1">{destination}</span>)</div>
            </div>
          <div className="ticket-div">
            <div>
              <form action="/getticket" method="get" target="_blank">
                {/* <input type="hidden" name="ref" value={ticket1.ref_no} /> */}
                <button type="button" className="btn-print" onClick={handlePrint}>Print Ticket ({origin} to {destination})</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
};

export default Exit;