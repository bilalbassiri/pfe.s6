import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51JBibzHJLr6TwLuctyNvMXk7Aece64Lq0STEqzNQwc8kZ7Lj4ixGEp0bq2z2T91q4vervDSf5eR9PsQSxh30JKUc00qbh3IAxG";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};
export default Stripe;
