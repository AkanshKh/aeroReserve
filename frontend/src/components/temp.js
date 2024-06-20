import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [ticket, setTicket] = useState('');
  const [ticket2, setTicket2] = useState('');
  const [fare, setFare] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [proceedError, setProceedError] = useState('');
  const [paymentLoader, setPaymentLoader] = useState(false);
  
  const navigate = useNavigate();
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardHolderName || !expMonth || !expYear || !cvv) {
      setProceedError('Please fill all the fields');
      return;
    }

    if (cardNumber.length !== 12) {
      setProceedError('Card number must be exactly 12 digits');
      return;
    }

    setPaymentLoader(true);

    const url = "http://localhost:8000/api/book"; // Replace with your actual URL
    const data = {
      ticket,
      ticket2,
      fare,
      cardNumber,
      cardHolderName,
      expMonth,
      expYear,
      cvv,
    };
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include your authentication token if necessary
          // "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        setPaymentLoader(false);
        navigate('/payment', { state: responseData });
      } else {
        setPaymentLoader(false);
        const errorData = await response.json();
        console.error('Error booking flight:', errorData);
        setProceedError('Error booking flight, please try again');
      }
    } catch (error) {
      console.error('Error booking flight', error);
      setPaymentLoader(false);
      navigate('/error');
    }
  };

  return (
    <div>
      {paymentLoader ? (
        <section className="section section1">
          <div className="gif-div">
            <img src="path/to/process.gif" alt="processing" /> {/* Replace with the correct path */}
          </div>
          <div className="header-before">
            Processing Payment...
          </div>
          <div className="below-header">
            Please wait while we are processing your payment.
          </div>
        </section>
      ) : (
        <section className="section section1">
          <div className="container">
            <div className="payment-box">
              <div className="payment-box-head-div">
                <div className="payment-box-head">
                  <h5>Payment Details</h5>
                  <div className="display-td">
                    <img className="card-img" src="path/to/card.png" alt="Card" /> {/* Replace with the correct path */}
                  </div>
                </div>
              </div>
              <div className="payment-details-input-box">
                <form onSubmit={handleFormSubmit}>
                  <input type="hidden" name="ticket" value={ticket} required />
                  {ticket2 && <input type="hidden" name="ticket2" value={ticket2} required />}
                  
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
                        <input 
                          type="tel" 
                          pattern="\d{12}" 
                          className="form-control" 
                          id="card_number" 
                          name="cardNumber" 
                          autoComplete="off" 
                          maxLength="12" 
                          placeholder="Enter card number" 
                          required 
                          value={cardNumber} 
                          onChange={(e) => setCardNumber(e.target.value)} 
                        />
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
                      <input 
                        type="text" 
                        name="cardHolderName" 
                        className="form-control" 
                        id="card_holder_name" 
                        placeholder="Enter name" 
                        required 
                        value={cardHolderName} 
                        onChange={(e) => setCardHolderName(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="row expiry-cvv">
                    <div className="row">
                      <div className="left-col">
                        <label htmlFor="expiry_month">EXPIRY DATE</label>
                        <div className="expiry-input-div">
                          <div className="month-div">
                            <select 
                              name="expMonth" 
                              id="expiry_month" 
                              className="form-control" 
                              required 
                              value={expMonth} 
                              onChange={(e) => setExpMonth(e.target.value)}
                            >
                              <option value="">Month</option>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                  {String(i + 1).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="year-div">
                            <select 
                              name="expYear" 
                              id="expiry_year" 
                              className="form-control" 
                              required 
                              value={expYear} 
                              onChange={(e) => setExpYear(e.target.value)}
                            >
                              <option value="">Year</option>
                              {Array.from({ length: 10 }, (_, i) => (
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
                          <input 
                            type="password" 
                            pattern="\d{3}" 
                            className="form-control" 
                            placeholder="CVV" 
                            id="cvv_number" 
                            name="cvv" 
                            maxLength="3" 
                            required 
                            value={cvv} 
                            onChange={(e) => setCvv(e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-btn">
                    <button type="submit" className="btn btn-primary btn-danger">Make payment</button>
                  </div>
                  {proceedError && <div className="error">{proceedError}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PaymentForm;
