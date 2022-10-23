import React from "react";
import "./gateway_form.css";
import Navbar from "./Header";
function Gateway(props) {
  return (
    <div>
      <div className="container">
        <div id="Checkout" className="inline">
          <h1>Pay Invoice</h1>
          <div className="card-row">
            <span className="visa" />
            <span className="mastercard" />
            <span className="amex" />
            <span className="discover" />
          </div>

          <div className="form-group">
            <label className="font-size" htmlFor="PaymentAmount">
              Payment amount{" "}
              <span className="solidBlack">Rs {props.total}</span>
            </label>
          </div>
          <div className="form-group">
            <label className="size" or="NameOnCard">
              Name on Card{" "}
            </label>
            <input id="NameOnCard" className="form-control input" type="text" />
          </div>
          <div className="form-group">
            <label className="size" htmlFor="CreditCardNumber">
              Card Number{" "}
            </label>
            <input
              id="CreditCardNumber"
              className="null form-control input"
              type="text"
              maxLength={14}
            />
          </div>
          <div className="expiry-date-group form-group">
            <label className="size" htmlFor="ExpiryDate">
              Expiry Date
            </label>
            <input
              id="ExpiryDate"
              className="form-control input"
              type="text"
              placeholder="MM / YY"
              maxLength={5}
            />
          </div>
          <div className="security-code-group form-group">
            <label className="size" htmlFor="SecurityCode">
              CVV{" "}
            </label>
            <input
              id="SecurityCode"
              className="form-control input"
              type="text"
              placeholder="CVV"
              maxLength={3}
            />
            <i id="cvc" className="fa fa-question-circle" />
            <div className="cvc-preview-container two-card hide">
              <div className="amex-cvc-preview" />
              <div className="visa-mc-dis-cvc-preview" />
            </div>
          </div>

          <button
            id="PayButton"
            className="btn btn-block btn-success submit-button"
            type="submit"
          >
            <span className="submit-button-lock" />
            <span className="align-middle">Pay Rs {props.total}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gateway;
