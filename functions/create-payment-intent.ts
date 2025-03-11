import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27', // Ensure you use a supported version
});
const handler: Handler = async event => {
  if (event.body) {
    try {
      const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

      const calculateOrderAmount = (): number => {
        return shipping_fee + total_amount;
      };

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: (error as Error).message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};

export { handler };
