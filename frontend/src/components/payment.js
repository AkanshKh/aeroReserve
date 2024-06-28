import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/payment.css'; 
import NavBar from './navbar';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

const PaymentForm = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    
    // const details = location.state.details;
    const ticket1ref = location.state.ticket1ref;
    const fare = location.state.fare;

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [proceedError, setProceedError] = useState('');
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
  
  const navigate = useNavigate();
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (cardNumber.length !== 12) {
        setProceedError('Card number must be exactly 12 digits');
    return;
    }

    if (!cardNumber || !cardHolderName || !expMonth || !expYear || !cvv) {
      setProceedError('Please fill all the fields');
      return;
    }

    setPaymentLoader(true);

    const url = "http://localhost:8000/api/payment/";
    const data = {
      ticket1ref,
      fare,
      cardNumber,
      cardHolderName,
      expMonth,
      expYear,
      cvv, 
    };
    // console.log(data);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${user.token}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        setTimeout(() => {
          setPaymentLoader(false);
        }, 3000); 
        setPaymentLoader(false);
        // console.log('Payment successful:', responseData);
        navigate('/exit', { state: responseData });
      } else {
        setPaymentLoader(false);
        setTimeout(() => {
          setPaymentLoader(false);
        }, 3000); 
        const errorData = await response.json();
        console.error('Error booking flight:', errorData);
        setPaymentError(true);
      }
    } catch (error) {
      console.error('Error booking flight', error);
      setPaymentLoader(false);
      setPaymentError(true);
    //   navigate('/home');
    }
  };

  return (
    <>
    <NavBar/>
    {paymentLoader ? (
        <section className="section section1">
          <div className="gif-div">
            <img src="/process.gif" alt="processing" /> {/* Replace with the correct path */}
          </div>
          <div className="header-before">
            Processing Payment...
          </div>
          <div className="below-header">
            Please wait while we are processing your payment.
          </div>
        </section>
      ) :
      paymentError ? (
        <section className="section section3">
          <div className="svg-div-e">
            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
          <div className="header-after star">
            There was an error while processing the payment.
          </div>
          <div className="below-header">
            Please retry after sometime.
          </div>
          <div className="ticket-div">
            <button className="btn btn-primary btt" type="button" onClick={() => navigate('/')}>Go Home</button>
          </div>
        </section>
      ) : (

          <section className="section section1">
      <div className="container" style={{marginTop:"50px"}}>
        <div className="payment-box">
          <div className="payment-box-head-div">
            <div className="payment-box-head">
              <h5>Payment Details</h5>
              <div className="display-td">
                <img className="card-img" src="/card.png" alt="Card" /> {/* Replace with the correct path */}
              </div>
            </div>
          </div>
          <div className="payment-details-input-box">
            <form onSubmit={handleFormSubmit}>
              {/* <input type="hidden" name="ticket" value={ticket} required /> */}
              
              <div className="row payment-amount-div">
                <div className="form-group">
                  <label htmlFor="payment_amount">PAYMENT AMOUNT</label>
                  <input type="text" className="form-control" id="payment_amount" name="fare" value={`$ ${fare}`} disabled required />
                </div>
              </div>
              <div className="row card-no-div">
                <div className="form-group">
                  <label htmlFor="card_number">CARD NUMBER</label>
                  <div className="input-group">
                    <input type="tel" pattern="[0-9]*" className="form-control" id="card_number" name="cardNumber" autoComplete="off" maxLength="19" placeholder="Enter card number" required value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-credit-card" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row card-holder-div">
                <div className="form-group">
                  <label htmlFor="card_holder_name">CARD HOLDER'S NAME</label>
                  <input type="text" name="cardHolderName" className="form-control" id="card_holder_name" placeholder="Enter name" required value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                </div>
              </div>
              <div className="row expiry-cvv">
                <div className="row">
                  <div className="left-col">
                    <label htmlFor="expiry_month">EXPIRY DATE</label>
                    <div className="expiry-input-div">
                      <div className="month-div">
                        <select name="expMonth" id="expiry_month" className="form-control" required value={expMonth} onChange={(e) => setExpMonth(e.target.value)}>
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="year-div">
                        <select name="expYear" id="expiry_year" className="form-control" required value={expYear} onChange={(e) => setExpYear(e.target.value)}>
                          <option value="">Year</option>
                          {Array.from({ length: 20 }, (_, i) => (
                              <option key={i + new Date().getFullYear()} value={i + new Date().getFullYear()}>
                              {i + new Date().getFullYear()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="right-col">
                    <div className="form-group">
                      <label htmlFor="cvv_number">CVV CODE</label>
                      <input type="password" pattern="[0-9]*" className="form-control" placeholder="CVV" id="cvv_number" name="cvv" maxLength="3" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="star small">{proceedError} {proceedError ? "!!" : ""}</span>
              <div className="payment-btn">
                <button type="submit" className="btn btn-primary btn-danger">Make payment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
)}
    </>
);
};

export default PaymentForm;
